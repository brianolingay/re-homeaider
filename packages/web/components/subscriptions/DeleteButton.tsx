import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import {
  UserSubscriptionsQuery,
  DeleteUserSubscriptionComponent,
} from "../apollo-components";

type Props = {
  userSubscriptionId: string;
  refetch: () => Promise<ApolloQueryResult<UserSubscriptionsQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({
  userSubscriptionId,
  refetch,
}) => (
  <DeleteUserSubscriptionComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { userSubscriptionId },
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
  </DeleteUserSubscriptionComponent>
);
