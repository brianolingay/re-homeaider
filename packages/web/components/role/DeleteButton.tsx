import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { RolesQuery, DeleteRoleComponent } from "../apollo-components";

type Props = {
  roleId: string;
  refetch: () => Promise<ApolloQueryResult<RolesQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({ roleId, refetch }) => (
  <DeleteRoleComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { roleId },
            });
            await refetch();
          }}
          floated="right"
          color="red"
          size="mini"
        >
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name="trash" />
          </Button.Content>
        </Button>
      );
    }}
  </DeleteRoleComponent>
);
