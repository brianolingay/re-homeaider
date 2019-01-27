import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { validServiceSchema } from "@homeaider/common";

import { InputField } from "../formik-fields/InputField";
import { ErrorMessage } from "../ErrorMessage";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { TextAreaField } from "../formik-fields/TextAreaField";
import { ServicesQuery, CategoryInfoFragment } from "../apollo-components";
import { SelectField } from "../formik-fields/SelectField";

export interface CategoriesOptions {
  key: string;
  value: string;
  text: string;
}

export interface ServiceFormValues {
  category: string;
  serviceId: string;
  name: string;
  description: string;
}

type Props = {
  categories: CategoriesOptions[];
  service: any | null;
  submit: any;
  handleModal: any;
  method: string;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
};

const defaultInitialValue = {
  category: "",
  serviceId: "",
  name: "",
  description: "",
};

export const ServiceForm: React.SFC<Props> = ({
  categories,
  service = null,
  submit,
  handleModal,
  method,
  refetch,
}) => {
  const initialValues = service ? service : defaultInitialValue;

  if (categories) {
    return (
      <Formik<ServiceFormValues>
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
        validationSchema={validServiceSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage errors={errors} />
            <Field
              name="category"
              label="Categories"
              options={categories}
              component={SelectField}
            />
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
  }
  return null;
};
