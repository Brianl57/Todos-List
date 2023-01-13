import { Button, HStack, Input, useToast, IconButton, Icon, Spacer } from '@chakra-ui/react'
import React from 'react'
import {useState} from 'react';
import { nanoid } from 'nanoid';
import { BsCheckAll } from 'react-icons/bs';


function Addtodo({addTodo, toggleAll}) {

    const toast = useToast()
    
    const [content, setContent] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        if(!content) {
            toast({
                title: 'No content.',
                status: 'error',
                duration: 1200,
                isClosable: true,
              });
            return;
        }
        const todo = {
            id: nanoid(),
            body: content,
            complete: false,
        };
        addTodo(todo);
        setContent("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt="8">
                <Input variant="filled" placeholder="Write something to do." value={content} onChange={(e) => setContent(e.target.value)}/>
                <Button colorScheme="pink" px="8" type="submit">Add</Button>
                
                <IconButton 
                    icon={<BsCheckAll />}
                    variant="outline"
                    size="md"
                    onClick={toggleAll}
                    colorScheme="pink"
                />
            </HStack>
        </form>
  )
}

export default Addtodo