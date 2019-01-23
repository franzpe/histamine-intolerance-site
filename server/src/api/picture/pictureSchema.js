import * as graphql from 'graphql';

const { GraphQLObjectType, GraphQLString } = graphql;

export const PictureType = new GraphQLObjectType({
  name: 'Picture',
  fields: () => ({
    id: { type: GraphQLString },
    filename: { type: GraphQLString },
    mimetype: { type: GraphQLString },
    path: { type: GraphQLString },
    url: {
      type: GraphQLString,
      resolve(parent, _, { url }) {
        return parent.path && `${url}/${parent.path}`;
      }
    }
  })
});
