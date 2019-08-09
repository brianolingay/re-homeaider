import { Form } from "antd";
import { ApolloQueryResult } from "apollo-boost";
import { Field } from "formik";
import React from "react";
import {
  ServiceInput,
  ServicesQuery,
} from "../../components/apollo-components";
import { InputField } from "../../components/formik-fields/InputField";
import { FormModal } from "../../components/formik-modal/FormModal";
import { TextAreaField } from "../../components/formik-fields/TextAreaField";

export interface FormValues extends ServiceInput {
  serviceId: string;
}

interface Props {
  service: any | null;
  method: string;
  modalName: string;
  showModal: boolean;
  handleModal: (item?: any) => void;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
  validationSchema: any;
  submit: any;
}

const defaultInitialValue = {
  serviceId: "",
  name: "",
  description: "",
};

export const ServiceFormModal = (props: Props) => {
  const service = props.service;
  const initialValues = service ? service : defaultInitialValue;

  return (
    <FormModal
      initialValues={initialValues}
      method={props.method}
      modalName={props.modalName}
      showModal={props.showModal}
      handleModal={props.handleModal}
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
