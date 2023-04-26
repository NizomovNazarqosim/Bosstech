import {BadRequestException, Injectable} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'module/user.entity';
import { Repository } from 'typeorm';
import { verifyToken } from 'src/utils/jwt_verify';
import { Response } from 'express';
import { UserDto, UserInterface } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {}
// get all users

    async getAllUsers(req) {

    }

// get one user information according to token
    async getOneUser(req, res: Response) {
      const token = req.headers.token
      const verifyedToken = await verifyToken(String(token))
      const foundUser = await this.userRepository.findOne({where: {
        id: verifyedToken?.id
      }})
      if(!foundUser) {
       return res.status(200).send({
        success: false,
        messsage: 'You are not registered'
       })
      }
      delete foundUser.password
      res.send(foundUser)
    }

    // Update user image
    async postUserImage(req: Request | any, filename: string){
      const token = req.headers.token;
      if(!token) {
        return 'You do not have token'
      }
    const verifyed = await verifyToken(token);
    const userData = JSON.parse(JSON.stringify(verifyed));

    const IsUser = await this.userRepository.findOne({where:{
      id: userData.id
    }})
    if (!IsUser) {
      return {
        succes: false,
        message: 'This user not found'
      }
    }
    IsUser.user_image = filename
    if (!filename) throw new BadRequestException('Something went wrong')
    await this.userRepository.createQueryBuilder().update(UserEntity).set({user_image: filename}).where("id = :id", {id: verifyed}).execute()
    return {
      success: true,
      message: 'This image added'
    }
    }
    // update user's information by id
    async updateUser(req: any, body: UserDto){
      const token = req?.headers?.token;
      if(!token) {
        return 'You do not have token'
      }
    const verifyed = await verifyToken(token);
    const userData = JSON.parse(JSON.stringify(verifyed));

    const IsUser = await this.userRepository.findOne({where:{
      id: userData.id
    }})
    if (!IsUser) {
      return {
        succes: false,
        message: 'This user not found'
      }
    }
       const result = await this.userRepository.createQueryBuilder().update(UserEntity).set(body).where("id = :id", {id: IsUser.id}).execute()

       if(result?.affected == 1){
        return {
            success: true,
            message: 'Updated this user information'
        }
       }
       return {
        success: false,
        message: 'Bad Request error'
       }
    }

}