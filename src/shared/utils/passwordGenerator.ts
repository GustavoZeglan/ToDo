import { compare, hash } from 'bcrypt';

export const passwordGenerator = async (
  password: string,
): Promise<string | void> => {
  try {
    const hashedPassword = await hash(password, 10);

    const isMatch = await compare(password, hashedPassword);

    if (isMatch) return String(hashedPassword);
  } catch (err) {
    console.error(err);
    return password;
  }
};
