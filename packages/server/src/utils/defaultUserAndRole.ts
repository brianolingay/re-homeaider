import * as bcrypt from "bcryptjs";
import { UserModel } from "../models/User";
import { RoleModel } from "../models/Role";

export const defaultUserAndRole = async () => {
  const roleExist = await RoleModel.findOne({ name: "admin" }).exec();

  if (!roleExist) {
    const role = new RoleModel({ name: "admin" });

    await role.save();

    const userExist = await UserModel.findOne({
      email: "admin@homeaider.com",
    }).exec();

    if (!userExist) {
      const user = new UserModel({
        email: "admin@homeaider.com",
        password: await bcrypt.hash("homeaider", bcrypt.genSaltSync(10)),
        firstName: "Admin",
        lastName: "Homeaider",
        mobile: "09271221146",
        role: role._id,
      });

      await user.save();
    }
  }
};
