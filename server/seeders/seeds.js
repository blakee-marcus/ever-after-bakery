const { faker }= require('@faker-js/faker');
const db = require('../config/connection');
const { Message, Event, User } = require('../models');

db.once('open', async () => {
    await Message.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    const userData = {
        username: 'testAdmin',
        email: 'testAdmin@test.com',
        password: 'bestBakery'
    };

    const createdUser = await User.collection.insertOne(userData);

    const messageData =[];

    for (let i = 0; i < 25; i++) {
        const name = faker.name.fullName();
        const email = faker.internet.email(name);
        const message = faker.hacker.phrase();

        messageData.push({ name, email, message});
    }

    const createdMessages = await Message.collection.insertMany(messageData);
    const eventData =[];

    for (let i = 0; i < 25; i++) {
        const title = faker.commerce.productName();
        const eventBody = faker.commerce.productDescription();

        eventData.push({ title, eventBody });
    }

    const createdEvents = await Event.collection.insertMany(eventData);

  console.log('all done!');
  process.exit(0);
});
