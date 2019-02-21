import * as React from "react";
import { Button, Container, Content, Form, Text } from "native-base";
import { Formik, Field } from "formik";

import { InputField } from "../components/formik-fields/InputField";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginComponent } from "../components/apollo-components";
import { meQuery } from "../graphql/user/queries/me";
import { nativeAuthTokenStorage } from "../lib/nativeAuthTokenStorage";
import SwitchHeader from "../components/SwitchHeader";

interface FormValues {
  email: string;
  password: string;
}

type Props = {
  navigation: any;
};

export class LoginScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  onFormSubmit = mutate => (input, { setErrors, setSubmitting }) => {
    const { navigation } = this.props;
    const isAdmin = false;
    return mutate({
      variables: { isAdmin, input },
      update: async (store, { data }) => {
        if (!data || !data.login.user) {
          return;
        }
        await nativeAuthTokenStorage.setTokens(data.login.tokens);
        store.writeQuery({
          query: meQuery,
          data: {
            me: data.login.user,
          },
        });
      },
    }).then(response => {
      console.log({ response });
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
          services,
          role: { name },
        } = (response as any).data.login.user;
        const isServiceSeeker = name === "service_seeker";
        const location = isServiceSeeker
          ? "Seekers"
          : services
          ? "Providers"
          : "Profile";
        navigation.navigate(location);
      }
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <SwitchHeader navigation={navigation} title="Login" />
        <Content>
          <LoginComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  email: "archie@homeaider.com",
                  password: "homeaider",
                }}
                onSubmit={this.onFormSubmit(mutate)}
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
                      autoCapitalize="none"
                      component={InputField}
                    />
                    <Field
                      name="password"
                      label="Password"
                      secureTextEntry={true}
                      component={InputField}
                      autoCapitalize="none"
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
