import { UserSubscriptionModel } from "../../models/UserSubscription";
import { DBRepository } from "../DBRepo";

const dba = DBRepository(UserSubscriptionModel);

const findAll = async (condition: any = {}) => {
  return await UserSubscriptionModel.find(condition)
    .lean()
    .exec();
};

export default {
  ...dba,
  findAll,
};
