import IOneTimeCodeGenerator from "../../application/contracts/infrastructure/one-time-code-generator.contract";

class OneTimeCodeGenerator implements IOneTimeCodeGenerator {
  generate(): string {
    const codeLength = 6;
    const codeChars = '0123456789';
    let code = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * codeChars.length);
      code += codeChars.charAt(randomIndex);
    }

    return code;
  }
}

export default OneTimeCodeGenerator;
