import { GraphQLServer } from 'graphql-yoga';

// type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is the first query!';
    },
    name() {
      return 'Dustin';
    },
    location() {
      return 'Sydney';
    },
    bio() {
      return `I'm a dog`;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is up')); // eslint-disable-line
