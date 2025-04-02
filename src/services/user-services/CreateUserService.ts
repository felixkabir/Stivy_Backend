import { Gender } from "@prisma/client";
import { addInterestToUser } from "../../helpers/addInterestToUser";
import { prisma } from "../../PrismaHandler";
import { UserResponse, UserType } from "../../Types";

type UserTypeRequest = Omit<UserType, "id" | "created_at"> & {
    interest_types: string;
    gender?: Gender; 
}

export class CreateUserService {
    async execute({ username, email, password, file_key, file_url, interest_types, gender = Gender.OTHER}: UserTypeRequest): Promise<UserResponse | any> {

        const array_in_string = interest_types.replace(/\'/g, '')

        const parsed_array = JSON.parse(array_in_string)

        const defaultInterest = await prisma.interest.findFirst({
            where: { interest_type: "MODE_LOVER"}
        })
        
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,   
                file_key,
                file_url,
                gender
            }
        })

        if (interest_types && parsed_array.length > 0) {
            for (const interest_type of parsed_array) {
                if (interest_type.toUpperCase() !== "MODEL") {
                    const interest = await prisma.interest.findMany({ where: { interest_type: interest_type.toUpperCase() }})                
    
                    if (interest && interest.length > 0) {
                        await addInterestToUser(newUser.id, interest[0].id)
                    }                    
                }
            }

        } else {
            await addInterestToUser(newUser.id, defaultInterest ? defaultInterest.id : "DEFAULT")
        }

        return newUser
    }
}