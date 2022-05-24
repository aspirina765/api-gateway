import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
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
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://user:${this.configService.get<string>(
            'RABBITMQ_KEY',
          )}@${this.configService.get<string>(
            'RABBITMQ_HOST',
          )}:${this.configService.get<string>('RABBITMQ_PORT')}/smartranking`,
        ],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias')
  constultarCategorias(@Query('idCategoria') _id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '');
  }
}
