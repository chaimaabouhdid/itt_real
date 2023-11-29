const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Communication Skills" },
        { name: "Teamwork" },
        { name: "Problem-solving" },
        { name: "Time Management" },
        { name: "Leadership" },
        { name: "Emotional Intelligence" },
        { name: "Networking" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories!", error);
  } finally {
    await database.$disconnect();
  }
}

main();