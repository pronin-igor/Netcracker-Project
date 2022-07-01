import {
  Body,
  Controller,
  Get, Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(
    @Body() createUserDto: UserDto,
    @Res() response: Response,
  ): Promise<any> {
    return this.usersService.login(createUserDto, response);
  }

  @Post('register')
  register(
    @Body() createUserDto: UserDto,
    @Res() response: Response,
  ): Promise<any> {
    return this.usersService.register(createUserDto, response);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('basket')
  addInBasket(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<any> {
    return this.usersService.addInBasket(response, request);
  }

  @UseGuards(JwtAuthGuard)
  @Get('basket')
  getFromBasket(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<any> {
    return this.usersService.getFromBasket(response, request);
  }
}
