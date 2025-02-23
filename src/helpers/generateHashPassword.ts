import bcrypt from "bcryptjs"


export async function generateHashPassword (password: string): Promise<any> {

    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT))

    const passwordHashed = await bcrypt.hash(password, salt)

    return passwordHashed
}