import { decodePassword } from "../../helpers/decodePassword";
import { UserResponse, UserType } from "../../Types";
import { GetUserByEmailService } from "../user-services/GetUserByEmailService";
import { SetUserStatusService } from "./set-user-status";


type LogoutTypeRequest = Omit<UserType, "id" | "file_key" | "file_url" | "username" | "password" | "created_at">

export class LogoutService {
    async execute({ email }: LogoutTypeRequest):Promise<void> {
        const user = await new GetUserByEmailService().execute(email)

        await new SetUserStatusService().execute({ email: String(user?.email), status: false})
    }
}