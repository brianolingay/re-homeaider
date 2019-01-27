import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { validRoleSchema } from "@homeaider/common";

import { InputField } from "../formik-fields/InputField";
import { ErrorMessage } from "../ErrorMessage";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { TextAreaField } from "../formik-fields/TextAreaField";
import { RolesQuery } from "../apollo-components";

export interface RoleFormValues {
  roleId: string;
  name: string;
  description: string;
}

type Props = {
  role: any | null;
  submit: any;
  handleModal: any;
  method: string;
  refetch: () => Promise<ApolloQueryResult<RolesQuery>>;
};

const defaultInitialValue = {
  roleId: "",
  name: "",
  description: "",
};

export const RoleForm: React.SFC<Props> = ({
  role = null,
  submit,
  handleModal,
  method,
  refetch,
}) => {
  const initialValues = role ? role : defaultInitialValue;
  return (
    <Formik<RoleFormValues>
      initialValues={initialValues}
      onSubmit={async (input, { setErrors, setSubmitting, resetForm }) => {
        const response = await submit(input);

        if (
          response &&
          response.data &&
          response.data[method].errors &&
          response.data[method].errors.length
        ) {
          setSubmitting(false);
          return setErrors(normalizeErrors(response.data[method].errors));
        } else {
          resetForm();
          await refetch();
          handleModal();
        }
      }}
      validationSchema={validRoleSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <ErrorMessage errors={errors} />
          <Field name="name" label="Name" component={InputField} />
          <Field
            name="description"
            label="Description"
            component={TextAreaField}
          />
          <Button disabled={isSubmitting} onClick={handleModal}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
