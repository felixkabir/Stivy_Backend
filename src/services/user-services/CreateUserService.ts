import { Gender } from "@prisma/client";
import { addInterestToUser } from "../../helpers/addInterestToUser";
import { prisma } from "../../PrismaHandler";
import { UserResponse, UserType } from "../../Types"; 
import { DatabaseError, StivyError, UserAlreadyExistsError, ValidationError } from "../../error";

type UserTypeRequest = Omit<UserType, "id" | "created_at"> & {
    interest_types: string[];
    gender?: Gender;
    phone?: string;
}

export class CreateUserService {
    async execute({ 
        username, 
        email, 
        password, 
        file_key, 
        file_url, 
        interest_types = [], 
        gender = Gender.OTHER,
        phone
    }: UserTypeRequest): Promise<UserResponse> {
        try {
            // Validate required fields
            if (!username || !email || !password) {
                throw new ValidationError("Nome, email e senha são obrigatórios");
            }

            // Check if email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                // If phone is provided, we could send SMS here
                if (phone) {
                    console.log(`Usuário já existe - SMS enviado para: ${phone}`);
                }
                throw new UserAlreadyExistsError();
            }

            // Create the user
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password,   
                    file_key,
                    file_url,
                    gender,

                }
            });

            await this.processUserInterests(newUser.id, interest_types);

            return newUser;

        } catch (error) {
            if (error instanceof StivyError) {
                throw error;
            }
            
            console.error('Database error:', error);
            throw new DatabaseError("Falha ao criar usuário no banco de dados");
        }
    }

    private async processUserInterests(userId: string, interest_types: string[]) {
        try {
            if (interest_types.length > 0) {
                const validInterests = await prisma.interest.findMany({
                    where: {
                        interest_type: {
                            in: interest_types.map(type => type.toUpperCase())
                        }
                    }
                });

                if (validInterests.length === 0) {
                    await this.addDefaultInterest(userId);
                } else {
                    for (const interest of validInterests) {
                        await addInterestToUser(userId, interest.id);
                    }
                }
            } else {
                await this.addDefaultInterest(userId);
            }
        } catch (error) {
            console.error('Error processing interests:', error);
            throw new DatabaseError("Falha ao processar interesses do usuário");
        }
    }

    private async addDefaultInterest(userId: string) {
        const defaultInterest = await prisma.interest.findFirst({
            where: { interest_type: "FASHION_LOVER" }
        });
        if (defaultInterest) {
            await addInterestToUser(userId, defaultInterest.id);
        }
    }
}