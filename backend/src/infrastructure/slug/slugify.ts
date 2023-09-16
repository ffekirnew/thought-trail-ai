import { ISlugify } from "../../application/contracts/infrastructure";

class Slugify implements ISlugify {
  CreateSlug(sentence: string): string {
    const lowercaseSentence = sentence.toLowerCase();

    const slug = lowercaseSentence.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    return slug;
  }
}

export default Slugify;
