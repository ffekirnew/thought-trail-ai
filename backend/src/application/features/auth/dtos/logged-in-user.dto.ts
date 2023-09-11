import UserEntity from "../../../../domain/entities/user.entity";

interface LoggedInUserDto {
  user: UserEntity;
  token: string;
}

export default LoggedInUserDto;
