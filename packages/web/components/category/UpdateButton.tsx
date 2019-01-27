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
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
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
              handleModal={this.handleModalFormContainer}
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
  }
}

export const UpdateButton = UpdateButtonComponent;
