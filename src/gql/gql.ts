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
    "query ProductGetSingleById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    createdAt\n    images {\n      id\n      url\n      size\n    }\n    price\n    slug\n    reviews {\n      content\n      createdAt\n      email\n      headline\n      name\n      id\n      rating\n    }\n    categories {\n      id\n      name\n      slug\n    }\n    productSizeVariants {\n      id\n      name\n      stock\n    }\n    productColorVariant {\n      color\n      id\n      name\n    }\n  }\n}": types.ProductGetSingleByIdDocument,
    "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    id\n    name\n    description\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}": types.ProductsGetListDocument,
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
export function graphql(source: "query ProductGetSingleById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    name\n    description\n    createdAt\n    images {\n      id\n      url\n      size\n    }\n    price\n    slug\n    reviews {\n      content\n      createdAt\n      email\n      headline\n      name\n      id\n      rating\n    }\n    categories {\n      id\n      name\n      slug\n    }\n    productSizeVariants {\n      id\n      name\n      stock\n    }\n    productColorVariant {\n      color\n      id\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductGetSingleByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($first: Int, $skip: Int) {\n  products(first: $first, skip: $skip) {\n    id\n    name\n    description\n    price\n    categories {\n      name\n    }\n    images {\n      url\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
