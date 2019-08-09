import { Form } from "antd";
import { ApolloQueryResult } from "apollo-boost";
import { Field } from "formik";
import React, { useState } from "react";
import {
  ServiceInput,
  ServicesQuery,
  CategoryInput,
} from "../../components/apollo-components";
import { InputField } from "../../components/formik-fields/InputField";
import { FormModal } from "../../components/formik-modal/FormModal";
import { TextAreaField } from "../../components/formik-fields/TextAreaField";

export interface FormValues extends CategoryInput {
  categoryId: string;
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
  statement: "",
};

export const ServiceFormModal = (props: Props) => {
  const service = props.service;
  const initialValues = service ? service : defaultInitialValue;

  const [details, setDetails] = useState([{ name: "option 1", options: [""] }]);

  const handleEditSubmit = async (input: FormValues) => {
    return await props.submit({ ...input, details });
  };

  const addDetail = () => {
    const newDetail = {
      name: "",
      options: [""],
    };
    setDetails([...details, newDetail]);
  };

  const addOptionToDetail = (idx: number) => {
    details[idx].options.push("");
    setDetails([...details]);
  };

  return (
    <FormModal
      initialValues={initialValues}
      method={props.method}
      modalName={props.modalName}
      showModal={props.showModal}
      handleModal={props.handleModal}
      refetch={props.refetch}
      validationSchema={props.validationSchema}
      submit={handleEditSubmit}
    >
      <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }}>
        <Field name="name" label="Name" component={InputField} />
        <Field
          name="description"
          label="Description"
          rows={3}
          style={{ resize: "none" }}
          component={TextAreaField}
        />
        <Field
          name="statement"
          label="Statement"
          rows={3}
          component={TextAreaField}
        />
      </Form>
    </FormModal>
  );
};
