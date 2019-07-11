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

const getAllAvailable = async () => {
  const aggregate = [
    {
      $lookup: {
        from: "services",
        localField: "_id",
        foreignField: "category",
        as: "services_doc",
      },
    },
    {
      $unwind: {
        path: "$services_doc",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "providerservices",
        localField: "services_doc._id",
        foreignField: "service",
        as: "services_doc.ps_doc",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        services: {
          $push: "$services_doc",
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        totalServices: {
          $size: {
            $filter: {
              input: "$services",
              as: "sd",
              cond: {
                $ne: [
                  {
                    $filter: {
                      input: "$$sd.ps_doc",
                      as: "ps",
                      cond: { $eq: ["$$ps.approved", true] },
                    },
                  },
                  [],
                ],
              },
            },
          },
        },
      },
    },
  ];

  return await CategoryModel.aggregate(aggregate);
};

export default {
  ...dba,
  findAll,
  getAllAvailable,
  get,
};
