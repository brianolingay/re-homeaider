import * as yup from "yup";
import { nameNotLongEnough } from "./constants";

export const validServiceSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255)
    .required(),
  statement: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255)
    .required(),
  category: yup.string().required(),
});
