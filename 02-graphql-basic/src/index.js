import { GraphQLServer } from 'graphql-yoga';

// type definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`;

// resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is the first query!';
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is up'));
