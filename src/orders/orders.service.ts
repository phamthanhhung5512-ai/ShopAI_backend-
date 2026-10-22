import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createOrderDto: CreateOrderDto) {
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng');
    }

    // Tự tính lại tổng tiền từ Database sản phẩm (Server-side Total Validation)
    let calculatedTotal = 0;
    const orderItemsData = [];

    for (const item of createOrderDto.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Không tìm thấy sản phẩm ${item.productId}`);
      }

      const itemTotal = product.price * item.quantity;
      calculatedTotal += itemTotal;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Từ chối tổng tiền gian lận từ Client
    if (Math.abs(createOrderDto.totalAmount - calculatedTotal) > 0.01) {
      throw new BadRequestException(
        `Tổng tiền không chính xác! Client gửi (${createOrderDto.totalAmount}) khác giá trị thực tế (${calculatedTotal})`,
      );
    }

    // Tạo đơn hàng trạng thái PENDING
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount: calculatedTotal,
        address: createOrderDto.address,
        phone: createOrderDto.phone,
        status: 'PENDING',
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async findAllByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Không tìm thấy đơn hàng ID ${orderId}`);
    }

    return order;
  }

  async pay(userId: string, orderId: string) {
    const order = await this.findOne(userId, orderId);

    const updatedOrder = await this.prisma.order.update({
      where: { id: order.id },
      data: { status: 'PAID' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return updatedOrder;
  }
}
