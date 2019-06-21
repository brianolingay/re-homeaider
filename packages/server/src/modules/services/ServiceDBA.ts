import { ObjectId } from "mongodb";
import { ServiceModel } from "server/src/models/Service";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(ServiceModel);

const findAll = async (condition: any = {}) => {
  return await ServiceModel.find(condition)
    .populate("category")
    .lean()
    .exec();
};

const getAllAvailableServiceByCategory = async (categoryId: ObjectId) => {
  return await ServiceModel.aggregate([
    {
      $match: { category: categoryId },
    },
    {
      $lookup: {
        from: "providerservices",
        localField: "_id",
        foreignField: "service",
        as: "pc_doc",
      },
    },
    { $match: { pc_doc: { $ne: [] } } },
    {
      $project: {
        _id: 1,
        name: 1,
        totalUsers: {
          $size: {
            $filter: {
              input: "$pc_doc",
              as: "pc",
              cond: { $eq: ["$$pc.approved", true] },
            },
          },
        },
      },
    },
  ]);
};

export default {
  ...dba,
  findAll,
  getAllAvailableServiceByCategory,
};
