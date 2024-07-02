import { type PropsWithChildren, type FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://83.229.84.248:3000/graphql',
  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
