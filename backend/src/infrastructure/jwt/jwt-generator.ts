import jwt from "jsonwebtoken";
import UserEntity from "../../domain/entities/user.entity";
import IJwtGenerator from "../../application/contracts/infrastructure/jwt-generator.contract";

class JwtGenerator implements IJwtGenerator {
  private readonly secretKey: string;
  private readonly expiresIn: number;

  constructor(secretKey: string, expiresIn: number) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  generate(user: UserEntity): string {
    const payload = {
      userId: user._id,
      username: user.username,
    };

    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }
}

export default JwtGenerator;
