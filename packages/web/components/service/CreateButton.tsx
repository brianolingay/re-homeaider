import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import { ServicesQuery, CreateServiceComponent } from "../apollo-components";
import {
  ServiceForm,
  ServiceFormValues,
  CategoriesOptions,
} from "./ServiceForm";

type Props = {
  categories: CategoriesOptions[];
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
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
    const { categories, refetch } = this.props;
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
            <Icon name="plus" /> New Service
          </Button>
        }
        open={this.state.modalOpen}
        header="New Service"
      >
        <CreateServiceComponent>
          {mutate => (
            <ServiceForm
              categories={categories}
              service={null}
              handleModal={this.handleModalFormContainer}
              submit={async ({
                category,
                serviceId,
                ...input
              }: ServiceFormValues) => {
                return await mutate({
                  variables: { categoryId: category, input },
                });
              }}
              method="createService"
              refetch={refetch}
            />
          )}
        </CreateServiceComponent>
      </ModalFormContainer>
    );
  }
}

export const CreateButton = CreateButtonComponent;
