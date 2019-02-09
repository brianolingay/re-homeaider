import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Form } from "semantic-ui-react";
import { Formik, Field } from "formik";
import { validSubscriptionSchema } from "@homeaider/common";

import { InputField } from "../formik-fields/InputField";
import { TextAreaField } from "../formik-fields/TextAreaField";
import { SelectField } from "../formik-fields/SelectField";
import { ErrorMessage } from "../ErrorMessage";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { UserSubscriptionsQuery, PaymentMode } from "../apollo-components";

export interface SubscriptionFormValues {
  userSubscriptionId: string;
  name: string;
  description: string;
  amount: number;
  benefits: string;
  paymentMode: PaymentMode;
}

type Props = {
  userSubscription: any | null;
  submit: any;
  handleModal: any;
  method: string;
  refetch: () => Promise<ApolloQueryResult<UserSubscriptionsQuery>>;
};

const defaultInitialValue = {
  userSubscriptionId: "",
  name: "",
  description: "",
  amount: 0.0,
  benefits: "",
  paymentMode: "",
};

export const SubscriptionForm: React.SFC<Props> = ({
  userSubscription = null,
  submit,
  handleModal,
  method,
  refetch,
}) => {
  const initialValues = userSubscription
    ? userSubscription
    : defaultInitialValue;
  return (
    <Formik<SubscriptionFormValues>
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
      validationSchema={validSubscriptionSchema}
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
          <Field
            name="amount"
            label="Amount"
            type="number"
            component={InputField}
          />
          <Field name="benefits" label="Benefits" component={TextAreaField} />
          <Field
            name="paymentMode"
            label="Payment Mode"
            options={[
              { key: "free", value: PaymentMode.Free, text: "Free" },
              { key: "monthly", value: PaymentMode.Monthly, text: "Monthly" },
              { key: "yearly", value: PaymentMode.Yearly, text: "Yearly" },
              { key: "forever", value: PaymentMode.Forever, text: "Forever" },
            ]}
            component={SelectField}
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
