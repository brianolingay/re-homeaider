import { Form, Dropdown } from "semantic-ui-react";

export const SelectField = ({
  field: { onChange, onBlur, ...field }, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
  ...props
}) => {
  const hasError = !!(touched[field.name] && errors[field.name]);

  return (
    <Form.Field error={hasError}>
      <label>{label}</label>
      <Dropdown
        {...field}
        {...props}
        selectOnBlur={false}
        selectOnNavigation={false}
        fluid
        selection
        options={options}
        onChange={(e, { name, value }) => setFieldValue(name, value)}
      />
    </Form.Field>
  );
};
