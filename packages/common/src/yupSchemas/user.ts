import * as yup from "yup";
import {
  passwordNotLongEnough,
  emailNotLongEnough,
  invalidEmail,
  firstNameNotLongEnough,
  lastNameNotLongEnough,
} from "./constants";

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();

const userInfo = {
  firstName: yup
    .string()
    .min(3, firstNameNotLongEnough)
    .max(255)
    .required(),
  lastName: yup
    .string()
    .min(3, lastNameNotLongEnough)
    .max(255)
    .required(),
  mobile: yup.string().required(),
};

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .email(invalidEmail)
    .min(3, emailNotLongEnough)
    .max(255)
    .required(),
  ...userInfo,
  password: registerPasswordValidation,
  subscriptionId: yup.string().required(),
  roleId: yup.string().required(),
});

export const validUpdateUserSchema = yup.object().shape({ ...userInfo });

const invalidLogin = "invalid login";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(invalidLogin)
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required(),
  password: yup
    .string()
    .min(3, invalidLogin)
    .max(255, invalidLogin)
    .required(),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation,
});
