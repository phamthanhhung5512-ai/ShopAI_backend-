import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ example: 'prod_0', description: 'ID sản phẩm' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 1, description: 'Số lượng mua' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 3000000000, description: 'Giá tiền' })
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '123 Đường ABC, Hà Nội', description: 'Địa chỉ giao hàng' })
  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @ApiProperty({ example: '0988888888', description: 'Số điện thoại' })
  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @ApiProperty({ example: 3000000000, description: 'Tổng tiền do client gửi (Server sẽ tự tính lại)' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ type: [OrderItemDto], description: 'Danh sách sản phẩm mua' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
