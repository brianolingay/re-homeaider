import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import { CreateCategoryComponent, CategoriesQuery } from "../apollo-components";
import { CategoryForm, CategoryFormValues } from "./CategoryForm";

type Props = {
  handleModalFormContainer: () => void;
  modalOpen: boolean;
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
};

export const CreateButton: React.SFC<Props> = ({
  handleModalFormContainer,
  modalOpen,
  refetch,
}) => (
  <ModalFormContainer
    trigger={
      <Button
        floated="right"
        icon
        labelPosition="left"
        primary
        size="small"
        onClick={handleModalFormContainer}
      >
        <Icon name="plus" /> New Category
      </Button>
    }
    open={modalOpen}
    header="New Category"
  >
    <CreateCategoryComponent>
      {mutate => (
        <CategoryForm
          category={null}
          handleModal={handleModalFormContainer}
          submit={async ({ categoryId, ...input }: CategoryFormValues) => {
            return await mutate({
              variables: { input },
            });
          }}
          method="createCategory"
          refetch={refetch}
        />
      )}
    </CreateCategoryComponent>
  </ModalFormContainer>
);
