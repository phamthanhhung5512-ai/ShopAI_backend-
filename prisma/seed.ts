import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Đang gieo mầm dữ liệu (Seed Data)...');

  const hashedPassword = await bcrypt.hash('123456', 10);

  // 1. Seed User Admin
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      name: 'ShopAI Admin',
    },
  });
  console.log('✅ Seed Admin User thành công:', adminUser.email);

  // 2. Seed User Client
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@gmail.com' },
    update: {},
    create: {
      email: 'client@gmail.com',
      password: hashedPassword,
      name: 'Khách Hàng ShopAI',
    },
  });
  console.log('✅ Seed Client User thành công:', clientUser.email);

  // 3. Seed 20 sản phẩm
  const products = [
    {
      id: 'prod_0',
      barcode: 'SHOPAI-PROD-0',
      name: 'Bầu trời hoàng hôn (2h sở hữu)',
      price: 3000000000,
      image: '1.jpg',
      description: 'Trải nghiệm sở hữu 2 giờ ngắm bầu trời hoàng hôn tuyệt đẹp.',
    },
    {
      id: 'prod_1',
      barcode: 'SHOPAI-PROD-1',
      name: 'Tên lửa vũ trụ',
      price: 10000000000,
      image: '2.jpg',
      description: 'Tên lửa vũ trụ thế hệ mới, phục vụ thám hiểm không gian.',
    },
    {
      id: 'prod_2',
      barcode: 'SHOPAI-PROD-2',
      name: 'Rừng',
      price: 500000000000,
      image: '3.jpg',
      description: 'Khu rừng nguyên sinh xanh mát, không khí trong lành.',
    },
    {
      id: 'prod_5',
      barcode: 'SHOPAI-PROD-5',
      name: 'Rubi',
      price: 3990000,
      image: '4.jpeg',
      description: 'Đá quý Rubi tự nhiên lấp lánh sang trọng.',
    },
    {
      id: 'prod_4',
      barcode: 'SHOPAI-PROD-4',
      name: 'Mèo',
      price: 300,
      image: '5.jpg',
      description: 'Chú mèo cưng đáng yêu, ngoan ngoãn.',
    },
    {
      id: 'prod_3',
      barcode: 'SHOPAI-PROD-3',
      name: 'Mèo nhưng đẹp hơn',
      price: 3000,
      image: '6.jpg',
      description: 'Mèo cưng phiên bản đặc biệt cực kỳ xinh xắn.',
    },
    {
      id: 'prod_6',
      barcode: 'SHOPAI-PROD-7',
      name: 'Ferrari 458',
      price: 3000000,
      image: '7.jpg',
      description: 'Siêu xe Ferrari 458 thể thao cao cấp, động cơ mạnh mẽ.',
    },
    {
      id: 'prod_7',
      barcode: 'SHOPAI-PROD-8',
      name: 'Tủ lạnh',
      price: 700,
      image: '8.jpg',
      description: 'Tủ lạnh tiết kiệm điện, dung tích lớn cho gia đình.',
    },
    {
      id: 'prod_8',
      barcode: 'SHOPAI-PROD-9',
      name: 'Lamborghini Modèles Prix',
      price: 4000000,
      image: '7.jpg',
      description: 'Siêu xe Lamborghini thiết kế sang trọng, đẳng cấp thế giới.',
    },
    {
      id: 'prod_9',
      barcode: 'SHOPAI-PROD-10',
      name: 'Balck Uma',
      price: 80000,
      image: '10.jpg',
      description: 'Sản phẩm Balck Uma độc đáo, phong cách hiện đại.',
    },
    {
      id: 'prod_10',
      barcode: 'SHOPAI-PROD-11',
      name: 'Steel ball run',
      price: 100,
      image: '11.jpg',
      description: 'Bộ sưu tập Steel Ball Run ấn tượng.',
    },
    {
      id: 'prod_11',
      barcode: 'SHOPAI-PROD-12',
      name: 'Alaha Rama',
      price: 100000000,
      image: '12.jpg',
      description: 'Bảo vật quý giá Alaha Rama.',
    },
    {
      id: 'prod_12',
      barcode: 'SHOPAI-PROD-13',
      name: 'Porsche 911 Carrera',
      price: 5000000,
      image: '13.jpg',
      description: 'Siêu xe Porsche 911 Carrera huyền thoại.',
    },
    {
      id: 'prod_13',
      barcode: 'SHOPAI-PROD-14',
      name: 'Ultima GTR',
      price: 6000000,
      image: '14.jpg',
      description: 'Siêu xe đua Ultima GTR hiệu năng cực cao.',
    },
    {
      id: 'prod_14',
      barcode: 'SHOPAI-PROD-15',
      name: 'Lốp siêu bền',
      price: 150,
      image: '15.jpg',
      description: 'Bộ lốp xe siêu bền chịu mọi địa hình.',
    },
    {
      id: 'prod_15',
      barcode: 'SHOPAI-PROD-16',
      name: 'Ford Ranger',
      price: 1500000,
      image: '16.jpg',
      description: 'Xe bán tải Ford Ranger mạnh mẽ, đa dụng.',
    },
    {
      id: 'prod_16',
      barcode: 'SHOPAI-PROD-17',
      name: 'BWM En Son',
      price: 7000000,
      image: '17.jpg',
      description: 'Xe sang BMW En Son đời mới nhất.',
    },
    {
      id: 'prod_17',
      barcode: 'SHOPAI-PROD-18',
      name: 'Lamborghini Squadra Corse',
      price: 9000000,
      image: '18.jpg',
      description: 'Siêu xe Lamborghini Squadra Corse đẳng cấp trường đua.',
    },
    {
      id: 'prod_18',
      barcode: 'SHOPAI-PROD-19',
      name: 'Mercedes-Benz S',
      price: 8000000,
      image: '19.jpg',
      description: 'Xe Mercedes-Benz S-Class sang trọng cho doanh nhân.',
    },
    {
      id: 'prod_19',
      barcode: 'SHOPAI-PROD-20',
      name: 'Toyota BZ4X',
      price: 7000000,
      image: '20.jpg',
      description: 'Xe điện thông minh Toyota BZ4X bảo vệ môi trường.',
    },
  ];

  for (const item of products) {
    await prisma.product.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log(`✅ Seed 20 sản phẩm thành công!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed thất bại:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
