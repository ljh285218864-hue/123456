import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';
import { generateOfficialAccountSeeds } from '../lib/official-accounts';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_BOOTSTRAP_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'change-this-before-use';
  const adminHash = await hashPassword(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash: adminHash,
      nickname: '超级管理员',
      role: 'SUPER_ADMIN',
      invitationCode: 'ADMIN001',
      memberStatus: 'BRONZE_ACTIVE',
      memberLevel: 'BRONZE'
    }
  });

  const productSeeds = [
    ['Home Organizer Set', 'HM-001', 'Curated organizer set for daily home storage.'],
    ['Kitchen Storage Rack', 'KT-002', 'A practical rack for kitchen and pantry organization.'],
    ['Daily Cleaning Kit', 'CL-003', 'Useful cleaning essentials for everyday routines.'],
    ['Bathroom Essentials Pack', 'BT-004', 'Simple bathroom accessories for daily use.'],
    ['Laundry Helper Set', 'LD-005', 'Helpful laundry tools for home living.'],
    ['Smart Living Bundle', 'SL-006', 'Everyday products selected for modern home life.']
  ];

  for (const [title, sku, description] of productSeeds) {
    await prisma.product.upsert({
      where: { sku },
      update: { title, description, priceCents: 5900, inventory: 100, isActive: true },
      create: { title, sku, description, priceCents: 5900, inventory: 100, isActive: true }
    });
  }

  const products = await prisma.product.findMany({ take: 6 });
  const officials = generateOfficialAccountSeeds(10);
  const officialHash = await hashPassword(process.env.OFFICIAL_ACCOUNT_PASSWORD || 'change-this-before-use');

  for (const seed of officials) {
    const user = await prisma.user.upsert({
      where: { email: seed.email },
      update: {},
      create: {
        email: seed.email,
        passwordHash: officialHash,
        nickname: seed.nickname,
        invitationCode: seed.invitationCode,
        isOfficial: true,
        memberStatus: 'BRONZE_ACTIVE',
        memberLevel: 'BRONZE'
      }
    });

    const storefront = await prisma.storefront.upsert({
      where: { ownerId: user.id },
      update: { title: seed.title, bio: seed.bio, isActive: true, isRecommendable: true },
      create: { ownerId: user.id, title: seed.title, bio: seed.bio, isActive: true, isRecommendable: true }
    });

    for (const product of products) {
      await prisma.storefrontProduct.upsert({
        where: { storefrontId_productId: { storefrontId: storefront.id, productId: product.id } },
        update: {},
        create: { storefrontId: storefront.id, productId: product.id }
      });
    }
  }

  console.log({ admin: admin.email, officialAccounts: officials.length, products: products.length });
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
