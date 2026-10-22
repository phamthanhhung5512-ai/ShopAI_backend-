import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Cho phép CORS kết nối từ Mobile App
  app.enableCors();

  // 2. Chặn và kiểm tra dữ liệu đầu vào bằng ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // 3. Khởi tạo tài liệu Swagger API tại /api/docs
  const config = new DocumentBuilder()
    .setTitle('ShopAI Backend API')
    .setDescription('Tài liệu API đầy đủ cho hệ thống ShopAI (Auth, Products, Orders, Ai)')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Xác thực tài khoản JWT')
    .addTag('Products', 'Quản lý danh sách sản phẩm')
    .addTag('Orders', 'Quản lý đơn hàng & Thanh toán')
    .addTag('Ai', 'Trợ lý AI Gemini Mua sắm')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. Lắng nghe cổng 3000 trên tất cả giao diện mạng (0.0.0.0)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 ShopAI Backend đang chạy tại: http://localhost:${port}`);
  console.log(`📚 Tài liệu Swagger UI: http://localhost:${port}/api/docs`);
}

bootstrap();
