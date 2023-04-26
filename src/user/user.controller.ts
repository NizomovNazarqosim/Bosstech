import {Controller, Get, Post, Put, Delete, Param, Body, Req, Res, UseGuards, UploadedFile, UseInterceptors, ParseUUIDPipe} from '@nestjs/common'
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { verifyToken } from 'src/utils/jwt_verify';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { multerOptions } from 'src/utils/multer';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles } from 'src/auth/decorators/role_checker';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UserDto, UserInterface } from './user.dto';
import {ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiHeader, ApiHeaders, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
      private readonly userService: UserService,
    ) {}


// get one user according to user token
    @Roles(Role.ADMIN, Role.USER, Role.PREMIUM)
    @UseGuards(JwtGuard, RolesGuard)
    @ApiHeader({
      name: 'token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDZjZDcxLTU2YjgtNGE5Zi04ZDY0LWQ3NTQ5NzY0NjBhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk5NzQ4fQ.BdWzJQDlQLDKDoHDcdUCatk3RiWgZmGCQ03t-PmycbM'
    })
    @ApiCreatedResponse({
      content: {
      Res:{
         example:{
          id: "5e06cd71-56b8-4a9f-8d64-d754976460a4",
          name: "Eshmat",
          email: "eshmat@gmail.com",
          address: "Chilonzor 4-dom",
          user_image: null,
          user_role: "user",
          created_at: "2023-04-19T10:00:40.885Z"
      }
      }
   }})
    @Get('one')
    getOneUser(@Req() req, @Res() res){
      return this.userService.getOneUser(req, res)
    }
    

    // insert user image part
    @Post('image')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @ApiBody({
      required: true,
      type:'multipart/form-data',
      schema:{
        type:'object',
        properties:{
          file:{
            type: 'string',
            format:'binary'
          }
        }
      }
    })
    @ApiConsumes('multipart/form-data')
    @UseGuards(JwtGuard)
    async uploadFile(@UploadedFile() file, @Req() req) {
      return this.userService.postUserImage(req, file.filename)
    }

    // update user information
    @ApiHeader({
      name: 'token',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMDZjZDcxLTU2YjgtNGE5Zi04ZDY0LWQ3NTQ5NzY0NjBhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgxODk5NzQ4fQ.BdWzJQDlQLDKDoHDcdUCatk3RiWgZmGCQ03t-PmycbM'
    })
    @ApiBadRequestResponse({
      description: 'Something went wrong'
    })
    @ApiResponse({
      content: {
      Res:{
         example:{
          "success": true,
          "message": "Updated this user information"
      }
      }
   }})
    @Put('update')
    updateUser(@Req() req, @Body() body: UserDto){
      return this.userService.updateUser(req, body)
    }

}