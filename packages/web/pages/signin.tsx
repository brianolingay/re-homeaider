import { Button, Card, Form, Icon } from "antd";
import { Field, Formik, FormikProps } from "formik";
import Router from "next/router";
import React from "react";
import { useLoginMutation } from "../components/apollo-components";
import { InputField } from "../components/formik-fields/IconedInputField";
import MyLayout from "../components/MyLayout";
import { meQuery } from "../graphql/user/queries/me";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { normalizeErrors } from "../utils/normalizeErrors";

interface FormValues {
  email: string;
  password: string;
}

function signin() {
  const login = useLoginMutation();
  return (
    <MyLayout
      title="Sign In"
      containerStyle={{
        padding: "24px 0",
        display: "flex",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Card title="Sign In">
        <Formik<FormValues>
          initialValues={{ email: "", password: "" }}
          onSubmit={async (input, { setErrors, setSubmitting }) => {
            const response = await login({
              variables: { input },
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
          {({ handleSubmit, isSubmitting }: FormikProps<FormValues>) => (
            <Form
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 16 }}
              onSubmit={handleSubmit}
            >
              <Field
                name="email"
                label="Email"
                type="email"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                component={InputField}
              />
              <Field
                name="password"
                type="password"
                label="Password"
                placeholder="******"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                component={InputField}
              />

              <Form.Item wrapperCol={{ span: 16, offset: 7 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Card>
    </MyLayout>
  );
}

signin.getInitialProps = async (ctx: any) => {
  const loggedInUser = await checkLoggedIn(ctx);

  if (loggedInUser && loggedInUser.me) {
    redirect(ctx, "/");
    return {};
  }

  return {};
};

export default signin;
