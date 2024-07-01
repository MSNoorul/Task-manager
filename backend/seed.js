require('dotenv').config();
const User = require('./models/User');
const Task = require('./models/Task');
const bcrypt = require('bcrypt');
const sequelize = require('./config/db');


const users = [
    {
        username: 'admin',
        email: 'admin@localhost',
        password: 'admin',
        role: 'admin',
    },
    {
        username: 'Abdul',
        email: 'abdul@localhost',
        password: 'abdul123',
        role: 'manager',
    },
    {
        username: 'Noorul',
        email: 'noorul@localhost',
        password: 'noorul123',
        role: 'user',
    },
    {
        username: 'Muneeb',
        email: 'muneeb@localhost',
        password: 'muneeb123',
        role: 'manager',
    },
    {
        username: 'Sami',
        email: 'sami@localhost',
        password: 'sami123',
        role: 'user',
    },
    {
        username: 'Ahmed',
        email: 'ahmed@localhost',
        password: 'ahmed123',
        role: 'user',
    },
];

const tasks = [
    {
        title: 'Task 1',
        description: 'Task 1 description',
        assigneeId: 1

    },
    {
        title: 'Task 2',
        description: 'Task 2 description',
        assigneeId: 2
    },
    {
        title: 'Task 3',
        description: 'Task 3 description',
        assigneeId: 3
    },
    {
        title: 'Task 4',
        description: 'Task 4 description',
        assigneeId: 4
    },
    {
        title: 'Task 5',
        description: 'Task 5 description',
        assigneeId: 5
    }
];


const seed = async () => {
    try {
    
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await User.create(user);
        }

        await Task.bulkCreate(tasks);
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Sync database (optional, drops tables and re-creates)
    await seed(); // Seed users
    // Add more seed functions as needed (e.g., seedTasks)

    console.log('Database seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

