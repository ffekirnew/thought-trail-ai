import { Text, VStack, Divider } from "@chakra-ui/react"
import NavBar from "../components/langing-page/NavBar"
import Hero from "../components/langing-page/Hero"
import FeaturesGrid from "../components/langing-page/FeaturesGrid"

const LandingPage = () => {
  return (
    <VStack gap={"80px"} paddingY={5}>
      <NavBar />
      <Hero />
      <FeaturesGrid />
      <Divider borderColor="gray.500" />
      <VStack as="section">
        <Text fontWeight={"bold"}>Released under the MIT License.</Text>
        <Text fontWeight={"bold"}>
          Copyright © Fikernew Birhanu (2023 - present).
        </Text>
      </VStack>
    </VStack>
  )
}

export default LandingPage
