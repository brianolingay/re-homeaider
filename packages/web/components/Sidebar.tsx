import * as React from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

export default class SideBar extends React.Component {
  state = { activeItem: "categories" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="categories"
              active={activeItem === "categories"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="services"
              active={activeItem === "services"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="subscriptions"
              active={activeItem === "subscriptions"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="roles"
              active={activeItem === "roles"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="users"
              active={activeItem === "users"}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>{this.props.children}</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
