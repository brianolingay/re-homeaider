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
  service: ObjectId;

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

export type AvailableCategoriesVariables = {};

export type AvailableCategoriesQuery = {
  __typename?: "Query";

  availableCategories: Maybe<AvailableCategoriesAvailableCategories[]>;
};

export type AvailableCategoriesAvailableCategories = AvailableCategoryInfoFragment;

export type FindServicesByCategoryVariables = {
  categoryId: ObjectId;
};

export type FindServicesByCategoryQuery = {
  __typename?: "Query";

  findServicesByCategory: Maybe<FindServicesByCategoryFindServicesByCategory[]>;
};

export type FindServicesByCategoryFindServicesByCategory = FindServicesByCategoryInfoFragment;

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
};

export type LoginErrors = ErrorInfoFragment;

export type LoginUser = UserInfoFragment;

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

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type AvailableCategoryInfoFragment = {
  __typename?: "AvailableCategorieResponse";

  _id: ObjectId;

  name: string;

  totalServices: number;
};

export type FindServicesByCategoryInfoFragment = {
  __typename?: "FindServicesByCategoryResponse";

  _id: ObjectId;

  name: string;

  totalUsers: number;
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

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const AvailableCategoryInfoFragmentDoc = gql`
  fragment AvailableCategoryInfo on AvailableCategorieResponse {
    _id
    name
    totalServices
  }
`;

export const FindServicesByCategoryInfoFragmentDoc = gql`
  fragment FindServicesByCategoryInfo on FindServicesByCategoryResponse {
    _id
    name
    totalUsers
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

// ====================================================
// Components
// ====================================================

export const AvailableCategoriesDocument = gql`
  query AvailableCategories {
    availableCategories {
      ...AvailableCategoryInfo
    }
  }

  ${AvailableCategoryInfoFragmentDoc}
`;
export class AvailableCategoriesComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      AvailableCategoriesQuery,
      AvailableCategoriesVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<AvailableCategoriesQuery, AvailableCategoriesVariables>
        query={AvailableCategoriesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AvailableCategoriesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<AvailableCategoriesQuery, AvailableCategoriesVariables>
> &
  TChildProps;
export function AvailableCategoriesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AvailableCategoriesQuery,
        AvailableCategoriesVariables,
        AvailableCategoriesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AvailableCategoriesQuery,
    AvailableCategoriesVariables,
    AvailableCategoriesProps<TChildProps>
  >(AvailableCategoriesDocument, operationOptions);
}
export const FindServicesByCategoryDocument = gql`
  query FindServicesByCategory($categoryId: ObjectId!) {
    findServicesByCategory(categoryId: $categoryId) {
      ...FindServicesByCategoryInfo
    }
  }

  ${FindServicesByCategoryInfoFragmentDoc}
`;
export class FindServicesByCategoryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      FindServicesByCategoryQuery,
      FindServicesByCategoryVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        FindServicesByCategoryQuery,
        FindServicesByCategoryVariables
      >
        query={FindServicesByCategoryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindServicesByCategoryProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    FindServicesByCategoryQuery,
    FindServicesByCategoryVariables
  >
> &
  TChildProps;
export function FindServicesByCategoryHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindServicesByCategoryQuery,
        FindServicesByCategoryVariables,
        FindServicesByCategoryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindServicesByCategoryQuery,
    FindServicesByCategoryVariables,
    FindServicesByCategoryProps<TChildProps>
  >(FindServicesByCategoryDocument, operationOptions);
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
