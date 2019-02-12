import * as React from "react";
import { Button, Form, Card, Container } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { Mutation } from "react-apollo";
import Router from "next/router";
import axios from "axios";

import { InputField } from "../components/formik-fields/InputField";
import { ErrorMessage } from "../components/ErrorMessage";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginMutation, LoginVariables } from "../components/apollo-components";
import { loginMutation } from "../graphql/user/mutations/login";
import Layout from "../components/Layout";
import { meQuery } from "../graphql/user/queries/me";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { authTokenStore } from "../lib/authTokenStore";

interface FormValues {
  email: string;
  password: string;
}

export default class Login extends React.PureComponent<{
  isAdmin: boolean;
}> {
  static async getInitialProps(context: NextContextWithApollo) {
    const { loggedInUser } = await checkLoggedIn(context);

    const { asPath } = context;
    const admin = asPath.match(/admin/);

    const isAdmin = admin ? true : false;

    if (loggedInUser.me) {
      // Already signed in? No need to continue.
      // Throw them back to the main page

      redirect(context, "/");
    }

    return { isAdmin };
  }

  render() {
    return (
      <Layout title="login">
        <Container
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <Card>
            <Card.Content>
              <Card.Header>Login</Card.Header>
              <Mutation<LoginMutation, LoginVariables> mutation={loginMutation}>
                {mutate => (
                  <Formik<FormValues>
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (input, { setErrors, setSubmitting }) => {
                      const { isAdmin } = this.props;
                      const response = await mutate({
                        variables: { isAdmin, input },
                        update: async (store, { data }) => {
                          if (!data || !data.login.user) {
                            return;
                          }

                          const { token, refreshToken } = data.login.tokens;
                          await axios.post("/tokens", { token, refreshToken });
                          await authTokenStore.setTokens(token, refreshToken);

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
                        return setErrors(
                          normalizeErrors(response.data.login.errors)
                        );
                      } else {
                        Router.push("/");
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
            </Card.Content>
          </Card>
        </Container>
      </Layout>
    );
  }
}
