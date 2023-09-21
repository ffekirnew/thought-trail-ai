import { UserEntity } from "../../../../domain/entities";

class UserDto {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  numberOfJournals: number;
  numberOfCollections: number;

  static fromEntity(userEntity: UserEntity) {
    const userDto = new UserDto();
    userDto.name = userEntity.name;
    userDto.username = userEntity.username;
    userDto.email = userEntity.email;
    userDto.profilePicture = userEntity.profilePicture;
    userDto.numberOfCollections = userEntity.collections.length;
    userDto.numberOfJournals = userEntity.journals.length;

    return userDto;
  }
}

export default UserDto;
