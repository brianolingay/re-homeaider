import React from "react";
import { Card, Button } from "antd";
import { Form, Field, Formik, FormikProps } from "formik";
import MyLayout from "../components/MyLayout";
import { InputField } from "../components/formik-fields/IconedInputField";
import { useLoginMutation } from "../components/apollo-components";
import { meQuery } from "../graphql/auth/queries/me";
import { normalizeErrors } from "../utils/normalizeErrors";

interface FormValues {
  email: string;
  password: string;
}

export default function signin() {
  const login = useLoginMutation();
  return (
    <MyLayout
      title="Sign In"
      containerStyle={{ display: "flex", flex: 1, justifyContent: "center" }}
    >
      <Card title="Sign In">
        <Formik<FormValues>
          initialValues={{ email: "", password: "" }}
          onSubmit={async (input, { setErrors, setSubmitting }) => {
            const isAdmin = true;
            const response = await login({
              variables: { isAdmin, input },
              update: async (store, { data }) => {
                if (!data || !data.login.user) {
                  return;
                }

                store.writeQuery({
                  query: meQuery,
                  data: {
                    me: data.login.user,
                  },
                });
              },
            });

            if (response && response.errors && response.errors.length) {
              setSubmitting(false);
              return;
            }

            if (
              response &&
              response.data &&
              response.data.login.errors &&
              response.data.login.errors.length
            ) {
              setSubmitting(false);
              return setErrors(normalizeErrors(response.data.login.errors));
            } else {
              Router.push("/");
              setSubmitting(false);
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting }: FormikProps<FormValues>) => (
            <Form>
              <Field
                name="email"
                label="Email"
                type="email"
                component={InputField}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                placeholder="******"
                component={InputField}
              />
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={isSubmitting}
              >
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </MyLayout>
  );
}
