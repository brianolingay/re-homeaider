import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { CategoriesQuery, DeleteCategoryComponent } from "../apollo-components";

type Props = {
  categoryId: string;
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
};

export const DeleteButton: React.SFC<Props> = ({ categoryId, refetch }) => (
  <DeleteCategoryComponent>
    {mutate => {
      return (
        <Button
          animated="vertical"
          onClick={async () => {
            await mutate({
              variables: { categoryId },
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
  </DeleteCategoryComponent>
);
