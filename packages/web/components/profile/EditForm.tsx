import * as React from "react";
import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { validUpdateUserSchema } from "@homeaider/common";

import { InputField } from "../formik-fields/InputField";
import { ErrorMessage } from "../ErrorMessage";
import { normalizeErrors } from "../../utils/normalizeErrors";

export interface EditFormValues {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  password: string | null;
  role: string;
}

type Props = {
  user: any | null;
  submit: any;
  handleEditing: () => void;
};

const defaultInitialValue = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  mobile: "",
  password: "",
  role: "",
};

class EditFormComponent extends React.PureComponent<Props> {
  render() {
    const { user, submit, handleEditing } = this.props;
    const initialValues = user ? user : defaultInitialValue;
    return (
      <Formik<EditFormValues>
        initialValues={initialValues}
        onSubmit={async (input, { setErrors, setSubmitting, resetForm }) => {
          const response = await submit(input);

          if (
            response &&
            response.data &&
            response.data.updateUser.errors &&
            response.data.updateUser.errors.length
          ) {
            setSubmitting(false);
            return setErrors(normalizeErrors(response.data.updateUser.errors));
          } else {
            resetForm();
            handleEditing();
            (window as any).location = "/profile";
          }
        }}
        validationSchema={validUpdateUserSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage errors={errors} />
            <Field
              name="email"
              label="Email"
              type="email"
              disabled={true}
              component={InputField}
            />
            <Field name="firstName" label="First Name" component={InputField} />
            <Field name="lastName" label="Last Name" component={InputField} />
            <Field
              name="mobile"
              label="Mobile"
              placeholder="+639*********"
              component={InputField}
            />
            <Field
              name="password"
              label="New Password"
              placeholder="Provide a strong password"
              component={InputField}
            />
            <Button disabled={isSubmitting} onClick={handleEditing}>
              Cancel
            </Button>
            <Button disabled={isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export const EditForm = EditFormComponent;
