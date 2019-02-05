import * as React from "react";
import { Button, Container, Content, Form, Text } from "native-base";
import { Formik, Field } from "formik";

import { InputField } from "../components/formik-fields/InputField";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginComponent } from "../components/apollo-components";
import { meQuery } from "../graphql/user/queries/me";

interface FormValues {
  email: string;
  password: string;
}

type Props = {
  navigation: any;
};

export class LoginScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: "Login",
  };

  render() {
    return (
      <Container>
        <Content>
          <LoginComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{ email: "", password: "" }}
                onSubmit={async (input, { setErrors, setSubmitting }) => {
                  const { navigation } = this.props;
                  const isAdmin = false;
                  const response = await mutate({
                    variables: { isAdmin, input },
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
                    return setErrors(
                      normalizeErrors(response.data.login.errors)
                    );
                  } else {
                    const {
                      role: { name },
                    } = (response as any).data.login.user;
                    navigation.navigate(
                      name === "service_seeker" ? "Seeker" : "Provider"
                    );
                  }
                }}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ handleSubmit, isSubmitting }) => (
                  <Form>
                    <Field
                      name="email"
                      label="Email"
                      returnKeyType="next"
                      keyboardType="email-address"
                      component={InputField}
                    />
                    <Field
                      name="password"
                      label="Password"
                      secureTextEntry={true}
                      component={InputField}
                      returnKeyType="done"
                    />
                    <Button
                      block
                      primary
                      disabled={isSubmitting}
                      onPress={handleSubmit as any}
                    >
                      <Text>Login</Text>
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </LoginComponent>
        </Content>
      </Container>
    );
  }
}
