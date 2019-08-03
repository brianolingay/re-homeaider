import { Form } from "antd";
import { ApolloQueryResult } from "apollo-boost";
import { Field } from "formik";
import React from "react";
import { AllRolesQuery, RoleInput } from "../../components/apollo-components";
import { InputField } from "../../components/formik-fields/InputField";
import { TextAreaField } from "../../components/formik-fields/TextAreaField";
import { FormModal } from "../../components/formik-modal/FormModal";

export interface RoleFormValues extends RoleInput {
  roleId: string;
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

export const RoleFormModal = (props: Props) => {
  const initialValues = props.role ? props.role : defaultInitialValue;
  return (
    <FormModal
      initialValues={initialValues}
      method={props.method}
      modalName={props.modalName}
      showModal={props.showModal}
      handleModal={props.handleRoleModal}
      refetch={props.refetch}
      validationSchema={props.validationSchema}
      submit={props.submit}
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
    </FormModal>
  );
};
