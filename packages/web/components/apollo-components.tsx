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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Category = {
  __typename?: "Category";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  service: Service;
  statement: Scalars["String"];
  details: Scalars["JSON"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CategoryInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  statement: Scalars["String"];
  details: Scalars["JSON"];
};

export type ErrorResponse = {
  __typename?: "ErrorResponse";
  path: Scalars["String"];
  message: Scalars["String"];
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
  service: Scalars["ObjectId"];
};

export type MutationUpdateCategoryArgs = {
  input: CategoryInput;
  categoryId: Scalars["ObjectId"];
  service: Scalars["ObjectId"];
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
};

export type MutationUpdateServiceArgs = {
  input: ServiceInput;
  serviceId: Scalars["ObjectId"];
};

export type MutationDeleteServiceArgs = {
  serviceId: Scalars["ObjectId"];
};

export type MutationCreateUserArgs = {
  input: UserInput;
  role: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  input: UserInput;
  role: Scalars["ObjectId"];
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
  categoriesByServiceId?: Maybe<Array<Category>>;
  category?: Maybe<Category>;
  currentLocation?: Maybe<LocationResponse>;
  roles?: Maybe<Array<Role>>;
  services?: Maybe<Array<Service>>;
  service?: Maybe<Service>;
  me?: Maybe<User>;
  allAdminExceptCurrentUser?: Maybe<Array<User>>;
  userSubscriptions?: Maybe<Array<UserSubscription>>;
};

export type QueryCategoriesByServiceIdArgs = {
  serviceId: Scalars["ObjectId"];
};

export type QueryCategoryArgs = {
  categoryId: Scalars["ObjectId"];
};

export type QueryServiceArgs = {
  serviceId: Scalars["ObjectId"];
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
  categories?: Maybe<Array<Category>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
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

export type CategoryInfoFragment = { __typename?: "Category" } & Pick<
  Category,
  "_id" | "name" | "description" | "statement" | "details"
> & { service: { __typename?: "Service" } & ServiceInfoFragment };

export type CreateCategoryMutationVariables = {
  service: Scalars["ObjectId"];
  input: CategoryInput;
};

export type CreateCategoryMutation = { __typename?: "Mutation" } & {
  createCategory: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type DeleteCategoryMutationVariables = {
  categoryId: Scalars["ObjectId"];
};

export type DeleteCategoryMutation = { __typename?: "Mutation" } & {
  deleteCategory: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type UpdateCategoryMutationVariables = {
  service: Scalars["ObjectId"];
  categoryId: Scalars["ObjectId"];
  input: CategoryInput;
};

export type UpdateCategoryMutation = { __typename?: "Mutation" } & {
  updateCategory: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type CategoriesQueryVariables = {};

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Maybe<Array<{ __typename?: "Category" } & CategoryInfoFragment>>;
};

export type CategoriesByServiceIdQueryVariables = {
  serviceId: Scalars["ObjectId"];
};

export type CategoriesByServiceIdQuery = { __typename?: "Query" } & {
  categoriesByServiceId: Maybe<
    Array<{ __typename?: "Category" } & CategoryInfoFragment>
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

export type ServiceInfoFragment = { __typename?: "Service" } & Pick<
  Service,
  "_id" | "name" | "description"
>;

export type CreateServiceMutationVariables = {
  input: ServiceInput;
};

export type CreateServiceMutation = { __typename?: "Mutation" } & {
  createService: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type DeleteServiceMutationVariables = {
  serviceId: Scalars["ObjectId"];
};

export type DeleteServiceMutation = { __typename?: "Mutation" } & {
  deleteService: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type UpdateServiceMutationVariables = {
  serviceId: Scalars["ObjectId"];
  input: ServiceInput;
};

export type UpdateServiceMutation = { __typename?: "Mutation" } & {
  updateService: Maybe<
    { __typename?: "FormSubmitResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type ServicesQueryVariables = {};

export type ServicesQuery = { __typename?: "Query" } & {
  services: Maybe<Array<{ __typename?: "Service" } & ServiceInfoFragment>>;
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
  role: Scalars["ObjectId"];
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
export const ServiceInfoFragmentDoc = gql`
  fragment ServiceInfo on Service {
    _id
    name
    description
  }
`;
export const CategoryInfoFragmentDoc = gql`
  fragment CategoryInfo on Category {
    _id
    name
    description
    statement
    details
    service {
      ...ServiceInfo
    }
  }
  ${ServiceInfoFragmentDoc}
`;
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
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
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
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
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
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($service: ObjectId!, $input: CategoryInput!) {
    createCategory(service: $service, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type CreateCategoryMutationFn = ReactApollo.MutationFn<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

export function useCreateCategoryMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, baseOptions);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($categoryId: ObjectId!) {
    deleteCategory(categoryId: $categoryId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type DeleteCategoryMutationFn = ReactApollo.MutationFn<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;

export function useDeleteCategoryMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument, baseOptions);
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory(
    $service: ObjectId!
    $categoryId: ObjectId!
    $input: CategoryInput!
  ) {
    updateCategory(service: $service, categoryId: $categoryId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type UpdateCategoryMutationFn = ReactApollo.MutationFn<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

export function useUpdateCategoryMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, baseOptions);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export const CategoriesDocument = gql`
  query Categories {
    categories {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;

export function useCategoriesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<CategoriesQueryVariables>
) {
  return ReactApolloHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export const CategoriesByServiceIdDocument = gql`
  query CategoriesByServiceId($serviceId: ObjectId!) {
    categoriesByServiceId(serviceId: $serviceId) {
      ...CategoryInfo
    }
  }
  ${CategoryInfoFragmentDoc}
`;

export function useCategoriesByServiceIdQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    CategoriesByServiceIdQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    CategoriesByServiceIdQuery,
    CategoriesByServiceIdQueryVariables
  >(CategoriesByServiceIdDocument, baseOptions);
}
export type CategoriesByServiceIdQueryHookResult = ReturnType<
  typeof useCategoriesByServiceIdQuery
>;
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
export type CreateRoleMutationHookResult = ReturnType<
  typeof useCreateRoleMutation
>;
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
export type DeleteRoleMutationHookResult = ReturnType<
  typeof useDeleteRoleMutation
>;
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
export type UpdateRoleMutationHookResult = ReturnType<
  typeof useUpdateRoleMutation
>;
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
export type AllRolesQueryHookResult = ReturnType<typeof useAllRolesQuery>;
export const CreateServiceDocument = gql`
  mutation CreateService($input: ServiceInput!) {
    createService(input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type CreateServiceMutationFn = ReactApollo.MutationFn<
  CreateServiceMutation,
  CreateServiceMutationVariables
>;

export function useCreateServiceMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >(CreateServiceDocument, baseOptions);
}
export type CreateServiceMutationHookResult = ReturnType<
  typeof useCreateServiceMutation
>;
export const DeleteServiceDocument = gql`
  mutation DeleteService($serviceId: ObjectId!) {
    deleteService(serviceId: $serviceId) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type DeleteServiceMutationFn = ReactApollo.MutationFn<
  DeleteServiceMutation,
  DeleteServiceMutationVariables
>;

export function useDeleteServiceMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteServiceMutation,
    DeleteServiceMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteServiceMutation,
    DeleteServiceMutationVariables
  >(DeleteServiceDocument, baseOptions);
}
export type DeleteServiceMutationHookResult = ReturnType<
  typeof useDeleteServiceMutation
>;
export const UpdateServiceDocument = gql`
  mutation UpdateService($serviceId: ObjectId!, $input: ServiceInput!) {
    updateService(serviceId: $serviceId, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
  ${ErrorInfoFragmentDoc}
`;
export type UpdateServiceMutationFn = ReactApollo.MutationFn<
  UpdateServiceMutation,
  UpdateServiceMutationVariables
>;

export function useUpdateServiceMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >(UpdateServiceDocument, baseOptions);
}
export type UpdateServiceMutationHookResult = ReturnType<
  typeof useUpdateServiceMutation
>;
export const ServicesDocument = gql`
  query Services {
    services {
      ...ServiceInfo
    }
  }
  ${ServiceInfoFragmentDoc}
`;

export function useServicesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<ServicesQueryVariables>
) {
  return ReactApolloHooks.useQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
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
export type CreateUserMutationHookResult = ReturnType<
  typeof useCreateUserMutation
>;
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
export type DeleteUserMutationHookResult = ReturnType<
  typeof useDeleteUserMutation
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser(
    $userId: ObjectId!
    $role: ObjectId!
    $input: UserInput!
  ) {
    updateUser(userId: $userId, role: $role, input: $input) {
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
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
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
export type AllAdminExceptCurrentUserQueryHookResult = ReturnType<
  typeof useAllAdminExceptCurrentUserQuery
>;
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
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
