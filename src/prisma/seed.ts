import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: 'Laptops' },
      { name: 'Celulares' },
      { name: 'Cocina' },
      { name: 'Herramientas' },
      { name: 'Ropa' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log('Categorias creadas exitosamente');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
