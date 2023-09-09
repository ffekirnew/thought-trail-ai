import { Text, VStack, StackDivider, Divider } from "@chakra-ui/react"
import NavBar from "../components/langing-page/NavBar"
import Hero from "../components/langing-page/Hero"
import FeaturesGrid from "../components/langing-page/FeaturesGrid"

const LandingPage = () => {
  return <VStack gap={'80px'} paddingY={5}>
    <NavBar />
    <Hero />
    <FeaturesGrid />
    <Divider borderColor='gray.500'/>
    <VStack as="section" padding={10}>
      <Text fontWeight={'bold'}>Released under the MIT License.</Text>
      <Text fontWeight={'bold'}>Copyright © 2023 - present Fikernew Birhanu</Text>
    </VStack>
  </VStack>
}

export default LandingPage
