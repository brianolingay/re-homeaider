import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import {
  UserInfoFragment,
  AllAdminExceptMeQuery,
  UpdateUserComponent,
} from "../apollo-components";
import { ModalFormContainer } from "../ModelFormContainer";
import { UserForm, UserFormValues } from "./UserForm";

type Props = {
  item: UserInfoFragment;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptMeQuery>>;
};

interface State {
  modalOpen: boolean;
}

class UpdateButtonComponent extends React.PureComponent<Props, State> {
  state = {
    modalOpen: false,
  };

  handleModalFormContainer = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    const { item, refetch } = this.props;
    return (
      <ModalFormContainer
        key={`modal${item._id}`}
        trigger={
          <Button
            animated="vertical"
            onClick={this.handleModalFormContainer}
            floated="right"
            color="blue"
            size="mini"
          >
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon name="pencil" />
            </Button.Content>
          </Button>
        }
        open={this.state.modalOpen}
        header="Edit User"
      >
        <UpdateUserComponent>
          {mutate => (
            <UserForm
              user={{
                userId: item._id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                mobile: item.mobile,
                password: "",
                role: "admin",
              }}
              handleModal={this.handleModalFormContainer}
              submit={async ({ userId, role, ...input }: UserFormValues) => {
                return await mutate({
                  variables: { userId, input },
                });
              }}
              method="updateUser"
              refetch={refetch}
            />
          )}
        </UpdateUserComponent>
      </ModalFormContainer>
    );
  }
}

export const UpdateButton = UpdateButtonComponent;
