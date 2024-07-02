import { type PropsWithChildren, type FC } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://yatsenko.site/graphql',
  cache: new InMemoryCache(),
});

export const ApolloProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
