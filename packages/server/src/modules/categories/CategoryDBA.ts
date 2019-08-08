import { CategoryModel } from "../../models/Category";
import { ObjectId } from "mongodb";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(CategoryModel);

const get = async (categoryId: ObjectId) => {
  return await CategoryModel.findById(categoryId)
    .lean()
    .exec();
};

const findAll = async (condition: any = {}) => {
  return await CategoryModel.find(condition)
    .populate({ path: "services", populate: { path: "category" } })
    .exec();
};

export default {
  ...dba,
  findAll,
  get,
};
