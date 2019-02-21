import * as React from "react";
import { Container, Content } from "native-base";
import { AvailableCategories } from "../../components/seekers/AvaialbleCategories";
import DrawerHeader from "../../components/DrawerHeader";

type Props = {
  navigation: any;
};

export class BookScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <DrawerHeader navigation={navigation} title="Book By Category" />
        <Content padder>
          <AvailableCategories type="Book" navigation={this.props.navigation} />
        </Content>
      </Container>
    );
  }
}
