import { Button, Card, Form, Row, Col } from "antd";
import { Field, Formik, FormikProps } from "formik";
import React from "react";
import { InputField } from "../../components/formik-fields/InputField";
import MyLayout from "../../components/MyLayout";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface FormValues {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  country: string;
  password: string;
}

const initialValues = {
  first_name: "",
  last_name: "",
  mobile: "",
  email: "",
  address: "",
  city: "",
  country: "",
  password: "",
  role: "provider",
};

export default function signup() {
  const pSignup = null;
  return (
    <MyLayout
      title="Sign Up"
      containerStyle={{ display: "flex", flex: 1, justifyContent: "center" }}
      pathname="/provider/signup"
    >
      <Card title="Sign In">
        <Formik<FormValues>
          initialValues={initialValues}
          onSubmit={async (input, { setErrors, setSubmitting }) => {
            const response = await pSignup({
              variables: { input },
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
              Router.push("/login");
              setSubmitting(false);
            }
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, isSubmitting }: FormikProps<FormValues>) => (
            <Form onSubmit={handleSubmit} className="provider-signup">
              <Row>
                <Col span={12}>
                  <Field
                    name="first_name"
                    label="First Name"
                    type="first_name"
                    component={InputField}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name="last_name"
                    label="Last Name"
                    type="last_name"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Field
                    name="address"
                    label="Address"
                    type="address"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Field
                    name="city"
                    label="City"
                    type="city"
                    component={InputField}
                  />
                </Col>
                <Col span={12}>
                  <Field
                    name="country"
                    label="Country"
                    type="country"
                    component={InputField}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    component={InputField}
                  />
                </Col>
                <Col span={24}>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="******"
                    component={InputField}
                  />
                </Col>
              </Row>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={isSubmitting}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </MyLayout>
  );
}
