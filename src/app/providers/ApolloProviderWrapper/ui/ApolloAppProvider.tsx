import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { type PropsWithChildren, type FC } from 'react';

const httpLink = createHttpLink({
  uri: process.env.VITE_ENV === 'development' ? 'http://localhost:3000/coffee' : 'https://yatsenko.site/coffee',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
