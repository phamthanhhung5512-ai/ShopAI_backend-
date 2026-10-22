import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
    try {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await this.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
          email: 'admin@gmail.com',
          password: hashedPassword,
          name: 'ShopAI Admin',
        },
      });
      await this.user.upsert({
        where: { email: 'client@gmail.com' },
        update: {},
        create: {
          email: 'client@gmail.com',
          password: hashedPassword,
          name: 'Khách Hàng ShopAI',
        },
      });
      console.log('✅ Auto-seeded default users (admin@gmail.com, client@gmail.com)');
    } catch (e) {
      console.log('⚠️ Auto-seed skipped or database not yet migrated:', e.message);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
