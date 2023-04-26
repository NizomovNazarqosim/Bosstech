/// <reference types="express" />
import { Strategy } from 'passport-jwt';
declare class IRequest extends Request {
    user: any;
}
declare const JwtStartegy_base: new (...args: any[]) => Strategy;
export declare class JwtStartegy extends JwtStartegy_base {
    constructor();
    validate(req: IRequest, payload: any): Promise<any>;
}
export {};
