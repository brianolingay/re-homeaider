import { Form, Input } from "antd";

const FormItem = Form.Item;

const { TextArea } = Input;

export const TextAreaField = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors },
  label, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => {
  const isError = touched[field.name] && errors[field.name];
  const validateStatus = isError ? "error" : "validating";
  const help = isError ? errors[field.name] : "";

  return (
    <FormItem label={label} validateStatus={validateStatus} help={help}>
      <TextArea {...field} {...props} />
    </FormItem>
  );
};
