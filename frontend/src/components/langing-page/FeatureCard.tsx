import { Heading, Image, Text, VStack, useColorMode } from "@chakra-ui/react"
import { FeatureDescription } from "./FeaturesGrid"

interface Props {
  feature: FeatureDescription
}
const FeatureCard = ({ feature }: Props) => {
  const { colorMode } = useColorMode()
  return (
    <VStack
      cursor={"pointer"}
      width={"100%"}
      background={colorMode == "dark" ? "gray.700" : "gray.200"}
      align={"left"}
      borderRadius={10}
      paddingY={10}
      paddingX={5}
      _hover={{
        transform: "scale(1.01)",
      }}
    >
      <Image src={feature.image.src} boxSize={"50px"} />
      <Heading as="h3" fontSize={"xl"}>
        {feature.title}
      </Heading>
      <Text fontSize={"md"} colorScheme="gray">
        {feature.body}
      </Text>
    </VStack>
  )
}

export default FeatureCard
