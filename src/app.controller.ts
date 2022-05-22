import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import configuration from './config/configuration';
import { ConfigService } from "@nestjs/config";
@Controller('api/v1')
export class AppController {
  // constructor(private readonly configService: ConfigService) {}
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://user:${this.configService.get<string>('RABBITMQ_KEY')}@${this.configService.get<string>('RABBITMQ_HOST')}:${this.configService.get<string>('RABBITMQ_PORT')}/smartranking`],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit(
      'criar-categoria',
      criarCategoriaDto,
    );
  }
}
