import * as yup from "yup";
import { nameNotLongEnough } from "./constants";

export const validServiceActionSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255)
    .required(),
  service: yup.string().required(),
});
