import {
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Show,
} from "@chakra-ui/react"
import { useRef } from "react"

const SearchBox = () => {
  const searchBoxRef = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        // use the search
      }}
    >
      <InputGroup outline={"brand.primary"}>
        <Input
          ref={searchBoxRef}
          placeholder="Search anything from what you know..."
          borderRadius={10}
          variant={"filled"}
        />
        <Show above={"lg"}>
          <InputRightElement
            width={"7rem"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <span>
              <Kbd>CTRL K</Kbd>
            </span>
          </InputRightElement>
        </Show>
      </InputGroup>
    </form>
  )
}

export default SearchBox
