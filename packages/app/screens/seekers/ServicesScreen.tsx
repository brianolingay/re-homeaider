import * as React from "react";
import { FindServicesByCategoryComponent } from "../../components/apollo-components";
import {
  Body,
  Right,
  Container,
  Content,
  ListItem,
  List,
  Text,
} from "native-base";
import { AppLoading } from "expo";
import SwitchHeader from "../../components/SwitchHeader";

type Props = {
  navigation: any;
};

export class ServicesScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null,
  };
  render() {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const categoryId = navigation.getParam("categoryId") as any;
    console.log(categoryId);

    return (
      <FindServicesByCategoryComponent variables={{ categoryId }}>
        {({ data: { findServicesByCategory }, loading }) => {
          if (loading) {
            return <AppLoading />;
          }
          return (
            <Container>
              <SwitchHeader
                navigation={navigation}
                title="Available Services"
              />
              <Content>
                <List>
                  {findServicesByCategory.map(item => (
                    <ListItem
                      key={`service-${item._id}`}
                      onPress={() => {
                        const screen =
                          type === "Book"
                            ? "CreateRequest"
                            : "ProvidersByService";
                        navigation.navigate(screen, {
                          type,
                          serviceId: item._id,
                        });
                      }}
                    >
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>
                          Total Available Services: {item.totalUsers}
                        </Text>
                      </Body>
                      <Right>
                        <Text>Proceed</Text>
                      </Right>
                    </ListItem>
                  ))}
                </List>
              </Content>
            </Container>
          );
        }}
      </FindServicesByCategoryComponent>
    );
  }
}
