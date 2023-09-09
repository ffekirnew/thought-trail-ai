import { VStack, Text, HStack, Heading, Image, SimpleGrid, Button, Spacer } from '@chakra-ui/react';
import logo from '../../assets/react.svg';
import style from './Hero.module.css';

const Hero = () => {
  return <SimpleGrid columns={2} paddingX={40}>
    <VStack align={'left'}>
      <Heading fontSize={'58px'} fontWeight={'extrabold'}>Astro AI</Heading>
      <Heading fontSize={'58px'} fontWeight={'normal'}>Your companion AI second brain.</Heading>
      <Text fontSize={'24px'} fontWeight={'semibold'}>Get ready for a development environment that can finally catch up with you.</Text>
      <Spacer />
      <HStack paddingY={5}>
        <Button paddingX={5} borderRadius={'full'} variant={'solid'} colorScheme='blue'>Get Started</Button>
        <Button paddingX={5} borderRadius={'full'} variant={'outline'}>Why Astro?</Button>
        <Button paddingX={5} borderRadius={'full'} variant={'outline'}>View on GitHub</Button>
        <Button paddingX={5} borderRadius={'full'} variant={'outline'}>Check my other projects</Button>
      </HStack>
    </VStack>
    <VStack>
      <Image className={style['logo']} src={logo} boxSize={'300px'} />
    </VStack>
    </SimpleGrid>
}

export default Hero
