import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { ChatPromptDto } from './dto/chat-prompt.dto';

@ApiTags('Ai')
@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiOperation({ summary: 'Gửi prompt hỏi AI Trợ lý Mua sắm (API Key ẩn tại .env Server)' })
  @ApiResponse({ status: 201, description: 'Trả về { reply } từ Gemini AI' })
  @Post('chat')
  async chat(@Body() chatPromptDto: ChatPromptDto) {
    return this.aiService.chat(chatPromptDto);
  }
}
