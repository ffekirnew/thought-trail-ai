import { z } from "zod";
import Dto from "../../../common/dto";

class CreateUserDto extends Dto {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(name: string, username: string, email: string, password: string) {
    super();
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  validate(): void {
    const validator = z.object({
      name: z.string().min(1, 'Name is required'),
      username: z.string().min(1, 'Username is required'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(8, 'Password must be at least 8 characters'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default CreateUserDto;
