import * as React from "react";
import { Table, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import { RolesComponent } from "../components/apollo-components";
import Loading from "../components/Loader";
import { CreateButton } from "../components/role/CreateButton";
import { UpdateButton } from "../components/role/UpdateButton";
import { DeleteButton } from "../components/role/DeleteButton";

export default class PickRepo extends React.PureComponent<{}> {
  render() {
    return (
      <Layout title="Role" showMenu={true}>
        {/* @ts-ignore */}
        <RolesComponent>
          {({ data, loading, refetch }) => {
            if (loading) {
              return <Loading />;
            }

            return (
              <Grid columns={1} padded="vertically">
                <Grid.Column>
                  <CreateButton refetch={refetch} />
                </Grid.Column>
                <Grid.Column>
                  <Table fixed>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {data ? (
                        data.roles.map(item => (
                          <Table.Row key={item._id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                              <DeleteButton
                                roleId={item._id}
                                refetch={refetch}
                              />
                              <UpdateButton item={item} refetch={refetch} />
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
        </RolesComponent>
      </Layout>
    );
  }
}
