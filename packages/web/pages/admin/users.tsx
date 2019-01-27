import * as React from "react";
import { Table, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loader";
import { AllAdminExceptMeComponent } from "../../components/apollo-components";
import { CreateButton } from "../../components/user/CreateButton";
import { UpdateButton } from "../../components/user/UpdateButton";
import { DeleteButton } from "../../components/user/DeleteButton";
import { withAuth } from "../../components/withAuth";

class Users extends React.PureComponent<{}> {
  render() {
    return (
      <Layout title="Users" showMenu={true}>
        {/* @ts-ignore */}
        <AllAdminExceptMeComponent>
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
                        <Table.HeaderCell>Full Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Mobile</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">
                          Actions
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {data ? (
                        data.allAdminExceptMe.map(item => (
                          <Table.Row key={item._id}>
                            <Table.Cell>
                              {item.firstName} {item.lastName}
                            </Table.Cell>
                            <Table.Cell>{item.email}</Table.Cell>
                            <Table.Cell>{item.mobile}</Table.Cell>
                            <Table.Cell>{item.role.name}</Table.Cell>
                            <Table.Cell>
                              <DeleteButton
                                key={`user-del-${item._id}`}
                                userId={item._id}
                                refetch={refetch}
                              />
                              <UpdateButton
                                key={`user-update-${item._id}`}
                                item={item}
                                refetch={refetch}
                              />
                            </Table.Cell>
                          </Table.Row>
                        ))
                      ) : (
                        <Table.Row>
                          <Table.HeaderCell />
                          <Table.HeaderCell />
                          <Table.HeaderCell>No Data</Table.HeaderCell>
                          <Table.HeaderCell />
                          <Table.HeaderCell />
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </Grid.Column>
              </Grid>
            );
          }}
        </AllAdminExceptMeComponent>
      </Layout>
    );
  }
}

export default withAuth(Users);
