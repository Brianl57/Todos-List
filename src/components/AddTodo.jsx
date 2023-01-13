import { Button, HStack, Input, useToast } from '@chakra-ui/react'
import React from 'react'
import {useState} from 'react';
import { nanoid } from 'nanoid';


function Addtodo({addTodo}) {

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
        };
        addTodo(todo);
        setContent("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt="8">
                <Input variant="filled" placeholder="Write a todo" value={content} onChange={(e) => setContent(e.target.value)}/>
                <Button colorScheme="pink" px="8" type="submit">Add</Button>
            </HStack>
        </form>
  )
}

export default Addtodo