/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetList($skip: Int, $first: Int) {\n  categories(skip: $skip, first: $first) {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetListDocument,
    "query ProductsByCategoryId($id: ID!, $first: Int, $skip: Int) {\n  category(where: {id: $id}) {\n    id\n    name\n    products(first: $first, skip: $skip) {\n      id\n      name\n      description\n      price\n      images {\n        id\n        url\n      }\n    }\n  }\n}": types.ProductsByCategoryIdDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetSingleById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    createdAt\n    images {\n      id\n      url\n      size\n    }\n    price\n    slug\n    reviews {\n      content\n      createdAt\n      email\n      headline\n      name\n      id\n      rating\n    }\n    categories {\n      id\n      name\n      slug\n    }\n    productSizeVariants {\n      id\n      name\n      stock\n      size\n    }\n    productColorVariant {\n      color\n      id\n      name\n    }\n    sound {\n      id\n      mimeType\n      url\n      fileName\n    }\n  }\n}": types.ProductGetSingleByIdDocument,
    "query ProductsByName($name: String!) {\n  products(where: {name_contains: $name}) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      id\n      name\n    }\n  }\n}": types.ProductsByNameDocument,
    "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    id\n    name\n    description\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}": types.ProductsGetListDocument,
    "mutation ReviewCreate($id: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $id}}}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
    "query ReviewGetByProductId($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}, orderBy: createdAt_ASC) {\n    edges {\n      node {\n        ...ReviewItem\n      }\n    }\n  }\n}": types.ReviewGetByProductIdDocument,
    "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    ...ReviewItem\n  }\n}": types.ReviewPublishDocument,
    "fragment ReviewItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  createdAt\n  rating\n}": types.ReviewItemFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetList($skip: Int, $first: Int) {\n  categories(skip: $skip, first: $first) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsByCategoryId($id: ID!, $first: Int, $skip: Int) {\n  category(where: {id: $id}) {\n    id\n    name\n    products(first: $first, skip: $skip) {\n      id\n      name\n      description\n      price\n      images {\n        id\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsByCategoryIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    categories(first: 1) {\n      name\n    }\n    images(first: 1) {\n      url\n    }\n    price\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetSingleById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    createdAt\n    images {\n      id\n      url\n      size\n    }\n    price\n    slug\n    reviews {\n      content\n      createdAt\n      email\n      headline\n      name\n      id\n      rating\n    }\n    categories {\n      id\n      name\n      slug\n    }\n    productSizeVariants {\n      id\n      name\n      stock\n      size\n    }\n    productColorVariant {\n      color\n      id\n      name\n    }\n    sound {\n      id\n      mimeType\n      url\n      fileName\n    }\n  }\n}"): typeof import('./graphql').ProductGetSingleByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsByName($name: String!) {\n  products(where: {name_contains: $name}) {\n    id\n    name\n    description\n    price\n    images {\n      url\n    }\n    categories {\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductsByNameDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    id\n    name\n    description\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($id: ID!, $headline: String!, $name: String!, $email: String!, $content: String!, $rating: Int!) {\n  createReview(\n    data: {headline: $headline, name: $name, email: $email, content: $content, rating: $rating, product: {connect: {id: $id}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ReviewGetByProductId($id: ID!) {\n  reviewsConnection(where: {product: {id: $id}}, orderBy: createdAt_ASC) {\n    edges {\n      node {\n        ...ReviewItem\n      }\n    }\n  }\n}"): typeof import('./graphql').ReviewGetByProductIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewPublish($id: ID!) {\n  publishReview(where: {id: $id}, to: PUBLISHED) {\n    ...ReviewItem\n  }\n}"): typeof import('./graphql').ReviewPublishDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ReviewItem on Review {\n  id\n  name\n  headline\n  email\n  content\n  createdAt\n  rating\n}"): typeof import('./graphql').ReviewItemFragmentDoc;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
