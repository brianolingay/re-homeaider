import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AvailableCategorieResponse = {
  __typename?: "AvailableCategorieResponse";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  totalServices: Scalars["Float"];
};

export type Category = {
  __typename?: "Category";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  services?: Maybe<Array<Service>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CategoryInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type ErrorResponse = {
  __typename?: "ErrorResponse";
  path: Scalars["String"];
  message: Scalars["String"];
};

export type FindServicesByCategoryResponse = {
  __typename?: "FindServicesByCategoryResponse";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  totalUsers: Scalars["Float"];
};

export type FormSubmitResponse = {
  __typename?: "FormSubmitResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};

export type LocationResponse = {
  __typename?: "LocationResponse";
  coordinates?: Maybe<Array<Scalars["Float"]>>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  user?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Mutation = {
  __typename?: "Mutation";
  register?: Maybe<FormSubmitResponse>;
  login?: Maybe<LoginResponse>;
  logout: Scalars["Boolean"];
  createCategory?: Maybe<FormSubmitResponse>;
  updateCategory?: Maybe<FormSubmitResponse>;
  deleteCategory?: Maybe<FormSubmitResponse>;
  createRole?: Maybe<FormSubmitResponse>;
  updateRole?: Maybe<FormSubmitResponse>;
  deleteRole?: Maybe<FormSubmitResponse>;
  createService?: Maybe<FormSubmitResponse>;
  updateService?: Maybe<FormSubmitResponse>;
  deleteService?: Maybe<FormSubmitResponse>;
  createUser?: Maybe<FormSubmitResponse>;
  updateUser?: Maybe<FormSubmitResponse>;
  deleteUser?: Maybe<FormSubmitResponse>;
  createUserSubscription?: Maybe<FormSubmitResponse>;
  updateUserSubscription?: Maybe<FormSubmitResponse>;
  deleteUserSubscription?: Maybe<FormSubmitResponse>;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
  role: Scalars["String"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationCreateCategoryArgs = {
  input: CategoryInput;
};

export type MutationUpdateCategoryArgs = {
  input: CategoryInput;
  categoryId: Scalars["ObjectId"];
};

export type MutationDeleteCategoryArgs = {
  categoryId: Scalars["ObjectId"];
};

export type MutationCreateRoleArgs = {
  input: RoleInput;
};

export type MutationUpdateRoleArgs = {
  input: RoleInput;
  roleId: Scalars["ObjectId"];
};

export type MutationDeleteRoleArgs = {
  roleId: Scalars["ObjectId"];
};

export type MutationCreateServiceArgs = {
  input: ServiceInput;
  categoryId: Scalars["ObjectId"];
};

export type MutationUpdateServiceArgs = {
  input: ServiceInput;
  serviceId: Scalars["ObjectId"];
  categoryId: Scalars["ObjectId"];
};

export type MutationDeleteServiceArgs = {
  serviceId: Scalars["ObjectId"];
  categoryId: Scalars["ObjectId"];
};

export type MutationCreateUserArgs = {
  input: UserInput;
  role: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  input: UserInput;
  userId: Scalars["ObjectId"];
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ObjectId"];
};

export type MutationCreateUserSubscriptionArgs = {
  input: UserSubscriptionInput;
};

export type MutationUpdateUserSubscriptionArgs = {
  input: UserSubscriptionInput;
  userSubscriptionId: Scalars["ObjectId"];
};

export type MutationDeleteUserSubscriptionArgs = {
  userSubscriptionId: Scalars["ObjectId"];
};

/** Type of payment mode */
export enum PaymentMode {
  Free = "Free",
  Monthly = "Monthly",
  Yearly = "Yearly",
  Forever = "Forever",
}

export type Query = {
  __typename?: "Query";
  categories?: Maybe<Array<Category>>;
  availableCategories?: Maybe<Array<AvailableCategorieResponse>>;
  currentLocation?: Maybe<LocationResponse>;
  roles?: Maybe<Array<Role>>;
  services?: Maybe<Array<Service>>;
  findServicesByCategory?: Maybe<Array<FindServicesByCategoryResponse>>;
  me?: Maybe<User>;
  allAdminExceptCurrentUser?: Maybe<Array<User>>;
  userSubscriptions?: Maybe<Array<UserSubscription>>;
};

export type QueryFindServicesByCategoryArgs = {
  categoryId: Scalars["ObjectId"];
};

export type RegisterInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mobile: Scalars["String"];
  password: Scalars["String"];
};

export type Role = {
  __typename?: "Role";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  key: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type RoleInput = {
  name: Scalars["String"];
  key: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type Service = {
  __typename?: "Service";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  statement: Scalars["String"];
  category?: Maybe<Category>;
  serviceActions?: Maybe<Array<ServiceAction>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceAction = {
  __typename?: "ServiceAction";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  service?: Maybe<Service>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceActionInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type ServiceInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  statement: Scalars["String"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ObjectId"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mobile: Scalars["String"];
  phone?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  coordinates?: Maybe<Array<Scalars["Float"]>>;
  userSubscription?: Maybe<UserSubscription>;
  subscribedAt?: Maybe<Scalars["DateTime"]>;
  role?: Maybe<Role>;
};

export type UserInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  mobile: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
};

export type UserSubscription = {
  __typename?: "UserSubscription";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  amount: Scalars["Float"];
  benefits?: Maybe<Array<Scalars["String"]>>;
  paymentMode: PaymentMode;
};

export type UserSubscriptionInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  amount: Scalars["Float"];
  benefits?: Maybe<Array<Scalars["String"]>>;
  paymentMode: PaymentMode;
};
export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<
    { __typename?: "LoginResponse" } & {
      user: Maybe<{ __typename?: "User" } & UserInfoFragment>;
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type RegisterMutationVariables = {
  role: Scalars["String"];
  input: RegisterInput;
};

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type RoleInfoFragment = { __typename?: "Role" } & Pick<
  Role,
  "_id" | "name" | "key" | "description"
>;

export type CreateRoleMutationVariables = {
  input: RoleInput;
};

export type CreateRoleMutation = { __typename?: "Mutation" } & {
  createRole: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type DeleteRoleMutationVariables = {
  roleId: Scalars["ObjectId"];
};

export type DeleteRoleMutation = { __typename?: "Mutation" } & {
  deleteRole: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type UpdateRoleMutationVariables = {
  roleId: Scalars["ObjectId"];
  input: RoleInput;
};

export type UpdateRoleMutation = { __typename?: "Mutation" } & {
  updateRole: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type AllRolesQueryVariables = {};

export type AllRolesQuery = { __typename?: "Query" } & {
  roles: Maybe<Array<{ __typename?: "Role" } & RoleInfoFragment>>;
};

export type ErrorInfoFragment = { __typename?: "ErrorResponse" } & Pick<
  ErrorResponse,
  "path" | "message"
>;

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "_id" | "email" | "firstName" | "lastName" | "mobile"
> & { role: Maybe<{ __typename?: "Role" } & RoleInfoFragment> };

export type CreateUserMutationVariables = {
  role: Scalars["String"];
  input: UserInput;
};

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type DeleteUserMutationVariables = {
  userId: Scalars["ObjectId"];
};

export type DeleteUserMutation = { __typename?: "Mutation" } & {
  deleteUser: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type UpdateUserMutationVariables = {
  userId: Scalars["ObjectId"];
  input: UserInput;
};

export type UpdateUserMutation = { __typename?: "Mutation" } & {
  updateUser: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type AllAdminExceptCurrentUserQueryVariables = {};

export type AllAdminExceptCurrentUserQuery = { __typename?: "Query" } & {
  allAdminExceptCurrentUser: Maybe<
    Array<{ __typename?: "User" } & UserInfoFragment>
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserInfoFragment>;
};
export const ErrorInfoFragmentDoc = gql`
  fragment ErrorInfo on ErrorResponse {
    path
    message
  }
`;
export const RoleInfoFragmentDoc = gql`
  fragment RoleInfo on Role {
    _id
    name
    key
    description
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    role {
      ...RoleInfo
    }
  }
  ${RoleInfoFragmentDoc}
`;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserInfo
      }
      errors {
        ...ErrorInfo
      }
    }
  }
  ${UserInfoFragmentDoc}
  ${ErrorInfoFragmentDoc}
`;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;

export function useLoginMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutMutationVariables
>;

export function useLogoutMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export const RegisterDocument = gql`
  mutation Register($role: String!, $input: RegisterInput!) {
    register(role: $role, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;

export function useRegisterMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export const CreateRoleDocument = gql`
  mutation CreateRole($input: RoleInput!) {
    createRole(input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type CreateRoleMutationFn = ReactApollo.MutationFn<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;

export function useCreateRoleMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >(CreateRoleDocument, baseOptions);
}
export const DeleteRoleDocument = gql`
  mutation DeleteRole($roleId: ObjectId!) {
    deleteRole(roleId: $roleId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type DeleteRoleMutationFn = ReactApollo.MutationFn<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;

export function useDeleteRoleMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >(DeleteRoleDocument, baseOptions);
}
export const UpdateRoleDocument = gql`
  mutation UpdateRole($roleId: ObjectId!, $input: RoleInput!) {
    updateRole(roleId: $roleId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type UpdateRoleMutationFn = ReactApollo.MutationFn<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;

export function useUpdateRoleMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >(UpdateRoleDocument, baseOptions);
}
export const AllRolesDocument = gql`
  query allRoles {
    roles {
      ...RoleInfo
    }
  }
  ${RoleInfoFragmentDoc}
`;

export function useAllRolesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AllRolesQueryVariables>
) {
  return ReactApolloHooks.useQuery<AllRolesQuery, AllRolesQueryVariables>(
    AllRolesDocument,
    baseOptions
  );
}
export const CreateUserDocument = gql`
  mutation CreateUser($role: String!, $input: UserInput!) {
    createUser(role: $role, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type CreateUserMutationFn = ReactApollo.MutationFn<
  CreateUserMutation,
  CreateUserMutationVariables
>;

export function useCreateUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateUserMutation,
    CreateUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CreateUserDocument, baseOptions);
}
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: ObjectId!) {
    deleteUser(userId: $userId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type DeleteUserMutationFn = ReactApollo.MutationFn<
  DeleteUserMutation,
  DeleteUserMutationVariables
>;

export function useDeleteUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DeleteUserDocument, baseOptions);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($userId: ObjectId!, $input: UserInput!) {
    updateUser(userId: $userId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

export function useUpdateUserMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(UpdateUserDocument, baseOptions);
}
export const AllAdminExceptCurrentUserDocument = gql`
  query AllAdminExceptCurrentUser {
    allAdminExceptCurrentUser {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

export function useAllAdminExceptCurrentUserQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    AllAdminExceptCurrentUserQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    AllAdminExceptCurrentUserQuery,
    AllAdminExceptCurrentUserQueryVariables
  >(AllAdminExceptCurrentUserDocument, baseOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

export function useMeQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<MeQueryVariables>
) {
  return ReactApolloHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
