import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './models/products/products.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://GoshaPronin:12345@cluster0.nqxle.mongodb.net/products?retryWrites=true&w=majority',
      {
        connectionName: 'products',
      },
    ),
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://GoshaPronin:12345@cluster0.nqxle.mongodb.net/users?retryWrites=true&w=majority',
      {
        connectionName: 'users',
      },
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
