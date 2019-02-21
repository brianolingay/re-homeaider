import * as React from "react";
import { Container, Content } from "native-base";
import { AvailableCategories } from "../../components/seekers/AvaialbleCategories";
import DrawerHeader from "../../components/DrawerHeader";

type Props = {
  navigation: any;
};

export class HireScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <DrawerHeader navigation={navigation} title="Hire By Category" />
        <Content padder>
          <AvailableCategories type="Hire" navigation={navigation} />
        </Content>
      </Container>
    );
  }
}
