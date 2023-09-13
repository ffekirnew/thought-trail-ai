import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import { FeatureDescription } from './FeaturesGrid'

interface Props {
  feature: FeatureDescription
}
const FeatureCard = ({ feature }: Props) => {
  return <VStack width={'100%'} background={'gray.600'} align={'left'} borderRadius={10} paddingY={10} paddingX={5} _hover={{
      transform: 'scale(1.01)'
    }}>
    <Image src={feature.image.src} boxSize={'50px'} />
    <Heading as="h3" fontSize={'xl'}>{feature.title}</Heading>
    <Text fontSize={'md'} colorScheme='gray'>{feature.body}</Text>
  </VStack>
}

export default FeatureCard
