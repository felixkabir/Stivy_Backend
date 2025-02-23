import { decodePassword } from "../../helpers/decodePassword";
import { UserType } from "../../Types";
import { GetUserByEmailService } from "../user-services/GetUserByEmailService";
import { GetUserService } from "../user-services/GetUserService";
import { SetUserStatusService } from "./set-user-status";


type LoginTypeRequest = Omit<UserType, "id" | "file_key" | "file_url" | "username" | "created_at">

export class LoginService {
    async execute({ email, password }: LoginTypeRequest):Promise<{ user:UserType | UserType[] | null, token: string} | null> {
        const user = await new GetUserByEmailService().execute(email)
        
        if (user !== null) {
            const is_match = await decodePassword(password, user.password)
            if (is_match) {
                await new SetUserStatusService().execute({ email: String(user?.email), status: true })

                const userById = await new GetUserService().execute({ userId: user.id })

                return {
                    user: userById,
                    token: "_"
                }
            } else {
                return null
            }
        } else {
            return null
        }
    }
}