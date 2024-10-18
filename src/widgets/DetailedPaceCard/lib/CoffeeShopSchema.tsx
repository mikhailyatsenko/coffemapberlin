interface CoffeeShopSchemaProps {
  name: string;
  averageRating: number;
  reviewCount: number;
  address: string;
  image?: string;
}

const CoffeeShopSchema = ({ name, averageRating, reviewCount, address, image }: CoffeeShopSchemaProps) => {
  const schemaData: Record<string, unknown> = {
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

  if (image) {
    schemaData.image = `${window.location.origin}/places-images/${image}`;
  }
  console.log(schemaData.image);
  return <script type="application/ld+json">{JSON.stringify(schemaData)}</script>;
};

export default CoffeeShopSchema;
