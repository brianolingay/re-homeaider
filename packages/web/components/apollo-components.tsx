export type Maybe<T> = T | null;

export interface CategoryInput {
  name: string;

  description?: Maybe<string>;
}

export interface RoleInput {
  name: string;

  description?: Maybe<string>;
}

export interface ServiceRequestInput {
  service?: Maybe<ObjectId>;

  provider?: Maybe<ObjectId>;

  amount?: Maybe<number>;

  address?: Maybe<string>;

  coordinates?: Maybe<number[]>;

  accepted?: Maybe<boolean>;

  arrivedAt?: Maybe<DateTime>;

  startedAt?: Maybe<DateTime>;

  canceledAt?: Maybe<DateTime>;

  completedAt?: Maybe<DateTime>;

  ignoredAt?: Maybe<DateTime>;

  feedBack?: Maybe<string>;

  rating?: Maybe<number>;
}

export interface ServiceInput {
  name: string;

  description?: Maybe<string>;
}

export interface RegisterInput {
  email: string;

  firstName: string;

  lastName: string;

  mobile: string;

  password: string;
}

export interface LoginInput {
  email: string;

  password: string;
}

export interface UserInput {
  email: string;

  firstName: string;

  lastName: string;

  mobile: string;

  password?: Maybe<string>;
}

export interface UserSubscriptionInput {
  name: string;

  description?: Maybe<string>;

  amount: number;

  benefits?: Maybe<string[]>;

  paymentMode: PaymentMode;
}
/** Type of payment mode */
export enum PaymentMode {
  Free = "Free",
  Monthly = "Monthly",
  Yearly = "Yearly",
  Forever = "Forever",
}

/** Mongo object id scalar type */
export type ObjectId = any;

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type CreateCategoryVariables = {
  input: CategoryInput;
};

export type CreateCategoryMutation = {
  __typename?: "Mutation";

  createCategory: Maybe<CreateCategoryCreateCategory>;
};

export type CreateCategoryCreateCategory = {
  __typename?: "CategoryResponse";

  errors: Maybe<CreateCategoryErrors[]>;
};

export type CreateCategoryErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type DeleteCategoryVariables = {
  categoryId: ObjectId;
};

export type DeleteCategoryMutation = {
  __typename?: "Mutation";

  deleteCategory: Maybe<DeleteCategoryDeleteCategory>;
};

export type DeleteCategoryDeleteCategory = {
  __typename?: "CategoryResponse";

  errors: Maybe<DeleteCategoryErrors[]>;
};

export type DeleteCategoryErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateCategoryVariables = {
  categoryId: ObjectId;
  input: CategoryInput;
};

export type UpdateCategoryMutation = {
  __typename?: "Mutation";

  updateCategory: Maybe<UpdateCategoryUpdateCategory>;
};

export type UpdateCategoryUpdateCategory = {
  __typename?: "CategoryResponse";

  errors: Maybe<UpdateCategoryErrors[]>;
};

export type UpdateCategoryErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type CategoriesVariables = {};

export type CategoriesQuery = {
  __typename?: "Query";

  categories: Maybe<CategoriesCategories[]>;
};

export type CategoriesCategories = CategoryInfoFragment;

export type CreateRoleVariables = {
  input: RoleInput;
};

export type CreateRoleMutation = {
  __typename?: "Mutation";

  createRole: Maybe<CreateRoleCreateRole>;
};

export type CreateRoleCreateRole = {
  __typename?: "RoleResponse";

  errors: Maybe<CreateRoleErrors[]>;
};

export type CreateRoleErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type DeleteRoleVariables = {
  roleId: ObjectId;
};

export type DeleteRoleMutation = {
  __typename?: "Mutation";

  deleteRole: Maybe<DeleteRoleDeleteRole>;
};

export type DeleteRoleDeleteRole = {
  __typename?: "RoleResponse";

  errors: Maybe<DeleteRoleErrors[]>;
};

export type DeleteRoleErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateRoleVariables = {
  roleId: ObjectId;
  input: RoleInput;
};

export type UpdateRoleMutation = {
  __typename?: "Mutation";

  updateRole: Maybe<UpdateRoleUpdateRole>;
};

export type UpdateRoleUpdateRole = {
  __typename?: "RoleResponse";

  errors: Maybe<UpdateRoleErrors[]>;
};

export type UpdateRoleErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type RolesVariables = {};

export type RolesQuery = {
  __typename?: "Query";

  roles: Maybe<RolesRoles[]>;
};

export type RolesRoles = RoleInfoFragment;

export type CreateServiceVariables = {
  categoryId: ObjectId;
  input: ServiceInput;
};

export type CreateServiceMutation = {
  __typename?: "Mutation";

  createService: Maybe<CreateServiceCreateService>;
};

export type CreateServiceCreateService = {
  __typename?: "ServiceResponse";

  errors: Maybe<CreateServiceErrors[]>;
};

export type CreateServiceErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type DeleteServiceVariables = {
  categoryId: ObjectId;
  serviceId: ObjectId;
};

export type DeleteServiceMutation = {
  __typename?: "Mutation";

  deleteService: Maybe<DeleteServiceDeleteService>;
};

export type DeleteServiceDeleteService = {
  __typename?: "ServiceResponse";

  errors: Maybe<DeleteServiceErrors[]>;
};

export type DeleteServiceErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateServiceVariables = {
  categoryId: ObjectId;
  serviceId: ObjectId;
  input: ServiceInput;
};

export type UpdateServiceMutation = {
  __typename?: "Mutation";

  updateService: Maybe<UpdateServiceUpdateService>;
};

export type UpdateServiceUpdateService = {
  __typename?: "ServiceResponse";

  errors: Maybe<UpdateServiceErrors[]>;
};

export type UpdateServiceErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type ServicesVariables = {};

export type ServicesQuery = {
  __typename?: "Query";

  services: Maybe<ServicesServices[]>;
};

export type ServicesServices = ServiceInfoFragment;

export type CreateUserVariables = {
  input: UserInput;
};

export type CreateUserMutation = {
  __typename?: "Mutation";

  createUser: Maybe<CreateUserCreateUser>;
};

export type CreateUserCreateUser = {
  __typename?: "UserResponse";

  errors: Maybe<CreateUserErrors[]>;
};

export type CreateUserErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type DeleteUserVariables = {
  userId: ObjectId;
};

export type DeleteUserMutation = {
  __typename?: "Mutation";

  deleteUser: Maybe<DeleteUserDeleteUser>;
};

export type DeleteUserDeleteUser = {
  __typename?: "UserResponse";

  errors: Maybe<DeleteUserErrors[]>;
};

export type DeleteUserErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type LoginVariables = {
  isAdmin: boolean;
  input: LoginInput;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: Maybe<LoginLogin>;
};

export type LoginLogin = {
  __typename?: "LoginResponse";

  errors: Maybe<LoginErrors[]>;

  user: Maybe<LoginUser>;

  tokens: Maybe<LoginTokens>;
};

export type LoginErrors = ErrorInfoFragment;

export type LoginUser = UserInfoFragment;

export type LoginTokens = {
  __typename?: "TokensResponse";

  token: Maybe<string>;

  refreshToken: Maybe<string>;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterVariables = {
  role: string;
  input: RegisterInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: Maybe<RegisterRegister>;
};

export type RegisterRegister = {
  __typename?: "UserResponse";

  errors: Maybe<RegisterErrors[]>;
};

export type RegisterErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateUserVariables = {
  userId: ObjectId;
  input: UserInput;
};

export type UpdateUserMutation = {
  __typename?: "Mutation";

  updateUser: Maybe<UpdateUserUpdateUser>;
};

export type UpdateUserUpdateUser = {
  __typename?: "UserResponse";

  errors: Maybe<UpdateUserErrors[]>;
};

export type UpdateUserErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type AllAdminExceptMeVariables = {};

export type AllAdminExceptMeQuery = {
  __typename?: "Query";

  allAdminExceptMe: Maybe<AllAdminExceptMeAllAdminExceptMe[]>;
};

export type AllAdminExceptMeAllAdminExceptMe = UserInfoFragment;

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type CreateUserSubscriptionVariables = {
  input: UserSubscriptionInput;
};

export type CreateUserSubscriptionMutation = {
  __typename?: "Mutation";

  createUserSubscription: Maybe<CreateUserSubscriptionCreateUserSubscription>;
};

export type CreateUserSubscriptionCreateUserSubscription = {
  __typename?: "UserSubscriptionResponse";

  errors: Maybe<CreateUserSubscriptionErrors[]>;
};

export type CreateUserSubscriptionErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type DeleteUserSubscriptionVariables = {
  userSubscriptionId: ObjectId;
};

export type DeleteUserSubscriptionMutation = {
  __typename?: "Mutation";

  deleteUserSubscription: Maybe<DeleteUserSubscriptionDeleteUserSubscription>;
};

export type DeleteUserSubscriptionDeleteUserSubscription = {
  __typename?: "UserSubscriptionResponse";

  errors: Maybe<DeleteUserSubscriptionErrors[]>;
};

export type DeleteUserSubscriptionErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateUserSubscriptionVariables = {
  userSubscriptionId: ObjectId;
  input: UserSubscriptionInput;
};

export type UpdateUserSubscriptionMutation = {
  __typename?: "Mutation";

  updateUserSubscription: Maybe<UpdateUserSubscriptionUpdateUserSubscription>;
};

export type UpdateUserSubscriptionUpdateUserSubscription = {
  __typename?: "UserSubscriptionResponse";

  errors: Maybe<UpdateUserSubscriptionErrors[]>;
};

export type UpdateUserSubscriptionErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UserSubscriptionsVariables = {};

export type UserSubscriptionsQuery = {
  __typename?: "Query";

  userSubscriptions: Maybe<UserSubscriptionsUserSubscriptions[]>;
};

export type UserSubscriptionsUserSubscriptions = UserSubscriptionInfoFragment;

export type CategoryInfoFragment = {
  __typename?: "Category";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;
};

export type RoleInfoFragment = {
  __typename?: "Role";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;
};

export type ServiceInfoFragment = {
  __typename?: "Service";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;

  category: ServiceInfoCategory;
};

export type ServiceInfoCategory = {
  __typename?: "Category";

  _id: ObjectId;

  name: string;
};

export type ErrorInfoFragment = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UserInfoFragment = {
  __typename?: "User";

  _id: ObjectId;

  email: string;

  firstName: string;

  lastName: string;

  mobile: string;

  role: Maybe<UserInfoRole>;
};

export type UserInfoRole = {
  __typename?: "Role";

  _id: ObjectId;

  name: string;
};

export type UserSubscriptionInfoFragment = {
  __typename?: "UserSubscription";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;

  amount: number;

  benefits: Maybe<string[]>;

  paymentMode: PaymentMode;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const CategoryInfoFragmentDoc = gql`
  fragment CategoryInfo on Category {
    _id
    name
    description
  }
`;

export const RoleInfoFragmentDoc = gql`
  fragment RoleInfo on Role {
    _id
    name
    description
  }
`;

export const ServiceInfoFragmentDoc = gql`
  fragment ServiceInfo on Service {
    _id
    name
    description
    category {
      _id
      name
    }
  }
`;

export const ErrorInfoFragmentDoc = gql`
  fragment ErrorInfo on ErrorResponse {
    path
    message
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
      _id
      name
    }
  }
`;

export const UserSubscriptionInfoFragmentDoc = gql`
  fragment UserSubscriptionInfo on UserSubscription {
    _id
    name
    description
    amount
    benefits
    paymentMode
  }
`;

// ====================================================
// Components
// ====================================================

export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class CreateCategoryComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateCategoryMutation, CreateCategoryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateCategoryMutation, CreateCategoryVariables>
        mutation={CreateCategoryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCategoryProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateCategoryMutation, CreateCategoryVariables>
> &
  TChildProps;
export type CreateCategoryMutationFn = ReactApollo.MutationFn<
  CreateCategoryMutation,
  CreateCategoryVariables
>;
export function CreateCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCategoryMutation,
        CreateCategoryVariables,
        CreateCategoryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCategoryMutation,
    CreateCategoryVariables,
    CreateCategoryProps<TChildProps>
  >(CreateCategoryDocument, operationOptions);
}
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($categoryId: ObjectId!) {
    deleteCategory(categoryId: $categoryId) {
      errors {
        path
        message
      }
    }
  }
`;
export class DeleteCategoryComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteCategoryMutation, DeleteCategoryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteCategoryMutation, DeleteCategoryVariables>
        mutation={DeleteCategoryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteCategoryProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteCategoryMutation, DeleteCategoryVariables>
> &
  TChildProps;
export type DeleteCategoryMutationFn = ReactApollo.MutationFn<
  DeleteCategoryMutation,
  DeleteCategoryVariables
>;
export function DeleteCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteCategoryMutation,
        DeleteCategoryVariables,
        DeleteCategoryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteCategoryMutation,
    DeleteCategoryVariables,
    DeleteCategoryProps<TChildProps>
  >(DeleteCategoryDocument, operationOptions);
}
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($categoryId: ObjectId!, $input: CategoryInput!) {
    updateCategory(categoryId: $categoryId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateCategoryComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateCategoryMutation, UpdateCategoryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateCategoryMutation, UpdateCategoryVariables>
        mutation={UpdateCategoryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateCategoryProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateCategoryMutation, UpdateCategoryVariables>
> &
  TChildProps;
export type UpdateCategoryMutationFn = ReactApollo.MutationFn<
  UpdateCategoryMutation,
  UpdateCategoryVariables
>;
export function UpdateCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateCategoryMutation,
        UpdateCategoryVariables,
        UpdateCategoryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateCategoryMutation,
    UpdateCategoryVariables,
    UpdateCategoryProps<TChildProps>
  >(UpdateCategoryDocument, operationOptions);
}
export const CategoriesDocument = gql`
  query Categories {
    categories {
      ...CategoryInfo
    }
  }

  ${CategoryInfoFragmentDoc}
`;
export class CategoriesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<CategoriesQuery, CategoriesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<CategoriesQuery, CategoriesVariables>
        query={CategoriesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CategoriesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CategoriesQuery, CategoriesVariables>
> &
  TChildProps;
export function CategoriesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CategoriesQuery,
        CategoriesVariables,
        CategoriesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CategoriesQuery,
    CategoriesVariables,
    CategoriesProps<TChildProps>
  >(CategoriesDocument, operationOptions);
}
export const CreateRoleDocument = gql`
  mutation CreateRole($input: RoleInput!) {
    createRole(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class CreateRoleComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateRoleMutation, CreateRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateRoleMutation, CreateRoleVariables>
        mutation={CreateRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateRoleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateRoleMutation, CreateRoleVariables>
> &
  TChildProps;
export type CreateRoleMutationFn = ReactApollo.MutationFn<
  CreateRoleMutation,
  CreateRoleVariables
>;
export function CreateRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateRoleMutation,
        CreateRoleVariables,
        CreateRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateRoleMutation,
    CreateRoleVariables,
    CreateRoleProps<TChildProps>
  >(CreateRoleDocument, operationOptions);
}
export const DeleteRoleDocument = gql`
  mutation DeleteRole($roleId: ObjectId!) {
    deleteRole(roleId: $roleId) {
      errors {
        path
        message
      }
    }
  }
`;
export class DeleteRoleComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeleteRoleMutation, DeleteRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteRoleMutation, DeleteRoleVariables>
        mutation={DeleteRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteRoleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteRoleMutation, DeleteRoleVariables>
> &
  TChildProps;
export type DeleteRoleMutationFn = ReactApollo.MutationFn<
  DeleteRoleMutation,
  DeleteRoleVariables
>;
export function DeleteRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteRoleMutation,
        DeleteRoleVariables,
        DeleteRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteRoleMutation,
    DeleteRoleVariables,
    DeleteRoleProps<TChildProps>
  >(DeleteRoleDocument, operationOptions);
}
export const UpdateRoleDocument = gql`
  mutation UpdateRole($roleId: ObjectId!, $input: RoleInput!) {
    updateRole(roleId: $roleId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateRoleComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateRoleMutation, UpdateRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateRoleMutation, UpdateRoleVariables>
        mutation={UpdateRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateRoleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateRoleMutation, UpdateRoleVariables>
> &
  TChildProps;
export type UpdateRoleMutationFn = ReactApollo.MutationFn<
  UpdateRoleMutation,
  UpdateRoleVariables
>;
export function UpdateRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateRoleMutation,
        UpdateRoleVariables,
        UpdateRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateRoleMutation,
    UpdateRoleVariables,
    UpdateRoleProps<TChildProps>
  >(UpdateRoleDocument, operationOptions);
}
export const RolesDocument = gql`
  query Roles {
    roles {
      ...RoleInfo
    }
  }

  ${RoleInfoFragmentDoc}
`;
export class RolesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<RolesQuery, RolesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<RolesQuery, RolesVariables>
        query={RolesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RolesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<RolesQuery, RolesVariables>
> &
  TChildProps;
export function RolesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RolesQuery,
        RolesVariables,
        RolesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RolesQuery,
    RolesVariables,
    RolesProps<TChildProps>
  >(RolesDocument, operationOptions);
}
export const CreateServiceDocument = gql`
  mutation CreateService($categoryId: ObjectId!, $input: ServiceInput!) {
    createService(categoryId: $categoryId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class CreateServiceComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateServiceMutation, CreateServiceVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateServiceMutation, CreateServiceVariables>
        mutation={CreateServiceDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateServiceProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateServiceMutation, CreateServiceVariables>
> &
  TChildProps;
export type CreateServiceMutationFn = ReactApollo.MutationFn<
  CreateServiceMutation,
  CreateServiceVariables
>;
export function CreateServiceHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateServiceMutation,
        CreateServiceVariables,
        CreateServiceProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateServiceMutation,
    CreateServiceVariables,
    CreateServiceProps<TChildProps>
  >(CreateServiceDocument, operationOptions);
}
export const DeleteServiceDocument = gql`
  mutation DeleteService($categoryId: ObjectId!, $serviceId: ObjectId!) {
    deleteService(categoryId: $categoryId, serviceId: $serviceId) {
      errors {
        path
        message
      }
    }
  }
`;
export class DeleteServiceComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteServiceMutation, DeleteServiceVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteServiceMutation, DeleteServiceVariables>
        mutation={DeleteServiceDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteServiceProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteServiceMutation, DeleteServiceVariables>
> &
  TChildProps;
export type DeleteServiceMutationFn = ReactApollo.MutationFn<
  DeleteServiceMutation,
  DeleteServiceVariables
>;
export function DeleteServiceHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteServiceMutation,
        DeleteServiceVariables,
        DeleteServiceProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteServiceMutation,
    DeleteServiceVariables,
    DeleteServiceProps<TChildProps>
  >(DeleteServiceDocument, operationOptions);
}
export const UpdateServiceDocument = gql`
  mutation UpdateService(
    $categoryId: ObjectId!
    $serviceId: ObjectId!
    $input: ServiceInput!
  ) {
    updateService(
      categoryId: $categoryId
      serviceId: $serviceId
      input: $input
    ) {
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateServiceComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateServiceMutation, UpdateServiceVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateServiceMutation, UpdateServiceVariables>
        mutation={UpdateServiceDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateServiceProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateServiceMutation, UpdateServiceVariables>
> &
  TChildProps;
export type UpdateServiceMutationFn = ReactApollo.MutationFn<
  UpdateServiceMutation,
  UpdateServiceVariables
>;
export function UpdateServiceHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateServiceMutation,
        UpdateServiceVariables,
        UpdateServiceProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateServiceMutation,
    UpdateServiceVariables,
    UpdateServiceProps<TChildProps>
  >(UpdateServiceDocument, operationOptions);
}
export const ServicesDocument = gql`
  query Services {
    services {
      ...ServiceInfo
    }
  }

  ${ServiceInfoFragmentDoc}
`;
export class ServicesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ServicesQuery, ServicesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ServicesQuery, ServicesVariables>
        query={ServicesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ServicesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ServicesQuery, ServicesVariables>
> &
  TChildProps;
export function ServicesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ServicesQuery,
        ServicesVariables,
        ServicesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ServicesQuery,
    ServicesVariables,
    ServicesProps<TChildProps>
  >(ServicesDocument, operationOptions);
}
export const CreateUserDocument = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class CreateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateUserMutation, CreateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateUserMutation, CreateUserVariables>
        mutation={CreateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateUserMutation, CreateUserVariables>
> &
  TChildProps;
export type CreateUserMutationFn = ReactApollo.MutationFn<
  CreateUserMutation,
  CreateUserVariables
>;
export function CreateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateUserMutation,
        CreateUserVariables,
        CreateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateUserMutation,
    CreateUserVariables,
    CreateUserProps<TChildProps>
  >(CreateUserDocument, operationOptions);
}
export const DeleteUserDocument = gql`
  mutation DeleteUser($userId: ObjectId!) {
    deleteUser(userId: $userId) {
      errors {
        path
        message
      }
    }
  }
`;
export class DeleteUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeleteUserMutation, DeleteUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteUserMutation, DeleteUserVariables>
        mutation={DeleteUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteUserMutation, DeleteUserVariables>
> &
  TChildProps;
export type DeleteUserMutationFn = ReactApollo.MutationFn<
  DeleteUserMutation,
  DeleteUserVariables
>;
export function DeleteUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteUserMutation,
        DeleteUserVariables,
        DeleteUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteUserMutation,
    DeleteUserVariables,
    DeleteUserProps<TChildProps>
  >(DeleteUserDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($isAdmin: Boolean!, $input: LoginInput!) {
    login(isAdmin: $isAdmin, input: $input) {
      errors {
        ...ErrorInfo
      }
      user {
        ...UserInfo
      }
      tokens {
        token
        refreshToken
      }
    }
  }

  ${ErrorInfoFragmentDoc}
  ${UserInfoFragmentDoc}
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($role: String!, $input: RegisterInput!) {
    register(role: $role, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const UpdateUserDocument = gql`
  mutation UpdateUser($userId: ObjectId!, $input: UserInput!) {
    updateUser(userId: $userId, input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<UpdateUserMutation, UpdateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={UpdateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateUserMutation, UpdateUserVariables>
> &
  TChildProps;
export type UpdateUserMutationFn = ReactApollo.MutationFn<
  UpdateUserMutation,
  UpdateUserVariables
>;
export function UpdateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateUserMutation,
        UpdateUserVariables,
        UpdateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateUserMutation,
    UpdateUserVariables,
    UpdateUserProps<TChildProps>
  >(UpdateUserDocument, operationOptions);
}
export const AllAdminExceptMeDocument = gql`
  query AllAdminExceptMe {
    allAdminExceptMe {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class AllAdminExceptMeComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<AllAdminExceptMeQuery, AllAdminExceptMeVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<AllAdminExceptMeQuery, AllAdminExceptMeVariables>
        query={AllAdminExceptMeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AllAdminExceptMeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<AllAdminExceptMeQuery, AllAdminExceptMeVariables>
> &
  TChildProps;
export function AllAdminExceptMeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AllAdminExceptMeQuery,
        AllAdminExceptMeVariables,
        AllAdminExceptMeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AllAdminExceptMeQuery,
    AllAdminExceptMeVariables,
    AllAdminExceptMeProps<TChildProps>
  >(AllAdminExceptMeDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const CreateUserSubscriptionDocument = gql`
  mutation CreateUserSubscription($input: UserSubscriptionInput!) {
    createUserSubscription(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class CreateUserSubscriptionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateUserSubscriptionMutation,
      CreateUserSubscriptionVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateUserSubscriptionMutation,
        CreateUserSubscriptionVariables
      >
        mutation={CreateUserSubscriptionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateUserSubscriptionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateUserSubscriptionMutation,
    CreateUserSubscriptionVariables
  >
> &
  TChildProps;
export type CreateUserSubscriptionMutationFn = ReactApollo.MutationFn<
  CreateUserSubscriptionMutation,
  CreateUserSubscriptionVariables
>;
export function CreateUserSubscriptionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateUserSubscriptionMutation,
        CreateUserSubscriptionVariables,
        CreateUserSubscriptionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateUserSubscriptionMutation,
    CreateUserSubscriptionVariables,
    CreateUserSubscriptionProps<TChildProps>
  >(CreateUserSubscriptionDocument, operationOptions);
}
export const DeleteUserSubscriptionDocument = gql`
  mutation DeleteUserSubscription($userSubscriptionId: ObjectId!) {
    deleteUserSubscription(userSubscriptionId: $userSubscriptionId) {
      errors {
        path
        message
      }
    }
  }
`;
export class DeleteUserSubscriptionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteUserSubscriptionMutation,
      DeleteUserSubscriptionVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteUserSubscriptionMutation,
        DeleteUserSubscriptionVariables
      >
        mutation={DeleteUserSubscriptionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteUserSubscriptionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeleteUserSubscriptionMutation,
    DeleteUserSubscriptionVariables
  >
> &
  TChildProps;
export type DeleteUserSubscriptionMutationFn = ReactApollo.MutationFn<
  DeleteUserSubscriptionMutation,
  DeleteUserSubscriptionVariables
>;
export function DeleteUserSubscriptionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteUserSubscriptionMutation,
        DeleteUserSubscriptionVariables,
        DeleteUserSubscriptionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteUserSubscriptionMutation,
    DeleteUserSubscriptionVariables,
    DeleteUserSubscriptionProps<TChildProps>
  >(DeleteUserSubscriptionDocument, operationOptions);
}
export const UpdateUserSubscriptionDocument = gql`
  mutation UpdateUserSubscription(
    $userSubscriptionId: ObjectId!
    $input: UserSubscriptionInput!
  ) {
    updateUserSubscription(
      userSubscriptionId: $userSubscriptionId
      input: $input
    ) {
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateUserSubscriptionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateUserSubscriptionMutation,
      UpdateUserSubscriptionVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateUserSubscriptionMutation,
        UpdateUserSubscriptionVariables
      >
        mutation={UpdateUserSubscriptionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateUserSubscriptionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateUserSubscriptionMutation,
    UpdateUserSubscriptionVariables
  >
> &
  TChildProps;
export type UpdateUserSubscriptionMutationFn = ReactApollo.MutationFn<
  UpdateUserSubscriptionMutation,
  UpdateUserSubscriptionVariables
>;
export function UpdateUserSubscriptionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateUserSubscriptionMutation,
        UpdateUserSubscriptionVariables,
        UpdateUserSubscriptionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateUserSubscriptionMutation,
    UpdateUserSubscriptionVariables,
    UpdateUserSubscriptionProps<TChildProps>
  >(UpdateUserSubscriptionDocument, operationOptions);
}
export const UserSubscriptionsDocument = gql`
  query UserSubscriptions {
    userSubscriptions {
      ...UserSubscriptionInfo
    }
  }

  ${UserSubscriptionInfoFragmentDoc}
`;
export class UserSubscriptionsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<UserSubscriptionsQuery, UserSubscriptionsVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<UserSubscriptionsQuery, UserSubscriptionsVariables>
        query={UserSubscriptionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UserSubscriptionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UserSubscriptionsQuery, UserSubscriptionsVariables>
> &
  TChildProps;
export function UserSubscriptionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UserSubscriptionsQuery,
        UserSubscriptionsVariables,
        UserSubscriptionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UserSubscriptionsQuery,
    UserSubscriptionsVariables,
    UserSubscriptionsProps<TChildProps>
  >(UserSubscriptionsDocument, operationOptions);
}
