import { gql } from '@apollo/client';

export const QUERY_MESSAGES = gql`
  query Query {
    messages {
      _id
      name
      email
      message
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_EVENTS = gql`
  query Query {
    events {
      _id
      title
      eventBody
      createdAt
    }
  }
`;
