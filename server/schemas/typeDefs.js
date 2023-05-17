const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Message {
    _id: ID
    name: String
    email: String
    message: String
    createdAt: String
  }

  type Event {
    _id: ID
    title: String
    eventBody: String
    createdAt: String
  }

  type User {
    _id: ID
    username: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    messages: [Message]
    events: [Event]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMessage(name: String!, email: String!, message: String!): Message
    addEvent(title: String!, eventBody: String!): Event
  }
`;

module.exports = typeDefs;
