import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Creamos nuestra "Lista VIP" de dominios permitidos
  const dominiosPermitidos = [
    process.env.FRONTEND_URL, // Tu aplicación en Vercel (viene del .env)
    'http://localhost:4200',  // Tu aplicación corriendo localmente en tu PC
  ];

  // 2. Le pasamos las reglas de seguridad al CORS
  app.enableCors({
    origin: dominiosPermitidos,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Esto es muy importante para que pasen los Tokens de administrador
  });

  // 3. Arrancamos el servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();