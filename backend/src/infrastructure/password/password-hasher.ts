import bcrypt from "bcrypt";
import IPasswordHasher from "../../application/contracts/infrastructure/password-hasher.contract";

class PasswordHasher implements IPasswordHasher {
  private readonly saltRounds: number;

  constructor(saltRounds: number) {
    this.saltRounds = saltRounds;
  }

  async generateSalt(): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return salt;
  }

  async hash(plainTextPassword: string, salt: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  }

  async validate(
    userGivenPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(userGivenPassword, hashedPassword);
    return match;
  }
}

export default PasswordHasher;
