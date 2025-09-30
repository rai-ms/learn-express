import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  
  // Check if the project already exists to avoid duplicates
  const existingProject = await prisma.project.findFirst({
    where: { title: 'Seeded Project' }
  });

  if (!existingProject) {
    console.log('Creating seed project...');
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
    console.log('Seed project created successfully!');
  } else {
    console.log('Seed project already exists, skipping creation.');
  }
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding complete!');
    await prisma.$disconnect();
    process.exit(0);
  });
