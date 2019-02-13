import * as React from "react";
import {
  Button,
  Container,
  Content,
  Form,
  Text,
  Header,
  Left,
  Body,
  Title,
  Right,
  Icon,
} from "native-base";
import { Formik, Field } from "formik";

import { InputField } from "../components/formik-fields/InputField";
import { normalizeErrors } from "../utils/normalizeErrors";
import { LoginComponent } from "../components/apollo-components";
import { meQuery } from "../graphql/user/queries/me";
import { nativeAuthTokenStorage } from "../lib/nativeAuthTokenStorage";

interface FormValues {
  email: string;
  password: string;
}

type Props = {
  navigation: any;
};

export class LoginScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  render() {
    return (
      <Container>
        <Content>
          <LoginComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  email: "archie@homeaider.com",
                  password: "homeaider",
                }}
                onSubmit={async (input, { setErrors, setSubmitting }) => {
                  const { navigation } = this.props;
                  const isAdmin = false;
                  const response = await mutate({
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
                      services,
                    } = (response as any).data.login.user;
                    const location =
                      name === "service_seeker"
                        ? "Seekers"
                        : services
                        ? "Providers"
                        : "Profile";
                    navigation.navigate(location);
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
