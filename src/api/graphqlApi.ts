import { type TypedDocumentString } from "@/gql/graphql";

export async function executeGraphql<TResult, TVariables>({
	query,
	variables,
	headers,
	next,
	cache,
}: {
	query: TypedDocumentString<TResult, TVariables>;
	headers?: HeadersInit;
	next?: NextFetchRequestConfig | undefined;
	cache?: RequestCache;
} & (TVariables extends { [_key: string]: never }
	? { variables?: never }
	: { variables: TVariables })): Promise<TResult> {
	if (!process.env.GRAPHQL_URL) {
		throw TypeError("GRAPHQL_URL is not defined");
	}

	const res = await fetch(process.env.GRAPHQL_URL, {
		method: "POST",
		body: JSON.stringify({
			query,
			variables,
		}),
		next,
		cache,
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
	});
	type GraphqlResponse<T> =
		| { data?: undefined; errors: { message: string }[] }
		| { data: T; errors?: undefined };

	const graphqlResponse = (await res.json()) as GraphqlResponse<TResult>;

	if (graphqlResponse.errors) {
		throw TypeError(`GraphQL Error`, {
			cause: graphqlResponse.errors,
		});
	}

	return graphqlResponse.data;
}
