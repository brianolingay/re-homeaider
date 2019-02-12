import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { validUserSchema, validUpdateUserSchema } from "@homeaider/common";

import { InputField } from "../formik-fields/InputField";
import { ErrorMessage } from "../ErrorMessage";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { AllAdminExceptMeQuery, RolesComponent } from "../apollo-components";
import { SelectField } from "../formik-fields/SelectField";

export interface UserFormValues {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string | null;
  role: string;
}

type Props = {
  user: any | null;
  submit: any;
  handleModal: any;
  method: string;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptMeQuery>>;
};

const defaultInitialValue = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  mobile: "",
  password: "",
  role: "admin",
};

export const UserForm: React.SFC<Props> = ({
  user = null,
  submit,
  handleModal,
  method,
  refetch,
}) => {
  const initialValues = user ? user : defaultInitialValue;
  const validator =
    method === "updateUser" ? validUpdateUserSchema : validUserSchema;
  return (
    <RolesComponent>
      {({ data: { roles } }) => {
        let newRoles = [];
        if (roles) {
          newRoles = roles.map(item => ({
            key: item._id,
            value: item.name,
            text: item.name,
          }));
        }
        
        return (
          <Formik<UserFormValues>
            initialValues={initialValues}
            onSubmit={async (
              input,
              { setErrors, setSubmitting, resetForm }
            ) => {
              const response = await submit(input);

              if (
                response &&
                response.data &&
                response.data[method].errors &&
                response.data[method].errors.length
              ) {
                setSubmitting(false);
                return setErrors(normalizeErrors(response.data[method].errors));
              } else {
                resetForm();
                await refetch();
                handleModal();
              }
            }}
            validationSchema={validator}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <ErrorMessage errors={errors} />
                <Field
                  name="role"
                  label="Role"
                  options={newRoles}
                  component={SelectField}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  disabled={method === "updateUser"}
                  component={InputField}
                />
                <Field
                  name="firstName"
                  label="First Name"
                  component={InputField}
                />
                <Field
                  name="lastName"
                  label="Last Name"
                  component={InputField}
                />
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
                <Button disabled={isSubmitting} onClick={handleModal}>
                  Cancel
                </Button>
                <Button disabled={isSubmitting} type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        );
      }}
    </RolesComponent>
  );
};
