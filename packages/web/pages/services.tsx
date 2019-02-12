import * as React from "react";
import { Table, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import Loading from "../components/Loader";
import { NextContextWithApollo } from "../types/NextContextWithApollo";
import {
  ServicesComponent,
  CategoriesQuery,
} from "../components/apollo-components";
import { categoriesQuery } from "../graphql/category/queries/categories";
import { CreateButton } from "../components/service/CreateButton";
import { UpdateButton } from "../components/service/UpdateButton";
import { DeleteButton } from "../components/service/DeleteButton";
import { CategoriesOptions } from "../components/service/ServiceForm";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

export default class Services extends React.PureComponent<{
  categories: CategoriesOptions[];
}> {
  static async getInitialProps(context: NextContextWithApollo) {
    const { loggedInUser } = await checkLoggedIn(context);

    if (!loggedInUser.me) {
      redirect(context, "/login");
    }

    const {
      data: { categories },
    } = await context.apolloClient.query<CategoriesQuery>({
      query: categoriesQuery,
    });

    return {
      categories: categories
        ? categories.map(item => ({
            key: item._id,
            value: item._id,
            text: item.name,
          }))
        : [],
    };
  }

  render() {
    return (
      <Layout title="Services" showMenu={true}>
        {/* @ts-ignore */}
        <ServicesComponent>
          {({ data, loading, refetch }) => {
            if (loading) {
              return <Loading />;
            }

            return (
              <Grid columns={1} padded="vertically">
                <Grid.Column>
                  <CreateButton
                    categories={this.props.categories}
                    refetch={refetch}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Table fixed>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                          Actions
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {data ? (
                        data.services.map(item => (
                          <Table.Row key={`tr-service-${item._id}`}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.category.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                              <DeleteButton
                                key={`service-del-${item._id}`}
                                serviceId={item._id}
                                categoryId={item.category._id}
                                refetch={refetch}
                              />
                              <UpdateButton
                                key={`service-update-${item._id}`}
                                categories={this.props.categories}
                                item={item}
                                refetch={refetch}
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))
                      ) : (
                        <Table.Row>
                          <Table.HeaderCell />
                          <Table.HeaderCell>No Data</Table.HeaderCell>
                          <Table.HeaderCell />
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid>
            );
          }}
        </ServicesComponent>
      </Layout>
    );
  }
}
