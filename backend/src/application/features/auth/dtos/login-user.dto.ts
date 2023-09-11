import { z } from "zod";
import Dto from "../../../common/dto";

class LoginUserDto extends Dto {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }

  validate(): void {
    const validator = z.object({
      username: z.string().min(1, 'Username is required'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default LoginUserDto;
