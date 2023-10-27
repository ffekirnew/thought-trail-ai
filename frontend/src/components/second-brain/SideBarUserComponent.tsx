import avatar from "../../assets/user_avatar.png"
import {
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarBadge,
  Menu,
  Button,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
} from "@chakra-ui/react"
import { User } from "../../services/authClient"
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { useGetUser } from "../../hooks/auth"

const SideBarUserComponent = () => {
  const navigate = useNavigate()
  const user: User = useGetUser()
  const { colorMode } = useColorMode()

  const onLogout = () => {
    navigate("/")
  }

  return (
    <HStack
      bg={colorMode === "dark" ? "gray.700" : "gray.200"}
      padding={5}
      gap={5}
      justifyContent={"center"}
    >
      <Avatar src={avatar} size={"sm"}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <VStack align={"left"} gap={0}>
        <Text>{user.name[0].toUpperCase() + user.name.slice(1)}</Text>
        <Text color={colorMode === "dark" ? "gray.300" : "gray.600"}>
          @{user.username}
        </Text>
      </VStack>
      <Spacer />
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BsThreeDots />}
          variant={"ghost"}
          justifyContent={"center"}
        />
        <MenuList>
          <MenuItem onClick={onLogout}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  )
}

export default SideBarUserComponent
