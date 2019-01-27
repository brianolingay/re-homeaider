import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import {
  ServiceInfoFragment,
  ServicesQuery,
  UpdateServiceComponent,
  CategoryInfoFragment,
} from "../apollo-components";
import { ServiceFormValues, ServiceForm } from "./ServiceForm";

type Props = {
  categories: CategoryInfoFragment[];
  item: ServiceInfoFragment;
  refetch: () => Promise<ApolloQueryResult<ServicesQuery>>;
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
    const { categories, item, refetch } = this.props;
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
        header="Edit Service"
      >
        <UpdateServiceComponent>
          {mutate => (
            <ServiceForm
              categories={categories}
              service={{
                serviceId: item._id,
                category: item.category._id,
                name: item.name,
                description: item.description,
              }}
              handleModal={this.handleModalFormContainer}
              submit={async ({
                category,
                serviceId,
                ...input
              }: ServiceFormValues) => {
                return await mutate({
                  variables: { categoryId: category, serviceId, input },
                });
              }}
              method="updateService"
              refetch={refetch}
            />
          )}
        </UpdateServiceComponent>
      </ModalFormContainer>
    );
  }
}

export const UpdateButton = UpdateButtonComponent;
