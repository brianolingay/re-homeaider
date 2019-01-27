import * as React from "react";
import { Table, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loader";
import { NextContextWithApollo } from "../../types/NextContextWithApollo";
import {
  ServicesComponent,
  CategoriesQuery,
  CategoryInfoFragment,
} from "../../components/apollo-components";
import { categoriesQuery } from "../../graphql/category/queries/categories";
import { CreateButton } from "../../components/service/CreateButton";
import { UpdateButton } from "../../components/service/UpdateButton";
import { DeleteButton } from "../../components/service/DeleteButton";
import { withAuth } from "../../components/withAuth";

class Services extends React.PureComponent<{
  categories: CategoryInfoFragment[];
}> {
  static async getInitialProps({ apolloClient }: NextContextWithApollo) {
    const {
      data: { categories },
    } = await apolloClient.query<CategoriesQuery>({
      query: categoriesQuery,
    });
    return {
      categories: categories.map(item => ({
        key: item._id,
        value: item._id,
        text: item.name,
      })),
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
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {data ? (
                        data.services.map(item => (
                          <Table.Row key={item._id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.category.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                              <DeleteButton
                                serviceId={item._id}
                                categoryId={item.category._id}
                                refetch={refetch}
                              />
                              <UpdateButton
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

export default withAuth(Services);
