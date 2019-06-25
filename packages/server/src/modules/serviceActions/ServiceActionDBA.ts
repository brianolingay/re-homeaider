import { ServiceActionModel } from "../../models/ServiceAction";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(ServiceActionModel);

const findAll = async (condition: any = {}) => {
  return await ServiceActionModel.find(condition)
    .populate("service")
    .lean()
    .exec();
};

export default {
  ...dba,
  findAll,
};
