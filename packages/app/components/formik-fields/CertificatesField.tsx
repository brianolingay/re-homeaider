import * as React from "react";
import { FieldProps } from "formik";
import {
  View,
  List,
  ListItem,
  Left,
  Thumbnail,
  Text,
  Body,
  Right,
  Button,
  Icon,
} from "native-base";
import { Permissions, ImagePicker } from "expo";
import { ReactNativeFile } from "extract-files";

export class InputField extends React.Component<any & FieldProps<any>> {
  state = {
    image: {},
    name: "",
    description: "",
    certificates: [],
  };

  onPress = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    const imageResult = await ImagePicker.launchImageLibraryAsync({});
    if (!imageResult.cancelled) {
      const file = new ReactNativeFile({
        uri: (imageResult as any).uri,
        type: (imageResult as any).type,
        name: "picture",
      });
      const {
        field: { name },
        form: { setFieldValue },
      } = this.props;
      setFieldValue(name, file);
    }
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
      <View>
        {field.value &&
          field.value.map(cert => (
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: cert.uri }} />
                </Left>
                <Body>
                  <Text>{cert.name}</Text>
                  <Text note>Certificate Name</Text>
                </Body>
                <Right>
                  <Button icon transparent primary>
                    <Icon name="trash" />
                  </Button>
                </Right>
              </ListItem>
            </List>
          ))}
      </View>
    );
  }
}
