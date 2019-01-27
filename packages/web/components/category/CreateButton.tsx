import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import { CreateCategoryComponent, CategoriesQuery } from "../apollo-components";
import { CategoryForm, CategoryFormValues } from "./CategoryForm";

type Props = {
  refetch: () => Promise<ApolloQueryResult<CategoriesQuery>>;
};

interface State {
  modalOpen: boolean;
}

class CreateButtonComponent extends React.PureComponent<Props, State> {
  state = {
    modalOpen: false,
  };

  handleModalFormContainer = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  render() {
    const { refetch } = this.props;
    return (
      <ModalFormContainer
        trigger={
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={this.handleModalFormContainer}
          >
            <Icon name="plus" /> New Category
          </Button>
        }
        open={this.state.modalOpen}
        header="New Category"
      >
        <CreateCategoryComponent>
          {mutate => (
            <CategoryForm
              category={null}
              handleModal={this.handleModalFormContainer}
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
  }
}

export const CreateButton = CreateButtonComponent;
