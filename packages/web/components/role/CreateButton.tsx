import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import { RolesQuery, CreateRoleComponent } from "../apollo-components";
import { RoleForm, RoleFormValues } from "./RoleForm";

type Props = {
  refetch: () => Promise<ApolloQueryResult<RolesQuery>>;
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
            <Icon name="plus" /> New Role
          </Button>
        }
        open={this.state.modalOpen}
        header="New Role"
      >
        <CreateRoleComponent>
          {mutate => (
            <RoleForm
              role={null}
              handleModal={this.handleModalFormContainer}
              submit={async ({ roleId, ...input }: RoleFormValues) => {
                return await mutate({
                  variables: { input },
                });
              }}
              method="createRole"
              refetch={refetch}
            />
          )}
        </CreateRoleComponent>
      </ModalFormContainer>
    );
  }
}

export const CreateButton = CreateButtonComponent;
