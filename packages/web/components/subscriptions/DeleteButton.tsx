import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { SubscriptionsQuery, DeleteSubscriptionComponent } from "../apollo-components";

type Props = {
  subscriptionId: string;
  refetch: () => Promise<ApolloQueryResult<SubscriptionsQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({ subscriptionId, refetch }) => (
  <DeleteSubscriptionComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { subscriptionId },
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
  </DeleteSubscriptionComponent>
);
