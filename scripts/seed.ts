const { PrismaClient } = require("@prisma/client");

// Create a new instance of PrismaClient to connect to the database
const database = new PrismaClient();

// Define an async function named "main" to seed the database
async function main() {
  try {
     // Create multiple category records in the database
    await database.category.createMany({
      data: [
        // Define data for each category to be added
        { name: "Communication Skills" },
        { name: "Teamwork" },
        { name: "Problem-solving" },
        { name: "Time Management" },
        { name: "Leadership" },
        { name: "Emotional Intelligence" },
        { name: "Networking" },
      ]
    });
    // Log a success message if categories are successfully created
    console.log("Success");
  } catch (error) {
    // Log an error message if there is an error while seeding the categories
    console.log("Error seeding the database categories!", error);
  } finally {
    // Disconnect from the database after seeding is done or in case of error
    await database.$disconnect();
  }
}

// Call the main function to start seeding the database
main();