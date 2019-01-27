import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import {
  AllAdminExceptMeQuery,
  DeleteUserComponent,
} from "../apollo-components";

type Props = {
  userId: string;
  refetch: () => Promise<ApolloQueryResult<AllAdminExceptMeQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({ userId, refetch }) => (
  <DeleteUserComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { userId },
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
  </DeleteUserComponent>
);
