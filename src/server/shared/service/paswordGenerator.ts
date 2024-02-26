import bcrypt from "bcrypt";

export const passwordGenerator = async (password: string) => {

	try {
		const hashedPassword = await bcrypt.hash(password,10);
		
		const isMatch = await bcrypt.compare(password, hashedPassword);

		if(isMatch) return hashedPassword.toString();

	} catch (err) {
		console.error(err);
		return password;
	}

} ;