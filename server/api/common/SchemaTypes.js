import * as graphql from 'graphql';

const { GraphQLInt, GraphQLString } = graphql;

export const PaginationArgs = {
  first: { type: GraphQLInt },
  after: { type: GraphQLInt }
};

export const SortingArgs = {
  orderBy: { type: GraphQLString },
  order: { type: GraphQLString }
};

export const PaginationWithSortArgs = {
  ...PaginationArgs,
  ...SortingArgs
};
