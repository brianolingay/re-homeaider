import { RoleModel } from "../../models/Role";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(RoleModel);

const findAll = async (condition: any = {}) => {
  return await RoleModel.find(condition)
    .lean()
    .exec();
};

export default {
  createRole: dba.create,
  deleteRole: dba.delete,
  updateRole: dba.update,
  checkRoleExists: dba.doExists,
  findAll,
};
