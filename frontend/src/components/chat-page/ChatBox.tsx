import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import useChatStore, { Chat } from '../../state/useChatStore';
import { BiSend } from 'react-icons/bi';

const schema = z.object({
  chat: z.string().min(1)
});

type ChatSchema = z.infer<typeof schema>

const ChatBox = () => {
  const {register, handleSubmit, reset} = useForm<ChatSchema>({ resolver: zodResolver(schema) });
  const addChat = useChatStore(s => s.addChat);

  const onSend = (data: FieldValues) => {
    const userChat: Chat = { sender: 'user', body: data.chat }
    const botChat: Chat = { sender: 'bot', body: data.chat }
    addChat(userChat);
    addChat(botChat);
    reset();
  }

  return <form onSubmit={handleSubmit(onSend)}>
    <InputGroup size={'lg'} borderRadius={10} overflow={'none'} alignItems={'center'}>
      <Input
        {...register('chat')}
        outlineColor={'transparent'}
        variant={'filled'}
        placeholder='Send a message'
        resize={'none'}
      />
      <InputRightElement width={'3.5rem'} marginX={'0rem'}>
        <Button type={'submit'} variant={'outline'} size={'sm'}><BiSend /></Button>
      </InputRightElement>
    </InputGroup>
  </form>
}

export default ChatBox;
