import { Injectable, BadRequestException } from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto, LoginUserDto } from './dto/auth.dto'
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
import {sendEmail} from '../utils/nodemailer'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService, 
        ) { }
    // hashing password
    async hashPassword(password: string) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        return hashedPassword;
    }
    // compare password 
    async comparePassword(args: {
        password: string, hash: string
    }) {
        const { password, hash } = args
        return await bcrypt.compare(password, hash)
    }
    // make token
    async signToken(args: {id:string, role: string}) {
        return this.jwtService.signAsync(args, {secret: '1q2w3e4r'})
    }
    // this user is have or not
    async isHaveUser(payload: { email: string }) {
        const { email } = payload
        const foundUser = await this.userRepository.findOne({where: {email: email}})

        return foundUser
    }
    // createnew user
    async create(body: CreateUserDto, res: Response, req: Request) {
        const { password, username, email, image, address } = body
        const isHave = await this.isHaveUser({ email: email })
        if (isHave) {
            throw new BadRequestException('You are already registered')
        }

        const hashedPassword = await this.hashPassword(password)
        const created = await this.userRepository.save({
            name: username, email, password: hashedPassword, user_image: image, address: address
        })
        const token = await this.signToken({id: created.id, role:created.user_role})
        await sendEmail({
            email: email,
            subject: "Activate your account",
            text: `Hello ${username}, your account sign in with your account to BOSSTECH company`,
        })

        req.headers.token = token
        res.status(201).json({
            success: true,
            message: `You are successfully registered`,
            token: token
        });
    }
    // login user 
    async login(body: LoginUserDto, res: Response, req: Request) {
        const { email, password } = body
        const isHave = await this.isHaveUser({ email: email})
        const userPassword = JSON.parse(JSON.stringify(isHave))?.password
        if (!isHave || !userPassword) {
            throw new BadRequestException('You are not registered')
        }
        const isValidPassword = await this.comparePassword({password: password, hash: userPassword})
        if(!isValidPassword) throw new BadRequestException('Your password is invalid, please enter valid one')
        const token = await this.signToken({id: isHave.id, role: isHave.user_role})
        req.headers.token = token
        res.status(200).send({
            success: true,
            message: 'You are login',
            token: token
        })
    }
}
//  Jon Psppink payment gateway amazzon 19:27