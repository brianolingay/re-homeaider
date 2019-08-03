import { Form, Select } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

export const SelectField = ({
  field: { onChange, onBlur, ...field },
  form: { touched, errors, setFieldValue },
  label, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  options,
  ...props
}: any) => {
  const isError = touched[field.name] && errors[field.name];
  const validateStatus = isError ? "error" : "validating";
  const help = isError ? errors[field.name] : "";

  return (
    <FormItem label={label} validateStatus={validateStatus} help={help}>
      <Select
        {...field}
        {...props}
        onChange={(newValue: any) => setFieldValue(field.name, newValue)}
      >
        {options.map((role: any) => (
          <Option key={role.key}>{role.value}</Option>
        ))}
      </Select>
    </FormItem>
  );
};
