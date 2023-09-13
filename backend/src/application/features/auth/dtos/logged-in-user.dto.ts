import UserDto from "./user.dto";

interface LoggedInUserDto {
  user: UserDto;
  token: string;
}

export default LoggedInUserDto;
