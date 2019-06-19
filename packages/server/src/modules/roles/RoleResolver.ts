import { validRoleSchema } from "@homeaider/common";
import { ObjectId } from "mongodb";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { formatYupError } from "../../utils/formatYupError";
import { FormSubmitResponse } from "../FormSubmitResponse";
import RoleDBA from "./RoleDBA";
import { RoleInput } from "./RoleInput";
import { Role } from "./RoleObject";

@Resolver(Role)
export class RoleResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async createRole(
    @Arg("input") roleInput: RoleInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validRoleSchema.validate(roleInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = roleInput;

    const roleAlreadyExists = await RoleDBA.doExists({ name });

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

    try {
      await RoleDBA.create(roleInput);
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async updateRole(
    @Arg("roleId") roleId: ObjectId,
    @Arg("input") roleInput: RoleInput
  ): Promise<FormSubmitResponse | null> {
    try {
      await validRoleSchema.validate(roleInput, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const { name } = roleInput;

    const roleAlreadyExists = await RoleDBA.doExists({
      name,
      _id: { $ne: roleId },
    });

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

    try {
      await RoleDBA.update({ _id: roleId }, { ...roleInput });
    } catch (error) {
      throw error;
    }

    return { errors: [] };
  }

  @Authorized()
  @Mutation(() => FormSubmitResponse, { nullable: true })
  async deleteRole(
    @Arg("roleId") roleId: ObjectId
  ): Promise<FormSubmitResponse | null> {
    try {
      await RoleDBA.delete({ _id: roleId });
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
    const roles = await RoleDBA.findAll();

    return roles;
  }
}
