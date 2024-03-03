import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hashSync, compareSync } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  register({ email, password, username }: RegisterDto) {
    const hash = hashSync(password, 10);

    return this.prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });

    if (!findUser) {
      throw new HttpException(
        'No estas registrado, contacta con un administrador',
        404,
      );
    }

    const checkPassword = compareSync(loginDto.password, findUser.password);
    if (!checkPassword) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    const token = this.jwt.sign({
      username: findUser.username,
    });

    return {
      access_token: token,
      user: findUser,
    };
  }

  logout() {}

  me(accessToken: string) {
    const user = this.jwt.decode(accessToken) as User;

    if (!user) {
      throw new HttpException(
        'No estas registrado, contacta con un administrador',
        404,
      );
    }
    return this.prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });
  }
}
