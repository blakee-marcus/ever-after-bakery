import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation Mutation($name: String!, $email: String!, $message: String!) {
    addMessage(name: $name, email: $email, message: $message) {
      _id
      email
      name
      message
    }
  }
`;

export const ADD_EVENT = gql`
  mutation Mutation($title: String!, $eventBody: String!) {
    addEvent(title: $title, eventBody: $eventBody) {
      _id
      title
      eventBody
      createdAt
    }
  }
`;
