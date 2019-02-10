import * as React from "react";
import { AvailableCategoriesComponent } from "./apollo-components";
import { List, ListItem, Text } from "native-base";

type Props = {
  type: string;
  navigation: any;
};

export class AvailableCategories extends React.PureComponent<Props> {
  render() {
    const { type, navigation } = this.props;
    return (
      <AvailableCategoriesComponent>
        {({ data: { availableCategories } }) => {
          return (
            <List>
              {availableCategories.map(item => (
                <ListItem
                  onPress={() => {
                    navigation.navigate("Service", {
                      type,
                      categoryId: item._id,
                    });
                  }}
                >
                  <Text>{item.name}</Text>
                  <Text note>
                    Total Available Services: {item.totalServices}
                  </Text>
                </ListItem>
              ))}
            </List>
          );
        }}
      </AvailableCategoriesComponent>
    );
  }
}
