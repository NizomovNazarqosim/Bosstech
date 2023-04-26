import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { UserDto } from './user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    getAllUsers(req: any): Promise<void>;
    getOneUser(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    postUserImage(req: Request | any, filename: string): Promise<"You do not have token" | {
        succes: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        succes?: undefined;
    }>;
    updateUser(req: any, body: UserDto): Promise<"You do not have token" | {
        succes: boolean;
        message: string;
        success?: undefined;
    } | {
        success: boolean;
        message: string;
        succes?: undefined;
    }>;
}
