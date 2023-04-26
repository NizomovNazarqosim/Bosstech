import { Controller, Post, Body, UseGuards, Res, Get, Req, HttpCode, HttpStatus} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto/auth.dto";
import { LocalGuard } from "./guard/local.guard";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "module/user.entity";

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }
   // starting of  regsister part
   @ApiBadRequestResponse({
      description:'Bad request error',
   })
   @ApiCreatedResponse({
      content: {
      Res:{
         example:{
            "success": true,
            "message": "You are successfully registered",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjYjdhNDFkLWFhNDAtNGNiMi05ZjIwLWRjZTY5MDIwMTMzMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk4MDQ2fQ.mm8Y7SlJ3MXUkgH_Y0ADl9BoxCoUFTI35V3Au7B-Y4I"
        }
      }
   }})
    @UseGuards(LocalGuard)
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() body: CreateUserDto, @Res() res: Response, @Req() req: Request) {
       return this.service.create(body,  res, req)
    }


// starting of login part
   @ApiBadRequestResponse({
      description:'Bad request error',
   })
   @ApiOkResponse({
      content: {
      Res:{
         example:{
            "success": true,
            "message": "You are successfully registered",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjYjdhNDFkLWFhNDAtNGNiMi05ZjIwLWRjZTY5MDIwMTMzMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk4MDQ2fQ.mm8Y7SlJ3MXUkgH_Y0ADl9BoxCoUFTI35V3Au7B-Y4I"
        }
      }
   }})
    @UseGuards(LocalGuard)
    @Post('login')
    login(@Body() body: LoginUserDto, @Res() res: Response, @Req() req) {
       return this.service.login(body, res, req)
    }
}