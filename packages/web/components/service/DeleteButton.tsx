import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ServicesQuery, DeleteServiceComponent } from "../apollo-components";

type Props = {
  categoryId: string;
  serviceId: string;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({
  categoryId,
  serviceId,
  refetch,
}) => (
  <DeleteServiceComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { categoryId, serviceId },
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
  </DeleteServiceComponent>
);
