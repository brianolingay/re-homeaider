import * as React from "react";
import { ApolloQueryResult } from "apollo-boost";
import { Button, Icon } from "semantic-ui-react";
import { ModalFormContainer } from "../ModelFormContainer";
import {
  UserSubscriptionsQuery,
  CreateUserSubscriptionComponent,
} from "../apollo-components";
import { SubscriptionFormValues, SubscriptionForm } from "./SubscriptionForm";

type Props = {
  refetch: () => Promise<ApolloQueryResult<UserSubscriptionsQuery>>;
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
            <Icon name="plus" /> New Subscription
          </Button>
        }
        open={this.state.modalOpen}
        header="New Subscription"
      >
        <CreateUserSubscriptionComponent>
          {mutate => (
            <SubscriptionForm
              userSubscription={null}
              handleModal={this.handleModalFormContainer}
              submit={async ({
                userSubscriptionId,
                benefits,
                ...input
              }: SubscriptionFormValues) => {
                const newBenefits = { benefits: benefits.split(/\r\n|\n|\r/) };
                console.log(newBenefits);
                const newInput = { ...input, ...newBenefits };
                return await mutate({
                  variables: { input: newInput },
                });
              }}
              method="createSubscription"
              refetch={refetch}
            />
          )}
        </CreateUserSubscriptionComponent>
      </ModalFormContainer>
    );
  }
}

export const CreateButton = CreateButtonComponent;
