import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ServiceModule } from './service/service.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ServiceModule, AuthModule],
})
export class AppModule {}
