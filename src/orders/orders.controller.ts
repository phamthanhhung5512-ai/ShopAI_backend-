import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Tạo đơn hàng mới (Yêu cầu JWT Token)' })
  @ApiResponse({ status: 201, description: 'Tạo đơn PENDING thành công' })
  @ApiResponse({ status: 400, description: 'Tổng tiền gian lận hoặc giỏ rỗng' })
  @ApiResponse({ status: 401, description: 'Chưa xác thực JWT Token' })
  @Post()
  async create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, createOrderDto);
  }

  @ApiOperation({ summary: 'Lấy danh sách đơn hàng của User' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng của người dùng' })
  @Get()
  async findAllByUser(@Request() req: any) {
    return this.ordersService.findAllByUser(req.user.id);
  }

  @ApiOperation({ summary: 'Lấy chi tiết hóa đơn theo ID' })
  @ApiResponse({ status: 200, description: 'Chi tiết hóa đơn' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hóa đơn' })
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.findOne(req.user.id, id);
  }

  @ApiOperation({ summary: 'Thanh toán hóa đơn đơn hàng' })
  @ApiResponse({ status: 200, description: 'Chuyển trạng thái đơn sang PAID' })
  @Post(':id/pay')
  async pay(@Request() req: any, @Param('id') id: string) {
    return this.ordersService.pay(req.user.id, id);
  }
}
