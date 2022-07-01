import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { myError } from '../../utils/errorHandler';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto, response: Response): Promise<any> {
    try {
      const candidate = await this.userModel.findOne({
        mail: userDto.mail,
      });
      if (candidate) {
        const passwordResult = bcrypt.compareSync(
          userDto.password,
          candidate.password,
        );
        if (passwordResult) {
          const token = this.jwtService.sign({
            mail: candidate.mail,
            _id: candidate._id,
          });
          response.status(200).send({
            token: `Bearer ${token}`,
          });
        } else {
          response
            .status(401)
            .send({ message: 'Пароли не совпали. Попробуйте снова.' });
        }
      } else {
        response
          .status(404)
          .send({ message: 'Пользователь с таким email не найден.' });
      }
    } catch (e) {
      myError(response, e);
    }
  }

  async register(userDto: UserDto, response: Response): Promise<any> {
    try {
      const candidate = await this.userModel.findOne({
        mail: userDto.mail,
      });
      if (candidate) {
        response
          .status(409)
          .send({ message: 'Такой email уже занят. Попробуйте другой.' });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const password = userDto.password;
        userDto.password = bcrypt.hashSync(password, salt);
        await new this.userModel(userDto).save();
        response.status(201).send(userDto);
      }
    } catch (e) {
      myError(response, e);
    }
  }

  async addInBasket(response: Response, request: Request): Promise<any> {
    try {
      const updated = await this.userModel.findById(request.user['id']);
      updated.basket.push(request.body.productId);
      updated.save();
      response.status(200).send({ message: 'Товар добавлен в корзину' });
    } catch (e) {
      myError(response, e);
    }
  }

  async getFromBasket(response: Response, request: Request): Promise<any> {
    try {
      const user = await this.userModel.findById(request.user['_id']);
      response.status(200).send({ basket: user.basket });
    } catch (e) {
      myError(response, e);
    }
  }
}
