interface CoffeeShopSchemaProps {
  name: string;
  averageRating: number;
  reviewCount: number;
  address: string;
}

const CoffeeShopSchema = ({ name, averageRating, reviewCount, address }: CoffeeShopSchemaProps) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating,
      reviewCount,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
  };

  return <script type="application/ld+json">{JSON.stringify(schemaData)}</script>;
};

export default CoffeeShopSchema;
