import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatPromptDto {
  @ApiProperty({ example: 'ShopAI có bán sản phẩm gì hot không?', description: 'Câu hỏi người dùng gửi cho AI' })
  @IsString()
  @IsNotEmpty({ message: 'Nội dung tin nhắn không được để trống' })
  prompt: string;
}
