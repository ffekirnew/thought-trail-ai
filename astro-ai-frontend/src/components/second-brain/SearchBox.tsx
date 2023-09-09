import { Input, InputGroup, InputRightElement, Kbd } from '@chakra-ui/react'
import { useRef } from 'react'
import { BsChevronDown, BsSearch } from 'react-icons/bs'


const SearchBox = () => {
  const searchBoxRef = useRef<HTMLInputElement>(null)

  return <form onSubmit={(event) => {
      event.preventDefault()
      // use the search
    }}>
    <InputGroup>
      <Input ref={searchBoxRef} placeholder='Search anything from what you know...' borderRadius={10} variant={'filled'}/>
      <InputRightElement width={'7rem'} justifyContent={'center'} alignItems={'center'}>
        <span><Kbd>CTRL</Kbd> + <Kbd>K</Kbd></span>
      </InputRightElement>
    </InputGroup> 
  </form>
  
}

export default SearchBox
