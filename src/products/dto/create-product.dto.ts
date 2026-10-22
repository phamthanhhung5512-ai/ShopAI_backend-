import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'SHOPAI-PROD-99', description: 'Mã vạch / Barcode sản phẩm' })
  @IsString()
  @IsNotEmpty({ message: 'Barcode không được để trống' })
  barcode: string;

  @ApiProperty({ example: 'Siêu xe mới', description: 'Tên sản phẩm' })
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @ApiProperty({ example: 1000, description: 'Giá sản phẩm (Không được là số âm)' })
  @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
  @Min(0, { message: 'Giá sản phẩm không được âm' })
  price: number;

  @ApiProperty({ example: '1.jpg', description: 'Tên file ảnh' })
  @IsString()
  @IsNotEmpty({ message: 'Ảnh không được để trống' })
  image: string;

  @ApiProperty({ example: 'Mô tả chi tiết sản phẩm', description: 'Mô tả', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
