import Dto from "../../../common/dto";
import { z } from "zod";

class VerifyEmailDto extends Dto {
  email: string;
  code: string;

  constructor(email: string, code: string) {
    super();
    this.email = email;
    this.code = code;
  }

  validate(): void {
    const validator = z.object({
      email: z.string().email('Invalid email address'),
      code: z.string().min(6, 'Verification code must be at least 6 characters'),
    });

    const validationResult = validator.safeParse(this);
    
    if (validationResult.success === false) {
      throw new Error(validationResult.error.errors[0].message);
    }
  }
}

export default VerifyEmailDto;

