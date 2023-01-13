import React from 'react';
import { HStack, VStack, Text, IconButton, StackDivider, Spacer, Badge, Box } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';

function Todolist({colorMode, todos, deleteTodo, completeTodo }) {

    if (!todos.length) {
        return (
            <Badge colorScheme="green" p="3" m="4" borderRadius="lg">
                Nothing more to do! YAY!!!
            </Badge>
        )
    }

    const strikThroughColor = colorMode === "light" ? "#C2C5D3" : "#323744";

  return (
    <VStack 
        divider={<StackDivider />} 
        borderColor="gray.100" 
        borderWidth="2px"
        p="4"
        borderRadius="lg"
        w="100%"
        maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}}
        alignItems="stretch"
    > 
        {todos.map(todo => (
        
            <HStack 
                p={2} 
                borderRadius={8} 
                color={todo.complete? strikThroughColor : null }
                key={todo.id}
            >
                <Text 
                    fontWeight={800} 
                    decoration={todo.complete? "line-through" : null} 
                >&#x2022; {todo.body}</Text>
                <Spacer />
                <IconButton
                    icon={<CheckIcon/>}
                    variant="unstyled"
                    isRound={true}
                    size="sm"
                    onClick={() => completeTodo(todo.id)}
                />
                <IconButton 
                    icon={<FaTrash />} 
                    isRound={true} 
                    variant="unstyled"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                />
            </HStack>
       
        ))}
    </VStack>
  )
}

export default Todolist