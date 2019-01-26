import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import {
  CategoryInfoFragment,
  UpdateCategoryComponent,
  CategoriesQuery,
} from "../apollo-components";
import { ModalFormContainer } from "../ModelFormContainer";
import { CategoryForm, CategoryFormValues } from "./CategoryForm";

type Props = {
  item: CategoryInfoFragment;
  handleModalFormContainer: () => void;
  modalOpen: boolean;
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
};

export const UpdateButton: React.SFC<Props> = ({
  item,
  handleModalFormContainer,
  modalOpen,
  refetch,
}) => (
  <ModalFormContainer
    key={`modal${item._id}`}
    trigger={
      <Button
        animated="vertical"
        onClick={handleModalFormContainer}
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
    open={modalOpen}
    header="Edit Category"
  >
    <UpdateCategoryComponent>
      {mutate => (
        <CategoryForm
          category={{
            categoryId: item._id,
            name: item.name,
            description: item.description,
          }}
          handleModal={handleModalFormContainer}
          submit={async ({ categoryId, ...input }: CategoryFormValues) => {
            return await mutate({
              variables: { categoryId, input },
            });
          }}
          method="updateCategory"
          refetch={refetch}
        />
      )}
    </UpdateCategoryComponent>
  </ModalFormContainer>
);
