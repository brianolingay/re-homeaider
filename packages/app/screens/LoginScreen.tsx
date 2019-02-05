import * as React from "react";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { Button, Form, Text } from "native-base";
import { Formik, Field } from "formik";

import { InputField } from "../components/formik-fields/InputField";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginComponent } from "../components/apollo-components";
import { meQuery } from "../graphql/user/queries/me";

const marginTop = Platform.OS === "android" ? StatusBar.currentHeight : 0;

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
      <KeyboardAvoidingView
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          marginTop,
        }}
        behavior="padding"
        enabled
      >
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
                  return setErrors(normalizeErrors(response.data.login.errors));
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
      </KeyboardAvoidingView>
    );
  }
}
