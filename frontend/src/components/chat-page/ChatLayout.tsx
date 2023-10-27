import { Grid, GridItem, Show } from "@chakra-ui/react"
import SideBar from "./SideBar"
import NavBar from "./NavBar"
import { ReactNode } from "react"

interface Props {
  body: ReactNode
  chatBox: ReactNode
}
const ChatLayout = ({ body, chatBox }: Props) => {
  return (
    <Grid
      templateAreas={`"sidebar topbar"
                    "sidebar body"
                    "sidebar chatbox"`}
      templateColumns={{
        base: "1fr",
        lg: "280px 1fr",
      }}
      templateRows={{
        lg: "50px auto 60px",
      }}
      width={"100vw"}
      height={"100vh"}
      gap={5}
      padding={3}
    >
      <Show above="lg">
        <GridItem area="sidebar">
          <SideBar />
        </GridItem>
      </Show>
      <GridItem area="topbar">
        <NavBar />
      </GridItem>
      <GridItem area="body" overflowY={"scroll"} className="scrollable">
        {body}
      </GridItem>
      <GridItem area="chatbox">{chatBox}</GridItem>
    </Grid>
  )
}

export default ChatLayout
