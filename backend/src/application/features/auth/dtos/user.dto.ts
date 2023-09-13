import { UserEntity } from "../../../../domain/entities";

class UserDto {
  name: string;
  username: string;
  email: string;
  profilePicture: string;

  static fromEntity(userEntity: UserEntity) {
    const userDto = new UserDto();
    userDto.name = userEntity.name;
    userDto.username = userEntity.username;
    userDto.email = userEntity.email;
    userDto.profilePicture = userEntity.profilePicture;

    return userDto;
  }
}

export default UserDto;
