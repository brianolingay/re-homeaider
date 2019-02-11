import * as React from "react";
import { FieldProps } from "formik";
import { Input, Item as FormItem, Label } from "native-base";
import { Icon } from "react-native-elements";

export class InputField extends React.Component<any & FieldProps<any>> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name },
    } = this.props;
    setFieldValue(name, text);
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      label,
      children,
      ...props
    } = this.props;
    const hasError = !!(touched[field.name] && errors[field.name]);

    return (
      <FormItem error={hasError}>
        {label && <Label>{label}</Label>}
        <Input
          {...props}
          onChangeText={this.onChangeText}
          value={field.value}
        />
        {hasError && <Icon type="font-awesome" name="times-circle" />}
      </FormItem>
    );
  }
}
