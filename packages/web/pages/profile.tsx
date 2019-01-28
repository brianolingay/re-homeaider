import * as React from "react";
import { Grid, Card, List, Button, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import { withAuth } from "../components/withAuth";
import {
  UserInfoFragment,
  UpdateUserComponent,
} from "../components/apollo-components";
import { EditForm, EditFormValues } from "../components/profile/EditForm";

interface State {
  isEditing: boolean;
}

type Props = {
  me: UserInfoFragment;
};

class Profile extends React.PureComponent<Props, State> {
  state = {
    isEditing: false,
  };

  handleEditing = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  render() {
    const { me } = this.props;
    return (
      <Layout title={`${me.firstName} ${me.lastName} Profile`} showMenu={true}>
        <Grid>
          <Grid.Column width={4}>{/* Image should be here... */}</Grid.Column>
          <Grid.Column width={9}>
            <Grid columns={1}>
              <Grid.Column />
              <Grid.Column>
                {this.state.isEditing ? (
                  <UpdateUserComponent>
                    {mutate => (
                      <EditForm
                        user={{
                          userId: me._id,
                          email: me.email,
                          firstName: me.firstName,
                          lastName: me.lastName,
                          mobile: me.mobile,
                          password: "",
                          role: "admin",
                        }}
                        handleEditing={this.handleEditing}
                        submit={async ({
                          userId,
                          role,
                          ...input
                        }: EditFormValues) => {
                          return await mutate({
                            variables: { userId, input },
                          });
                        }}
                      />
                    )}
                  </UpdateUserComponent>
                ) : (
                  <Card.Group>
                    <Card fluid color="blue">
                      <Card.Content>
                        <Card.Header>
                          Acount Info
                          <Button
                            floated="right"
                            icon
                            labelPosition="left"
                            primary
                            size="mini"
                            onClick={this.handleEditing}
                          >
                            <Icon name="pencil" /> Edit Acount
                          </Button>
                        </Card.Header>
                      </Card.Content>
                      <Card.Content>
                        <List divided relaxed>
                          <List.Item>
                            <List.Content>
                              <List.Description>Email</List.Description>
                              <List.Header>{me.email}</List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Description>Fullname</List.Description>
                              <List.Header>
                                {me.firstName} {me.lastName}
                              </List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Description>Mobile</List.Description>
                              <List.Header>{me.mobile}</List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Description as="a">
                                Password
                              </List.Description>
                              <List.Header color="grey">********</List.Header>
                            </List.Content>
                          </List.Item>
                        </List>
                      </Card.Content>
                    </Card>

                    <Card fluid color="red">
                      <Card.Content>
                        <Card.Header content="Certificates" />
                        <Card.Description content="No data available" />
                      </Card.Content>
                    </Card>
                  </Card.Group>
                )}
              </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={3} />
        </Grid>
      </Layout>
    );
  }
}

export default withAuth(Profile);
