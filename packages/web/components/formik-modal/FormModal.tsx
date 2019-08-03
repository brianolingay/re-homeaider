import { Button, Modal } from "antd";
import { Formik, FormikProps } from "formik";
import React from "react";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  initialValues: any;
  method: string;
  modalName: string;
  showModal: boolean;
  handleModal: (item?: any) => void;
  refetch: () => Promise<any>;
  validationSchema: any;
  submit: any;
  children: () => JSX.Element;
}

export const FormModal = (props: Props) => {
  return (
    <Formik<any>
      initialValues={props.initialValues}
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
          props.handleModal(null);
          setSubmitting(false);
        }
      }}
      validationSchema={props.validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ handleSubmit, isSubmitting }: FormikProps<any>) => (
        <Modal
          title={props.modalName}
          visible={props.showModal}
          onOk={handleSubmit}
          onCancel={() => props.handleModal(null)}
          footer={[
            <Button key="back" onClick={() => props.handleModal(null)}>
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
          {props.children}
        </Modal>
      )}
    </Formik>
  );
};
