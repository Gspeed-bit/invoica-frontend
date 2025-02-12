// lib/graphql-client.ts
import { getAuthToken } from './helpers';
import { authStoreActions } from '@/store/auth';
import keys from './keys';

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

export async function gqlClient<T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>,
  headers: Record<string, string> = {}
): Promise<{ data?: T; error?: string }> {
  try {
    const authToken = getAuthToken();
    const res = await fetch(keys().serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    });

    const responseJson = await res.json();
    console.log('GraphQL Response:', responseJson); // ✅ Debugging response

    const { data, errors }: GraphQLResponse<T> = responseJson;

    if (errors) {
      const errorMessage = errors[0]?.message || 'Unknown GraphQL error';

      if (
        errorMessage.includes('Unauthorized') &&
        typeof window !== 'undefined'
      ) {
        await authStoreActions.logout();
        window.location.href = '/auth/login';
      }

      return { data: undefined, error: errorMessage }; // ✅ Ensure `data` is always defined
    }

    return { data };
  } catch (error) {
    console.error('Network error:', error);
    return { data: undefined, error: 'Network request failed' };
  }
}
