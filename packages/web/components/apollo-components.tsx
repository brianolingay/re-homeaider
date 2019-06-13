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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AvailableBookingInput = {
  services?: Maybe<Array<Scalars["ObjectId"]>>;
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

export type CategoryResponse = {
  __typename?: "CategoryResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Certificate = {
  __typename?: "Certificate";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  images?: Maybe<Array<Image>>;
  certifiedAt?: Maybe<Scalars["DateTime"]>;
};

export type CertificateObject = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  file: Scalars["Upload"];
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

export type Image = {
  __typename?: "Image";
  filename?: Maybe<Scalars["String"]>;
  filepath?: Maybe<Scalars["String"]>;
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
  tokens?: Maybe<TokensResponse>;
  user?: Maybe<User>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Mutation = {
  __typename?: "Mutation";
  createCategory?: Maybe<CategoryResponse>;
  updateCategory?: Maybe<CategoryResponse>;
  deleteCategory?: Maybe<CategoryResponse>;
  createProviderService: Array<ProviderServiceResponse>;
  createRole?: Maybe<RoleResponse>;
  updateRole?: Maybe<RoleResponse>;
  deleteRole?: Maybe<RoleResponse>;
  createServiceRequest?: Maybe<ServiceRequestResponse>;
  updateServiceRequest?: Maybe<ServiceRequestResponse>;
  createService?: Maybe<ServiceResponse>;
  updateService?: Maybe<ServiceResponse>;
  deleteService?: Maybe<ServiceResponse>;
  register?: Maybe<UserResponse>;
  login?: Maybe<LoginResponse>;
  logout: Scalars["Boolean"];
  createUser?: Maybe<UserResponse>;
  updateUser?: Maybe<UserResponse>;
  deleteUser?: Maybe<UserResponse>;
  createUserSubscription?: Maybe<UserSubscriptionResponse>;
  updateUserSubscription?: Maybe<UserSubscriptionResponse>;
  deleteUserSubscription?: Maybe<UserSubscriptionResponse>;
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

export type MutationCreateProviderServiceArgs = {
  input: ProviderServiceInput;
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

export type MutationCreateServiceRequestArgs = {
  input: ServiceRequestInput;
};

export type MutationUpdateServiceRequestArgs = {
  input: ServiceRequestInput;
  serviceRequestId: Scalars["ObjectId"];
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

export type MutationRegisterArgs = {
  input: RegisterInput;
  role: Scalars["String"];
};

export type MutationLoginArgs = {
  input: LoginInput;
  isAdmin: Scalars["Boolean"];
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

export type ProviderService = {
  __typename?: "ProviderService";
  _id: Scalars["ObjectId"];
  description?: Maybe<Scalars["String"]>;
  certificates?: Maybe<Array<Certificate>>;
  approved: Scalars["Boolean"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  service?: Maybe<Service>;
  user?: Maybe<User>;
};

export type ProviderServiceInput = {
  service: Scalars["ObjectId"];
  description?: Maybe<Scalars["String"]>;
  certificates: Array<CertificateObject>;
};

export type ProviderServiceResponse = {
  __typename?: "ProviderServiceResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Query = {
  __typename?: "Query";
  categories?: Maybe<Array<Category>>;
  availableCategories?: Maybe<Array<AvailableCategorieResponse>>;
  currentLocation?: Maybe<LocationResponse>;
  providersByService?: Maybe<Array<ProviderService>>;
  roles?: Maybe<Array<Role>>;
  availableBookingRequest?: Maybe<Array<ServiceRequest>>;
  availableHiringRequest?: Maybe<Array<ServiceRequest>>;
  viewServiceRequest: ServiceRequest;
  services?: Maybe<Array<Service>>;
  findServicesByCategory?: Maybe<Array<FindServicesByCategoryResponse>>;
  me?: Maybe<User>;
  allAdminExceptMe?: Maybe<Array<User>>;
  userSubscriptions?: Maybe<Array<UserSubscription>>;
};

export type QueryProvidersByServiceArgs = {
  serviceId: Scalars["ObjectId"];
};

export type QueryAvailableBookingRequestArgs = {
  input: AvailableBookingInput;
};

export type QueryViewServiceRequestArgs = {
  serviceRequestId: Scalars["ObjectId"];
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
  description?: Maybe<Scalars["String"]>;
};

export type RoleInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type RoleResponse = {
  __typename?: "RoleResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Service = {
  __typename?: "Service";
  _id: Scalars["ObjectId"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServiceInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type ServiceRequest = {
  __typename?: "ServiceRequest";
  _id: Scalars["ObjectId"];
  serviceSeeker: User;
  provider?: Maybe<User>;
  service: Service;
  amount: Scalars["Float"];
  address: Scalars["String"];
  coordinates: Array<Scalars["Float"]>;
  accepted: Scalars["Boolean"];
  arrivedAt?: Maybe<Scalars["String"]>;
  startedAt?: Maybe<Scalars["String"]>;
  canceledAt?: Maybe<Scalars["String"]>;
  completedAt?: Maybe<Scalars["String"]>;
  ignoredAt?: Maybe<Scalars["String"]>;
  feedBack?: Maybe<Scalars["String"]>;
  rating: Scalars["Float"];
};

export type ServiceRequestInput = {
  service?: Maybe<Scalars["ObjectId"]>;
  provider?: Maybe<Scalars["ObjectId"]>;
  amount?: Maybe<Scalars["Float"]>;
  address?: Maybe<Scalars["String"]>;
  coordinates?: Maybe<Array<Scalars["Float"]>>;
  accepted?: Maybe<Scalars["Boolean"]>;
  arrivedAt?: Maybe<Scalars["DateTime"]>;
  startedAt?: Maybe<Scalars["DateTime"]>;
  canceledAt?: Maybe<Scalars["DateTime"]>;
  completedAt?: Maybe<Scalars["DateTime"]>;
  ignoredAt?: Maybe<Scalars["DateTime"]>;
  feedBack?: Maybe<Scalars["String"]>;
  rating?: Maybe<Scalars["Float"]>;
};

export type ServiceRequestResponse = {
  __typename?: "ServiceRequestResponse";
  serviceRequestId?: Maybe<Scalars["ObjectId"]>;
  errors?: Maybe<Array<ErrorResponse>>;
};

export type ServiceResponse = {
  __typename?: "ServiceResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};

export type Subscription = {
  __typename?: "Subscription";
  serviceRequestProgress: ServiceRequest;
  newBookingServiceRequest: ServiceRequest;
  newHiringServiceRequest: ServiceRequest;
};

export type SubscriptionServiceRequestProgressArgs = {
  serviceRequestId: Scalars["ID"];
};

export type SubscriptionNewBookingServiceRequestArgs = {
  input: AvailableBookingInput;
};

export type SubscriptionNewHiringServiceRequestArgs = {
  providerId: Scalars["ObjectId"];
};

export type TokensResponse = {
  __typename?: "TokensResponse";
  token?: Maybe<Scalars["String"]>;
  refreshToken?: Maybe<Scalars["String"]>;
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
  providerServices?: Maybe<Array<ProviderService>>;
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

export type UserSubscriptionResponse = {
  __typename?: "UserSubscriptionResponse";
  errors?: Maybe<Array<ErrorResponse>>;
};
export type LoginMutationVariables = {
  isAdmin: Scalars["Boolean"];
  input: LoginInput;
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<
    { __typename?: "LoginResponse" } & {
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
  mutation Login($isAdmin: Boolean!, $input: LoginInput!) {
    login(isAdmin: $isAdmin, input: $input) {
      errors {
        ...ErrorInfo
      }
    }
  }
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
