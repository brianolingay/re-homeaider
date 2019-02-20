export type Maybe<T> = T | null;

export interface AvailableBookingInput {
  services?: Maybe<ObjectId[]>;
}

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

export type AvailableCategoriesVariables = {};

export type AvailableCategoriesQuery = {
  __typename?: "Query";

  availableCategories: Maybe<AvailableCategoriesAvailableCategories[]>;
};

export type AvailableCategoriesAvailableCategories = AvailableCategoryInfoFragment;

export type CurrentLocationVariables = {};

export type CurrentLocationQuery = {
  __typename?: "Query";

  currentLocation: Maybe<CurrentLocationCurrentLocation>;
};

export type CurrentLocationCurrentLocation = LocationInfoFragment;

export type ProvidersByServiceVariables = {
  serviceId: ObjectId;
};

export type ProvidersByServiceQuery = {
  __typename?: "Query";

  providersByService: Maybe<ProvidersByServiceProvidersByService[]>;
};

export type ProvidersByServiceProvidersByService = ProviderServiceInfoFragment;

export type FindServicesByCategoryVariables = {
  categoryId: ObjectId;
};

export type FindServicesByCategoryQuery = {
  __typename?: "Query";

  findServicesByCategory: Maybe<FindServicesByCategoryFindServicesByCategory[]>;
};

export type FindServicesByCategoryFindServicesByCategory = FindServicesByCategoryInfoFragment;

export type CreateServiceRequestVariables = {
  input: ServiceRequestInput;
};

export type CreateServiceRequestMutation = {
  __typename?: "Mutation";

  createServiceRequest: Maybe<CreateServiceRequestCreateServiceRequest>;
};

export type CreateServiceRequestCreateServiceRequest = {
  __typename?: "ServiceRequestResponse";

  serviceRequestId: Maybe<ObjectId>;

  errors: Maybe<CreateServiceRequestErrors[]>;
};

export type CreateServiceRequestErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UpdateServiceRequestVariables = {
  serviceRequestId: ObjectId;
  input: ServiceRequestInput;
};

export type UpdateServiceRequestMutation = {
  __typename?: "Mutation";

  updateServiceRequest: Maybe<UpdateServiceRequestUpdateServiceRequest>;
};

export type UpdateServiceRequestUpdateServiceRequest = {
  __typename?: "ServiceRequestResponse";

  serviceRequestId: Maybe<ObjectId>;

  errors: Maybe<UpdateServiceRequestErrors[]>;
};

export type UpdateServiceRequestErrors = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type AvailableBookingRequestVariables = {
  input: AvailableBookingInput;
};

export type AvailableBookingRequestQuery = {
  __typename?: "Query";

  availableBookingRequest: Maybe<
    AvailableBookingRequestAvailableBookingRequest[]
  >;
};

export type AvailableBookingRequestAvailableBookingRequest = ServiceRequestInfoFragment;

export type AvailableHiringRequestVariables = {};

export type AvailableHiringRequestQuery = {
  __typename?: "Query";

  availableHiringRequest: Maybe<AvailableHiringRequestAvailableHiringRequest[]>;
};

export type AvailableHiringRequestAvailableHiringRequest = ServiceRequestInfoFragment;

export type ViewServiceRequestVariables = {
  serviceRequestId: ObjectId;
};

export type ViewServiceRequestQuery = {
  __typename?: "Query";

  viewServiceRequest: ViewServiceRequestViewServiceRequest;
};

export type ViewServiceRequestViewServiceRequest = ServiceRequestInfoFragment;

export type NewBookingServiceRequestVariables = {
  input: AvailableBookingInput;
};

export type NewBookingServiceRequestSubscription = {
  __typename?: "Subscription";

  newBookingServiceRequest: NewBookingServiceRequestNewBookingServiceRequest;
};

export type NewBookingServiceRequestNewBookingServiceRequest = ServiceRequestInfoFragment;

export type NewHiringServiceRequestVariables = {
  providerId: ObjectId;
};

export type NewHiringServiceRequestSubscription = {
  __typename?: "Subscription";

  newHiringServiceRequest: NewHiringServiceRequestNewHiringServiceRequest;
};

export type NewHiringServiceRequestNewHiringServiceRequest = ServiceRequestInfoFragment;

export type ServiceRequestProgressVariables = {
  serviceRequestId: string;
};

export type ServiceRequestProgressSubscription = {
  __typename?: "Subscription";

  serviceRequestProgress: ServiceRequestProgressServiceRequestProgress;
};

export type ServiceRequestProgressServiceRequestProgress = ServiceRequestInfoFragment;

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

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type UserSubscriptionsVariables = {};

export type UserSubscriptionsQuery = {
  __typename?: "Query";

  userSubscriptions: Maybe<UserSubscriptionsUserSubscriptions[]>;
};

export type UserSubscriptionsUserSubscriptions = UserSubscriptionInfoFragment;

export type AvailableCategoryInfoFragment = {
  __typename?: "AvailableCategorieResponse";

  _id: ObjectId;

  name: string;

  totalServices: number;
};

export type CategoryInfoFragment = {
  __typename?: "Category";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;
};

export type LocationInfoFragment = {
  __typename?: "LocationResponse";

  coordinates: Maybe<number[]>;
};

export type ProviderServiceBasicInfoFragment = {
  __typename?: "ProviderService";

  _id: ObjectId;

  description: Maybe<string>;

  certificates: Maybe<ProviderServiceBasicInfoCertificates[]>;

  approved: boolean;

  service: Maybe<ProviderServiceBasicInfoService>;
};

export type ProviderServiceBasicInfoCertificates = {
  __typename?: "Certificate";

  name: string;

  description: Maybe<string>;

  certifiedAt: Maybe<DateTime>;

  images: Maybe<ProviderServiceBasicInfoImages[]>;
};

export type ProviderServiceBasicInfoImages = {
  __typename?: "Image";

  filepath: Maybe<string>;

  filename: Maybe<string>;
};

export type ProviderServiceBasicInfoService = ServiceInfoFragment;

export type ProviderServiceInfoFragment = {
  __typename?: "ProviderService";

  _id: ObjectId;

  description: Maybe<string>;

  certificates: Maybe<ProviderServiceInfoCertificates[]>;

  approved: boolean;

  service: Maybe<ProviderServiceInfoService>;

  user: Maybe<ProviderServiceInfoUser>;
};

export type ProviderServiceInfoCertificates = {
  __typename?: "Certificate";

  name: string;

  description: Maybe<string>;

  certifiedAt: Maybe<DateTime>;

  images: Maybe<ProviderServiceInfoImages[]>;
};

export type ProviderServiceInfoImages = {
  __typename?: "Image";

  filepath: Maybe<string>;

  filename: Maybe<string>;
};

export type ProviderServiceInfoService = ServiceInfoFragment;

export type ProviderServiceInfoUser = UserBasicInfoFragment;

export type RoleInfoFragment = {
  __typename?: "Role";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;
};

export type FindServicesByCategoryInfoFragment = {
  __typename?: "FindServicesByCategoryResponse";

  _id: ObjectId;

  name: string;

  totalUsers: number;
};

export type ServiceInfoFragment = {
  __typename?: "Service";

  _id: ObjectId;

  name: string;

  description: Maybe<string>;

  category: Maybe<ServiceInfoCategory>;
};

export type ServiceInfoCategory = CategoryInfoFragment;

export type ServiceRequestInfoFragment = {
  __typename?: "ServiceRequest";

  _id: ObjectId;

  serviceSeeker: ServiceRequestInfoServiceSeeker;

  provider: Maybe<ServiceRequestInfoProvider>;

  service: ServiceRequestInfoService;

  amount: number;

  address: string;

  coordinates: number[];

  accepted: boolean;

  arrivedAt: Maybe<string>;

  startedAt: Maybe<string>;

  canceledAt: Maybe<string>;

  completedAt: Maybe<string>;

  ignoredAt: Maybe<string>;

  feedBack: Maybe<string>;

  rating: number;
};

export type ServiceRequestInfoServiceSeeker = UserBasicInfoFragment;

export type ServiceRequestInfoProvider = UserBasicInfoFragment;

export type ServiceRequestInfoService = ServiceInfoFragment;

export type ErrorInfoFragment = {
  __typename?: "ErrorResponse";

  path: string;

  message: string;
};

export type UserBasicInfoFragment = {
  __typename?: "User";

  _id: ObjectId;

  email: string;

  firstName: string;

  lastName: string;

  mobile: string;

  phone: Maybe<string>;

  address: Maybe<string>;

  city: Maybe<string>;

  country: Maybe<string>;

  coordinates: Maybe<number[]>;
};

export type UserInfoFragment = {
  __typename?: "User";

  _id: ObjectId;

  email: string;

  firstName: string;

  lastName: string;

  mobile: string;

  phone: Maybe<string>;

  address: Maybe<string>;

  city: Maybe<string>;

  country: Maybe<string>;

  coordinates: Maybe<number[]>;

  userSubscription: Maybe<UserInfoUserSubscription>;

  subscribedAt: Maybe<DateTime>;

  providerServices: Maybe<UserInfoProviderServices[]>;

  role: Maybe<UserInfoRole>;
};

export type UserInfoUserSubscription = UserSubscriptionInfoFragment;

export type UserInfoProviderServices = {
  __typename?: "ProviderService";

  service: Maybe<UserInfoService>;
} & ProviderServiceBasicInfoFragment;

export type UserInfoService = ServiceInfoFragment;

export type UserInfoRole = RoleInfoFragment;

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

export const AvailableCategoryInfoFragmentDoc = gql`
  fragment AvailableCategoryInfo on AvailableCategorieResponse {
    _id
    name
    totalServices
  }
`;

export const LocationInfoFragmentDoc = gql`
  fragment LocationInfo on LocationResponse {
    coordinates
  }
`;

export const CategoryInfoFragmentDoc = gql`
  fragment CategoryInfo on Category {
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
      ...CategoryInfo
    }
  }

  ${CategoryInfoFragmentDoc}
`;

export const UserBasicInfoFragmentDoc = gql`
  fragment UserBasicInfo on User {
    _id
    email
    firstName
    lastName
    mobile
    phone
    address
    city
    country
    coordinates
  }
`;

export const ProviderServiceInfoFragmentDoc = gql`
  fragment ProviderServiceInfo on ProviderService {
    _id
    description
    certificates {
      name
      description
      certifiedAt
      images {
        filepath
        filename
      }
    }
    approved
    service {
      ...ServiceInfo
    }
    user {
      ...UserBasicInfo
    }
  }

  ${ServiceInfoFragmentDoc}
  ${UserBasicInfoFragmentDoc}
`;

export const FindServicesByCategoryInfoFragmentDoc = gql`
  fragment FindServicesByCategoryInfo on FindServicesByCategoryResponse {
    _id
    name
    totalUsers
  }
`;

export const ServiceRequestInfoFragmentDoc = gql`
  fragment ServiceRequestInfo on ServiceRequest {
    _id
    serviceSeeker {
      ...UserBasicInfo
    }
    provider {
      ...UserBasicInfo
    }
    service {
      ...ServiceInfo
    }
    amount
    address
    coordinates
    accepted
    arrivedAt
    startedAt
    canceledAt
    completedAt
    ignoredAt
    feedBack
    rating
  }

  ${UserBasicInfoFragmentDoc}
  ${ServiceInfoFragmentDoc}
`;

export const ErrorInfoFragmentDoc = gql`
  fragment ErrorInfo on ErrorResponse {
    path
    message
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

export const ProviderServiceBasicInfoFragmentDoc = gql`
  fragment ProviderServiceBasicInfo on ProviderService {
    _id
    description
    certificates {
      name
      description
      certifiedAt
      images {
        filepath
        filename
      }
    }
    approved
    service {
      ...ServiceInfo
    }
  }

  ${ServiceInfoFragmentDoc}
`;

export const RoleInfoFragmentDoc = gql`
  fragment RoleInfo on Role {
    _id
    name
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
    phone
    address
    city
    country
    coordinates
    userSubscription {
      ...UserSubscriptionInfo
    }
    subscribedAt
    providerServices {
      ...ProviderServiceBasicInfo
      service {
        ...ServiceInfo
      }
    }
    role {
      ...RoleInfo
    }
  }

  ${UserSubscriptionInfoFragmentDoc}
  ${ProviderServiceBasicInfoFragmentDoc}
  ${ServiceInfoFragmentDoc}
  ${RoleInfoFragmentDoc}
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
export const CurrentLocationDocument = gql`
  query CurrentLocation {
    currentLocation {
      ...LocationInfo
    }
  }

  ${LocationInfoFragmentDoc}
`;
export class CurrentLocationComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<CurrentLocationQuery, CurrentLocationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<CurrentLocationQuery, CurrentLocationVariables>
        query={CurrentLocationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CurrentLocationProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<CurrentLocationQuery, CurrentLocationVariables>
> &
  TChildProps;
export function CurrentLocationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CurrentLocationQuery,
        CurrentLocationVariables,
        CurrentLocationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CurrentLocationQuery,
    CurrentLocationVariables,
    CurrentLocationProps<TChildProps>
  >(CurrentLocationDocument, operationOptions);
}
export const ProvidersByServiceDocument = gql`
  query ProvidersByService($serviceId: ObjectId!) {
    providersByService(serviceId: $serviceId) {
      ...ProviderServiceInfo
    }
  }

  ${ProviderServiceInfoFragmentDoc}
`;
export class ProvidersByServiceComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ProvidersByServiceQuery, ProvidersByServiceVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ProvidersByServiceQuery, ProvidersByServiceVariables>
        query={ProvidersByServiceDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ProvidersByServiceProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ProvidersByServiceQuery, ProvidersByServiceVariables>
> &
  TChildProps;
export function ProvidersByServiceHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ProvidersByServiceQuery,
        ProvidersByServiceVariables,
        ProvidersByServiceProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ProvidersByServiceQuery,
    ProvidersByServiceVariables,
    ProvidersByServiceProps<TChildProps>
  >(ProvidersByServiceDocument, operationOptions);
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
export const CreateServiceRequestDocument = gql`
  mutation CreateServiceRequest($input: ServiceRequestInput!) {
    createServiceRequest(input: $input) {
      serviceRequestId
      errors {
        path
        message
      }
    }
  }
`;
export class CreateServiceRequestComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateServiceRequestMutation,
      CreateServiceRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateServiceRequestMutation,
        CreateServiceRequestVariables
      >
        mutation={CreateServiceRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateServiceRequestProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateServiceRequestMutation,
    CreateServiceRequestVariables
  >
> &
  TChildProps;
export type CreateServiceRequestMutationFn = ReactApollo.MutationFn<
  CreateServiceRequestMutation,
  CreateServiceRequestVariables
>;
export function CreateServiceRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateServiceRequestMutation,
        CreateServiceRequestVariables,
        CreateServiceRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateServiceRequestMutation,
    CreateServiceRequestVariables,
    CreateServiceRequestProps<TChildProps>
  >(CreateServiceRequestDocument, operationOptions);
}
export const UpdateServiceRequestDocument = gql`
  mutation UpdateServiceRequest(
    $serviceRequestId: ObjectId!
    $input: ServiceRequestInput!
  ) {
    updateServiceRequest(serviceRequestId: $serviceRequestId, input: $input) {
      serviceRequestId
      errors {
        path
        message
      }
    }
  }
`;
export class UpdateServiceRequestComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateServiceRequestMutation,
      UpdateServiceRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateServiceRequestMutation,
        UpdateServiceRequestVariables
      >
        mutation={UpdateServiceRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateServiceRequestProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateServiceRequestMutation,
    UpdateServiceRequestVariables
  >
> &
  TChildProps;
export type UpdateServiceRequestMutationFn = ReactApollo.MutationFn<
  UpdateServiceRequestMutation,
  UpdateServiceRequestVariables
>;
export function UpdateServiceRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateServiceRequestMutation,
        UpdateServiceRequestVariables,
        UpdateServiceRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateServiceRequestMutation,
    UpdateServiceRequestVariables,
    UpdateServiceRequestProps<TChildProps>
  >(UpdateServiceRequestDocument, operationOptions);
}
export const AvailableBookingRequestDocument = gql`
  query AvailableBookingRequest($input: AvailableBookingInput!) {
    availableBookingRequest(input: $input) {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class AvailableBookingRequestComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      AvailableBookingRequestQuery,
      AvailableBookingRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        AvailableBookingRequestQuery,
        AvailableBookingRequestVariables
      >
        query={AvailableBookingRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AvailableBookingRequestProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    AvailableBookingRequestQuery,
    AvailableBookingRequestVariables
  >
> &
  TChildProps;
export function AvailableBookingRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AvailableBookingRequestQuery,
        AvailableBookingRequestVariables,
        AvailableBookingRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AvailableBookingRequestQuery,
    AvailableBookingRequestVariables,
    AvailableBookingRequestProps<TChildProps>
  >(AvailableBookingRequestDocument, operationOptions);
}
export const AvailableHiringRequestDocument = gql`
  query AvailableHiringRequest {
    availableHiringRequest {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class AvailableHiringRequestComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      AvailableHiringRequestQuery,
      AvailableHiringRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        AvailableHiringRequestQuery,
        AvailableHiringRequestVariables
      >
        query={AvailableHiringRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AvailableHiringRequestProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    AvailableHiringRequestQuery,
    AvailableHiringRequestVariables
  >
> &
  TChildProps;
export function AvailableHiringRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AvailableHiringRequestQuery,
        AvailableHiringRequestVariables,
        AvailableHiringRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AvailableHiringRequestQuery,
    AvailableHiringRequestVariables,
    AvailableHiringRequestProps<TChildProps>
  >(AvailableHiringRequestDocument, operationOptions);
}
export const ViewServiceRequestDocument = gql`
  query ViewServiceRequest($serviceRequestId: ObjectId!) {
    viewServiceRequest(serviceRequestId: $serviceRequestId) {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class ViewServiceRequestComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<ViewServiceRequestQuery, ViewServiceRequestVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<ViewServiceRequestQuery, ViewServiceRequestVariables>
        query={ViewServiceRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ViewServiceRequestProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<ViewServiceRequestQuery, ViewServiceRequestVariables>
> &
  TChildProps;
export function ViewServiceRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ViewServiceRequestQuery,
        ViewServiceRequestVariables,
        ViewServiceRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ViewServiceRequestQuery,
    ViewServiceRequestVariables,
    ViewServiceRequestProps<TChildProps>
  >(ViewServiceRequestDocument, operationOptions);
}
export const NewBookingServiceRequestDocument = gql`
  subscription NewBookingServiceRequest($input: AvailableBookingInput!) {
    newBookingServiceRequest(input: $input) {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class NewBookingServiceRequestComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      NewBookingServiceRequestSubscription,
      NewBookingServiceRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        NewBookingServiceRequestSubscription,
        NewBookingServiceRequestVariables
      >
        subscription={NewBookingServiceRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NewBookingServiceRequestProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    NewBookingServiceRequestSubscription,
    NewBookingServiceRequestVariables
  >
> &
  TChildProps;
export function NewBookingServiceRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewBookingServiceRequestSubscription,
        NewBookingServiceRequestVariables,
        NewBookingServiceRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NewBookingServiceRequestSubscription,
    NewBookingServiceRequestVariables,
    NewBookingServiceRequestProps<TChildProps>
  >(NewBookingServiceRequestDocument, operationOptions);
}
export const NewHiringServiceRequestDocument = gql`
  subscription NewHiringServiceRequest($providerId: ObjectId!) {
    newHiringServiceRequest(providerId: $providerId) {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class NewHiringServiceRequestComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      NewHiringServiceRequestSubscription,
      NewHiringServiceRequestVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        NewHiringServiceRequestSubscription,
        NewHiringServiceRequestVariables
      >
        subscription={NewHiringServiceRequestDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NewHiringServiceRequestProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    NewHiringServiceRequestSubscription,
    NewHiringServiceRequestVariables
  >
> &
  TChildProps;
export function NewHiringServiceRequestHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewHiringServiceRequestSubscription,
        NewHiringServiceRequestVariables,
        NewHiringServiceRequestProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NewHiringServiceRequestSubscription,
    NewHiringServiceRequestVariables,
    NewHiringServiceRequestProps<TChildProps>
  >(NewHiringServiceRequestDocument, operationOptions);
}
export const ServiceRequestProgressDocument = gql`
  subscription ServiceRequestProgress($serviceRequestId: ID!) {
    serviceRequestProgress(serviceRequestId: $serviceRequestId) {
      ...ServiceRequestInfo
    }
  }

  ${ServiceRequestInfoFragmentDoc}
`;
export class ServiceRequestProgressComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<
      ServiceRequestProgressSubscription,
      ServiceRequestProgressVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<
        ServiceRequestProgressSubscription,
        ServiceRequestProgressVariables
      >
        subscription={ServiceRequestProgressDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ServiceRequestProgressProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    ServiceRequestProgressSubscription,
    ServiceRequestProgressVariables
  >
> &
  TChildProps;
export function ServiceRequestProgressHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ServiceRequestProgressSubscription,
        ServiceRequestProgressVariables,
        ServiceRequestProgressProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ServiceRequestProgressSubscription,
    ServiceRequestProgressVariables,
    ServiceRequestProgressProps<TChildProps>
  >(ServiceRequestProgressDocument, operationOptions);
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
