import { RoleModel } from "../../models/Role";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(RoleModel);

const findAll = async (condition: any = {}) => {
  return await RoleModel.find(condition)
    .lean()
    .exec();
};

export default {
  ...dba,
  findAll,
};
