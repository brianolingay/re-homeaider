import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import {
  SubscriptionInfoFragment,
  SubscriptionsQuery,
  UpdateSubscriptionComponent,
} from "../apollo-components";
import { SubscriptionFormValues, SubscriptionForm } from "./SubscriptionForm";

type Props = {
  item: SubscriptionInfoFragment;
  refetch: () => Promise<ApolloQueryResult<SubscriptionsQuery>>;
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
        header="Edit Subscription"
      >
        <UpdateSubscriptionComponent>
          {mutate => (
            <SubscriptionForm
              subscription={{
                subscriptionId: item._id,
                name: item.name,
                description: item.description,
                benefits: item.benefits.join("\n"),
                amount: item.amount,
                paymentMode: item.paymentMode,
              }}
              handleModal={this.handleModalFormContainer}
              submit={async ({
                subscriptionId,
                benefits,
                ...input
              }: SubscriptionFormValues) => {
                const newBenefits = { benefits: benefits.split(/\r\n|\n|\r/) };
                const newInput = { ...input, ...newBenefits };
                return await mutate({
                  variables: { subscriptionId, input: newInput },
                });
              }}
              method="updateSubscription"
              refetch={refetch}
            />
          )}
        </UpdateSubscriptionComponent>
      </ModalFormContainer>
    );
  }
}

export const UpdateButton = UpdateButtonComponent;
