import { Grid, GridItem, Show, VStack } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import SideBar from "../../components/second-brain/SideBar"
import NavBar from "../../components/second-brain/NavBar"

const SecondBrainPage = () => {
  return <Grid
    templateAreas={{
      lg: `"aside navbar"
             "aside main"`,
      base: `"navbar"
           "main"`
    }}
    templateColumns={{
      base: "1fr",
      lg: "300px auto"
    }}
    templateRows={"60px auto"}
    gap={5}
    paddingX={5}
    height={'100vh'}
  >
    <Show above="lg">
      <GridItem area={'aside'}>
        <SideBar />
      </GridItem>
    </Show>
    <GridItem area={'navbar'}>
      <NavBar />
    </GridItem>
    <GridItem area={'main'} overflowY={'scroll'}>
      <Outlet />
    </GridItem>
  </Grid>
}

export default SecondBrainPage
