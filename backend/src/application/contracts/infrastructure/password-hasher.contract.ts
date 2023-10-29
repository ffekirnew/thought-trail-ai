interface IPasswordHasher {
  generateSalt: () => Promise<string>;
  hash: (plainTextPassword: string, salt: string) => Promise<string>;
  validate: (
    userGivenPassword: string,
    hashedPassword: string,
  ) => Promise<boolean>;
}

export default IPasswordHasher;
