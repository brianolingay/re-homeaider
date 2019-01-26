import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { Mutation } from "react-apollo";
import Router from "next/router";

import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginMutation, LoginVariables } from "../components/apollo-components";
import { loginMutation } from "../graphql/user/mutations/login";
import Layout from "../components/Layout";
import { meQuery } from "../graphql/user/queries/me";

interface FormValues {
  email: string;
  password: string;
}

export default () => (
  <Layout title="login">
    <Mutation<LoginMutation, LoginVariables> mutation={loginMutation}>
      {mutate => (
        <Formik<FormValues>
          initialValues={{ email: "", password: "" }}
          onSubmit={async (input, { setErrors, setSubmitting }) => {
            const response = await mutate({
              variables: { input },
              update: (store, { data }) => {
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

            if (
              response &&
              response.data &&
              response.data.login.errors &&
              response.data.login.errors.length
            ) {
              setSubmitting(false);
              return setErrors(normalizeErrors(response.data.login.errors));
            } else {
              Router.push("/home");
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="email"
                label="Email"
                placeholder="Email"
                component={InputField}
              />
              <Field
                name="password"
                label="Password"
                placeholder="Password"
                component={InputField}
                type="password"
              />
              <ErrorMessage errors={errors} />
              <Button disabled={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Mutation>
  </Layout>
);
