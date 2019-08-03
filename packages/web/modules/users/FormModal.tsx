import { Form } from "antd";
import { ApolloQueryResult } from "apollo-boost";
import { Field } from "formik";
import React, { useState } from "react";
import {
  AllAdminExceptCurrentUserQuery,
  UserInput,
} from "../../components/apollo-components";
import { InputField } from "../../components/formik-fields/InputField";
import { FormModal } from "../../components/formik-modal/FormModal";
import { SelectField } from "../../components/formik-fields/SelectField";

export interface FormValues extends UserInput {
  userId: string;
  role: string;
}

interface Props {
  user: any | null;
  roles: any;
  method: string;
  modalName: string;
  showModal: boolean;
  handleModal: (item?: any) => void;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptCurrentUserQuery>>;
  validationSchema: any;
  submit: any;
}

const defaultInitialValue = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  mobile: "",
  password: "",
  role: "",
};

export const UserFormModal = (props: Props) => {
  const user = props.user;
  const initialValues = user ? user : defaultInitialValue;

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
        <Field
          name="role"
          label="Role"
          options={props.roles}
          component={SelectField}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          disabled={props.method === "udpateUser"}
          component={InputField}
        />
        <Field name="firstName" label="First Name" component={InputField} />
        <Field name="lastName" label="Last Name" component={InputField} />
        <Field
          name="mobile"
          label="Mobile"
          placeholder="+639*********"
          component={InputField}
        />
        <Field
          name="password"
          label="Password"
          placeholder="Provide a strong generated password"
          component={InputField}
        />
      </Form>
    </FormModal>
  );
};
