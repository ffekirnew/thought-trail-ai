import { Flex, Heading, ImageProps, SimpleGrid } from '@chakra-ui/react';
import FeatureCard from './FeatureCard';

import fire from '../../assets/fire.svg';
import robot from '../../assets/robot.svg';
import goal from '../../assets/goal.svg';
import journal from '../../assets/journal.svg';
import collections from '../../assets/collections.svg';
import security from '../../assets/security.svg';

export interface FeatureDescription {
  image: ImageProps;
  title: string;
  body: string;
}

const FeaturesGrid = () => {
  const features: FeatureDescription[] = [
    {
      image: {
        src: journal,
        alt: 'Journaling',
      },
      title: 'Journaling',
      body: 'Effortlessly capture and organize your thoughts and experiences.',
    },
    {
      image: {
        src: robot,
        alt: 'AI-Powered Insights',
      },
      title: 'AI-Powered Insights',
      body: 'Gain deep insights and personalized feedback from your journal entries.',
    },
    {
      image: {
        src: collections,
        alt: 'Collections',
      },
      title: 'Collections',
      body: 'Organize your notes into customizable collections for work, projects, or hobbies.',
    },
    {
      image: {
        src: fire,
        alt: 'Interact with Notes',
      },
      title: 'Interact with Notes',
      body: 'Engage with your notes and discover hidden connections, sparking creativity.',
    },
    {
      image: {
        src: goal,
        alt: 'Goal Setting',
      },
      title: 'Goal Setting',
      body: 'Set, track, and receive coaching for your personal and professional goals.',
    },
    {
      image: {
        src: security,
        alt: 'Data Privacy',
      },
      title: 'Data Privacy',
      body: 'Rest easy knowing your data is secure, ensuring the confidentiality of your entries.',
    },
  ];

  return <Flex flexDir={'column'} paddingX={{ base: 10, lg: 40 }} gap={10}>
    <Heading>Features</Heading>
    <SimpleGrid columns={{
      lg: 3,
      md: 2,
      base: 1,
    }}
    gap={5}
    width={'100%'}>
    { features.map((feature, index) => <FeatureCard key={index} feature={feature} />) }
    </SimpleGrid>
  </Flex>
}

export default FeaturesGrid;
