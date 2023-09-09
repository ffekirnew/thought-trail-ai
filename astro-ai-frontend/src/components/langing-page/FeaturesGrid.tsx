import { ImageProps, SimpleGrid } from '@chakra-ui/react';
import FeatureCard from './FeatureCard';

export interface FeatureDescription {
  image: ImageProps;
  title: string;
  body: string;
}

const FeaturesGrid = () => {
  const features: FeatureDescription[] = [
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 1',
      },
      title: 'Feature 1',
      body: 'Feature 1 body',
    },
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 2',
      },
      title: 'Feature 2',
      body: 'Feature 2 body',
    },
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 3',
      },
      title: 'Feature 3',
      body: 'Feature 3 body',
    },
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 1',
      },
      title: 'Feature 4',
      body: 'Feature 4 body',
    },
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 2',
      },
      title: 'Feature 5',
      body: 'Feature 5 body',
    },
    {
      image: {
        src: 'https://via.placeholder.com/150',
        alt: 'Feature 3',
      },
      title: 'Feature 6',
      body: 'Feature 6 body',
    },
  ];
  return <SimpleGrid columns={3} gap={5} width={'100%'} paddingX={40}>
    { features.map((feature, index) => <FeatureCard key={index} feature={feature} />) }
  </SimpleGrid>
}

export default FeaturesGrid;
