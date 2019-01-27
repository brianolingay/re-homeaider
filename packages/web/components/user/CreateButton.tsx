import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import {
  AllAdminExceptMeQuery,
  CreateUserComponent,
} from "../apollo-components";
import { UserForm, UserFormValues } from "./UserForm";

type Props = {
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptMeQuery>>;
};

interface State {
  modalOpen: boolean;
}

class CreateButtonComponent extends React.PureComponent<Props, State> {
  state = {
    modalOpen: false,
  };

  handleModalFormContainer = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    const { refetch } = this.props;
    return (
      <ModalFormContainer
        trigger={
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={this.handleModalFormContainer}
          >
            <Icon name="plus" /> New User
          </Button>
        }
        open={this.state.modalOpen}
        header="New User"
      >
        <CreateUserComponent>
          {mutate => (
            <UserForm
              user={null}
              handleModal={this.handleModalFormContainer}
              submit={async ({ userId, role, ...input }: UserFormValues) => {
                return await mutate({
                  variables: { input },
                });
              }}
              method="createUser"
              refetch={refetch}
            />
          )}
        </CreateUserComponent>
      </ModalFormContainer>
    );
  }
}

export const CreateButton = CreateButtonComponent;
