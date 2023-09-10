import { VStack, Text, HStack, Heading, Image, Grid, Button, Spacer, GridItem } from '@chakra-ui/react';
import logo from '../../assets/logo.svg';
import style from './Hero.module.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return <Grid 
    templateAreas={{
      lg: `"introduction logo"`,
      base: `"logo" "introduction"`
    }}
    templateColumns={{
      lg: "2fr 1fr",
      base: "1fr"
    }}
    paddingX={{ base: 10, lg: 40 }}
    gap={5}
  >
    <GridItem area={'introduction'}><VStack align={'left'} textAlign={{ base: 'center', md: 'left'}}>
      <Heading fontSize={'58px'} fontWeight={'extrabold'}>ThoughtTrail</Heading>
      <Heading fontSize={'58px'} fontWeight={'normal'}>Your companion AI second brain.</Heading>
      <Text fontSize={'24px'} fontWeight={'semibold'}>Get advantage by using an AI tool specifically designed to help you achieve more!</Text>
      <Spacer />
      <HStack paddingY={5}>
        <Button onClick={() => navigate('/auth/register')} paddingX={5} borderRadius={'full'} variant={'solid'} background={'brand.primary'}>Get Started</Button>
        <Button paddingX={5} borderRadius={'full'} variant={'outline'}>Why ThoughtTrail?</Button>
        <Button onClick={() => navigate('https://github.com/ffekirnew')} paddingX={5} borderRadius={'full'} variant={'outline'}>View on GitHub</Button>
      </HStack>
    </VStack></GridItem>
    <GridItem area={'logo'}><VStack>
      <Image className={style['logo']} src={logo} boxSize={{ base: '300px', lg: '400px' }} />
    </VStack></GridItem>
    </Grid>
}

export default Hero
