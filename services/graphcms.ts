import { GraphQLClient, gql } from 'graphql-request'

const ApiUrl = process.env.NEXT_PUBLIC_GRAPHCMS_URL

if (!ApiUrl) {
  throw new Error('A variável de ambiente não está definida')
}

export const graphcms = new GraphQLClient(ApiUrl)

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
          attachments {
            fileName
            size
            url(transformation: { document: { output: { format: png } } })
          }
        }
      }
    }
  }
`

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

export const MEMBROS_QUERY = gql`
  query MyQuery {
    membersConnection(first: 100) {
      edges {
        node {
          ativo
          cargo
          createdAt
          cvLattes
          fotoPerfil {
            url
          }
          nome
        }
      }
    }
  }
`

export const GALERIA_QUERY = gql`
  query MyQuery {
    galeriasConnection(first: 100) {
      edges {
        node {
          fotoschapter {
            url
          }
          identificador
        }
      }
    }
  }
`

export const EDITAL_BY_SLUG_QUERY = gql`
  query Editais($slug: String!) {
    editalConnection(where: { slug: $slug }) {
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
          attachments {
            fileName
            size
            url(transformation: { document: { output: { format: png } } })
          }
        }
      }
    }
  }
`
