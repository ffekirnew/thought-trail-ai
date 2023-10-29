import UserEntity from "../../../domain/entities/user.entity";

interface IJwtGenerator {
  generate: (user: UserEntity) => string;
}

export default IJwtGenerator;
