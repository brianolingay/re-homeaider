import { Resolver, Query, Mutation, Authorized, Arg } from "type-graphql";
import { ObjectId } from "mongodb";
import { validRoleSchema } from "@homeaider/common";

import { RoleModel } from "./../../models/Role";
import { Role } from "../../types/objects/Role";

import { RoleResponse } from "./response";
import { RoleInput } from "./input";

import { formatYupError } from "../../utils/formatYupError";

@Resolver(Role)
export class RoleResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => RoleResponse, { nullable: true })
  async createRole(
    @Arg("input") roleInput: RoleInput
  ): Promise<RoleResponse | null> {
    try {
      await validRoleSchema.validate(roleInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = roleInput;

    const roleAlreadyExists = await RoleModel.findOne({ name }, "_id", {
      lean: true,
    }).exec();

    if (roleAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    const role = new RoleModel(roleInput);

    await role.save();

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => RoleResponse, { nullable: true })
  async updateRole(
    @Arg("roleId") roleId: ObjectId,
    @Arg("input") roleInput: RoleInput
  ): Promise<RoleResponse | null> {
    try {
      await validRoleSchema.validate(roleInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = roleInput;

    const roleAlreadyExists = await RoleModel.findOne(
      { name, _id: { $ne: roleId } },
      "_id",
      {
        lean: true,
      }
    ).exec();

    if (roleAlreadyExists) {
      return {
        errors: [
          {
            path: "name",
            message: "Name is already being used!",
          },
        ],
      };
    }

    await RoleModel.updateOne({ _id: roleId }, { ...roleInput });

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => RoleResponse, { nullable: true })
  async deleteRole(
    @Arg("roleId") roleId: ObjectId
  ): Promise<RoleResponse | null> {
    try {
      await RoleModel.deleteOne({ _id: roleId });
    } catch {
      return {
        errors: [
          {
            path: "role",
            message: "Something went wrong!",
          },
        ],
      };
    }

    return null;
  }

  @Authorized()
  @Query(() => [Role], { nullable: true })
  async roles(): Promise<Role[]> {
    const roles = await RoleModel.find({})
      .lean()
      .exec();

    return roles;
  }
}
