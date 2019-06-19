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

    const roleAlreadyExists = await RoleDBA.checkRoleExists({ name });

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
      await RoleDBA.createRole(roleInput);
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

    const roleAlreadyExists = await RoleDBA.checkRoleExists({
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
      await RoleDBA.updateRole({ _id: roleId }, { ...roleInput });
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
      await RoleDBA.deleteRole({ _id: roleId });
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
