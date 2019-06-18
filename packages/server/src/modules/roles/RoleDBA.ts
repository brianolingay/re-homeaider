import { RoleModel } from "server/src/models/Role";

const createRole = async (input: any) => {
  const role = new RoleModel(input);

  await role.save();
};

const checkRoleExists = async (condition: any, columns: string = "_id") => {
  return await RoleModel.findOne(condition, columns, {
    lean: true,
  }).exec();
};

const updateRole = async (condition: any, input: any) => {
  return await RoleModel.updateOne(condition, input);
};

const deleteRole = async (condition: any) => {
  return await RoleModel.deleteOne(condition);
};

const findAll = async (condition: any = {}) => {
  return await RoleModel.find(condition)
    .lean()
    .exec();
};

export default {
  checkRoleExists,
  createRole,
  deleteRole,
  findAll,
  updateRole,
};
