import * as React from "react";
import { AvailableCategoriesComponent } from "../apollo-components";
import { List, ListItem, Text, Right, Body } from "native-base";
import { AppLoading } from "expo";

type Props = {
  type: string;
  navigation: any;
};

export class AvailableCategories extends React.PureComponent<Props> {
  render() {
    const { type, navigation } = this.props;
    return (
      <AvailableCategoriesComponent>
        {({ data: { availableCategories }, loading }) => {
          if (loading) {
            return <AppLoading />;
          }

          return (
            <List>
              {availableCategories.map(item => (
                <ListItem
                  key={`category-${item._id}`}
                  onPress={() => {
                    navigation.navigate("Services", {
                      type,
                      categoryId: item._id,
                    });
                  }}
                >
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>
                      Total Available Services: {item.totalServices}
                    </Text>
                  </Body>
                  <Right>
                    <Text>Proceed</Text>
                  </Right>
                </ListItem>
              ))}
            </List>
          );
        }}
      </AvailableCategoriesComponent>
    );
  }
}
