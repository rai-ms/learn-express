import prisma from '../src/utils/prisma';

async function main() {
  await prisma.project.create({
    data: {
      title: 'Seeded Project',
      description: 'This project was seeded into the database.',
      imageUrl: '',
      githubUrl: '',
      demoUrl: '',
      tags: ['seed'],
    },
  });
}

main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
