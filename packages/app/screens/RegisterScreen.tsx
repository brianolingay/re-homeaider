import * as React from "react";
import {
  Button,
  Container,
  Content,
  Form,
  Text,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right,
} from "native-base";
import { Formik, Field } from "formik";
import { validUserSchema } from "@homeaider/common";

import { InputField } from "../components/formik-fields/InputField";
import { RegisterComponent } from "../components/apollo-components";
import { normalizeErrors } from "../utils/normalizeErrors";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  password: string;
}

type Props = {
  navigation: any;
};

export class RegisterScreen extends React.PureComponent<Props> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Register</Title>
        </Body>
        <Right />
      </Header>
    ),
  });

  render() {
    const role = this.props.navigation.getParam("role");
    return (
      <Container>
        <Content>
          <RegisterComponent>
            {mutate => (
              <Formik<FormValues>
                initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  mobile: "",
                  role,
                  password: "",
                }}
                onSubmit={async (
                  { role, ...newInput },
                  { setErrors, setSubmitting }
                ) => {
                  const { navigation } = this.props;
                  const response = await mutate({
                    variables: { role, input: newInput },
                  });

                  if (
                    response &&
                    response.data &&
                    response.data.register.errors &&
                    response.data.register.errors.length
                  ) {
                    setSubmitting(false);
                    return setErrors(
                      normalizeErrors(response.data.register.errors)
                    );
                  } else {
                    navigation.navigate.push("Login");
                  }
                }}
                validationSchema={validUserSchema}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({ handleSubmit, isSubmitting }) => (
                  <Form>
                    <Field
                      name="email"
                      label="Email"
                      placeholder="Email"
                      returnKeyType="next"
                      keyboardType="email-address"
                      component={InputField}
                    />
                    <Field
                      name="firstName"
                      label="First Name"
                      returnKeyType="next"
                      component={InputField}
                    />
                    <Field
                      name="lastName"
                      label="Last Name"
                      returnKeyType="next"
                      component={InputField}
                    />
                    <Field
                      name="mobile"
                      label="Mobile"
                      returnKeyType="next"
                      keyboardType="number-pad"
                      component={InputField}
                    />
                    <Field
                      name="password"
                      label="Password"
                      placeholder="Password"
                      secureTextEntry={true}
                      component={InputField}
                    />
                    <Button
                      block
                      primary
                      disabled={isSubmitting}
                      onPress={handleSubmit as any}
                    >
                      <Text>Create Account</Text>
                    </Button>
                  </Form>
                )}
              </Formik>
            )}
          </RegisterComponent>
        </Content>
      </Container>
    );
  }
}
