import { Resolver, Query, Ctx, Mutation, Authorized } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";
import { getMongoManager } from "typeorm";

@Resolver(User)
export class UserResolver {
  constructor() {}

  @Query(())

  @Authorized()
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ) {
    return new Promise(res =>
      ctx.req.session!.destroy(err => {
        console.log(err);
        res(!!err);
      })
    );
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ) {
    const { userId } = ctx.req.session!;
    const manage = getMongoManager();
    return userId ? manage.findOne(User, { id: userId }) : null;
  }
}
