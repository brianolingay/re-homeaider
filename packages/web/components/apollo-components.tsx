export type Maybe<T> = T | null;

export interface CategoryInput {
  name: string;

  description?: Maybe<string>;
}

export interface RoleInput {
  name: string;

  description?: Maybe<string>;
}

export interface ServiceInput {
  name: string;

  description?: Maybe<string>;
}

export interface SubscriptionInput {
  name: string;

  description?: Maybe<string>;

  amount: number;

  benefits?: Maybe<string[]>;

  paymentMode: PaymentMode;
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

export type LoginVariables = {
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
  __typename?: "RegisterResponse";

  errors: Maybe<RegisterErrors[]>;
};

export type RegisterErrors = {
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

export type CategoryInfoFragment = {
  __typename?: "Category";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;
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
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
