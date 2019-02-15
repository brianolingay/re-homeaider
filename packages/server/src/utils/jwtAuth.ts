import { UserRepository } from "./../repositories/mongoose/user/index";
import * as jwt from "jsonwebtoken";
import { User } from "../types/objects/User";
import { TokensResponse } from "../modules/type-graphql/shared/tokensReponse";

const SECRET_ONE =
  "984f611f55d16ecf21956c64ba46e3e7a09df496b69d4a4c25693cc72e27639b";
const SECRET_TWO =
  "9a974f00463a02fef75be762f3c1879fca2daf275faf11017708933665ec1c87";

interface NewRefreshToken extends TokensResponse {
  user: User | null;
}

export const createToken = async (user: User): Promise<TokensResponse> => {
  const token = jwt.sign({ user }, SECRET_ONE, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign({ user }, SECRET_TWO, {
    expiresIn: "7h",
  });

  return { token, refreshToken };
};

export const refreshTokens = async (
  refreshToken: string
): Promise<NewRefreshToken> => {
  const defaultResponse = {
    token: null,
    refreshToken: null,
    user: null,
  };

  try {
    const {
      user: { _id },
    } = jwt.decode(refreshToken) as any;

    const user = await UserRepository.me(_id);

    if (!user) {
      return defaultResponse;
    }

    try {
      jwt.verify(refreshToken, SECRET_TWO);
      const newTokens = await createToken(user);
      return {
        ...defaultResponse,
        ...newTokens,
        user,
      };
    } catch (err) {
      return defaultResponse;
    }
  } catch (err) {
    return defaultResponse;
  }
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, SECRET_ONE) as any;
};
