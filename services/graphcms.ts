import { GraphQLClient, gql } from 'graphql-request';

const ApiUrl = process.env.VITE_API_URL;

if (!ApiUrl) {
  throw new Error('A variável de ambiente não está definida');
}

export const graphcms = new GraphQLClient(ApiUrl);

export const EDITAIS_QUERY = gql`
  query Editais {
    editalConnection {
      edges {
        node {
          createdAt
          excerpt
          id
          slug
          title
          updatedAt
          content {
            text
            markdown
          }
        }
      }
    }
  }
`;

export const POSTS_QUERY = gql`
  query Posts($categoryName: String!) {
    postsConnection(
      where: { categories_some: { name_contains: $categoryName } }
    ) {
      edges {
        node {
          author {
            bio
            name
            id
            photoProfile {
              url
            }
          }
          createdAt
          updatedAt
          excerpt
          slug
          title
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
          content {
            text
            markdown
          }
        }
      }
    }
  }
`
