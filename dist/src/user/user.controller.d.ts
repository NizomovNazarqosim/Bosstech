/// <reference types="express" />
import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getOneUser(req: any, res: any): Promise<import("express").Response<any, Record<string, any>>>;
    uploadFile(file: any, req: any): Promise<"You do not have token" | {
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
