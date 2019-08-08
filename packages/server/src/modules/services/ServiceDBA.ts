import { ObjectId } from "mongodb";
import { ServiceModel } from "../../models/Service";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(ServiceModel);

const get = async (serviceId: ObjectId) => {
  return await ServiceModel.findById(serviceId)
    .populate("categories")
    .lean()
    .exec();
};

const findAll = async (condition: any = {}) => {
  return await ServiceModel.find(condition)
    .populate("categories")
    .lean()
    .exec();
};

export default {
  ...dba,
  findAll,
  get,
};
