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

export type ErrorResponse = {
  __typename?: "ErrorResponse";
  path: Scalars["String"];
  message: Scalars["String"];
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
  register?: Maybe<UserResponse>;
  login?: Maybe<LoginResponse>;
  logout: Scalars["Boolean"];
  createUser?: Maybe<UserResponse>;
  updateUser?: Maybe<UserResponse>;
  deleteUser?: Maybe<UserResponse>;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
  role: Scalars["String"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationCreateUserArgs = {
  input: UserInput;
};

export type MutationUpdateUserArgs = {
  input: UserInput;
  userId: Scalars["ObjectId"];
};

export type MutationDeleteUserArgs = {
  userId: Scalars["ObjectId"];
};

export type Query = {
  __typename?: "Query";
  me?: Maybe<User>;
  allAdminExceptCurrentUser?: Maybe<Array<User>>;
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

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<ErrorResponse>>;
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
    { __typename?: "UserResponse" } & {
      errors: Maybe<
        Array<{ __typename?: "ErrorResponse" } & ErrorInfoFragment>
      >;
    }
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & UserInfoFragment>;
};

export type ErrorInfoFragment = { __typename?: "ErrorResponse" } & Pick<
  ErrorResponse,
  "path" | "message"
>;

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "_id" | "email" | "firstName" | "lastName" | "mobile"
> & { role: Maybe<{ __typename?: "Role" } & Pick<Role, "_id" | "name">> };
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
