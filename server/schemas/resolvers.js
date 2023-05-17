const { AuthenticationError } = require('apollo-server-express');
const { User, Message, Event } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        messages: async () => {
            const messages = await Message.find().sort({ createdAt: -1});
            return messages;
        },
        events: async () => {
            const events = await Event.find().sort({ createdAt: -1});
            return events;
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addMessage: async (parent, args) => {
            const message = await Message.create(args);
            
            return message;
        },
        addEvent: async (parent, args) => {
            const event = await Event.create(args);
            return event;
        }
    }
}

module.exports = resolvers;