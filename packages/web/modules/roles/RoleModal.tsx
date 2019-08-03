import { Button, Form, Modal } from "antd";
import { ApolloQueryResult } from "apollo-boost";
import { Field, Formik, FormikProps } from "formik";
import React from "react";
import { AllRolesQuery } from "../../components/apollo-components";
import { InputField } from "../../components/formik-fields/InputField";
import { TextAreaField } from "../../components/formik-fields/TextAreaField";

export interface RoleFormValues {
  roleId: string;
  name: string;
  description: string;
}

interface Props {
  role: any | null;
  method: string;
  modalName: string;
  showModal: boolean;
  handleRoleModal: (role?: any) => void;
  refetch: () => Promise<ApolloQueryResult<AllRolesQuery>>;
  validationSchema: any;
  submit: any;
}

const defaultInitialValue = {
  roleId: "",
  name: "",
  description: "",
};

export const RoleModal = (props: Props) => {
  const initialValues = props.role ? props.role : defaultInitialValue;
  return (
    <Formik<RoleFormValues>
      initialValues={initialValues}
      onSubmit={async (input, { setErrors, setSubmitting, resetForm }) => {
        const response = await props.submit(input);

        if (
          response &&
          response.data &&
          response.data[props.method].errors &&
          response.data[props.method].errors.length
        ) {
          setSubmitting(false);
          return setErrors(normalizeErrors(response.data[props.method].errors));
        } else {
          resetForm();
          await props.refetch();
          props.handleRoleModal(null);
          setSubmitting(false);
        }
      }}
      validationSchema={props.validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, isSubmitting }: FormikProps<RoleFormValues>) => (
        <Modal
          title={props.modalName}
          visible={props.showModal}
          onOk={handleSubmit}
          onCancel={() => props.handleRoleModal(null)}
          footer={[
            <Button key="back" onClick={() => props.handleRoleModal(null)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isSubmitting}
              onClick={handleSubmit}
            >
              Submit
            </Button>,
          ]}
        >
          <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
            <Field name="name" label="Name" component={InputField} />
            <Field
              name="description"
              label="Description"
              autosize={false}
              rows={3}
              component={TextAreaField}
            />
          </Form>
        </Modal>
      )}
    </Formik>
  );
};
