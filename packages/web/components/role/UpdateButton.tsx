import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import {
  RoleInfoFragment,
  RolesQuery,
  UpdateRoleComponent,
} from "../apollo-components";
import { ModalFormContainer } from "../ModelFormContainer";
import { RoleForm, RoleFormValues } from "./RoleForm";

type Props = {
  item: RoleInfoFragment;
  refetch: () => Promise<ApolloQueryResult<RolesQuery>>;
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
        header="Edit Role"
      >
        <UpdateRoleComponent>
          {mutate => (
            <RoleForm
              role={{
                roleId: item._id,
                name: item.name,
                description: item.description,
              }}
              handleModal={this.handleModalFormContainer}
              submit={async ({ roleId, ...input }: RoleFormValues) => {
                return await mutate({
                  variables: { roleId, input },
                });
              }}
              method="updateRole"
              refetch={refetch}
            />
          )}
        </UpdateRoleComponent>
      </ModalFormContainer>
    );
  }
}

export const UpdateButton = UpdateButtonComponent;
