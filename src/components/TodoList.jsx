import React from 'react';
import { useState } from 'react';
import { HStack, VStack, Text, IconButton, StackDivider, Spacer, Badge, Box, Button, CardBody} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { CheckIcon } from '@chakra-ui/icons';
import { Input, Editable, EditableInput, EditableTextarea, EditablePreview,} from '@chakra-ui/react' 

function Todolist({colorMode, todos, deleteTodo, completeTodo, editTodo }) {
    
    const strikThroughColor = colorMode === "light" ? "#C2C5D3" : "#323744";
    const [editedContent, setEditedContent] = useState("");

    function handleSubmit(todoId) {
        if(!editedContent) {
            return 
        } 
        editTodo(todoId, editedContent);
        setEditedContent("")
    }

    if (!todos.length) {
        return (
            <Badge colorScheme="green" p="3" m="4" borderRadius="lg">
                Nothing more to do! YAY!!!
            </Badge>
        )
    }

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
                
                    <Editable
                        defaultValue={todo.body}
                        fontWeight={800}
                        onSubmit={() => handleSubmit(todo.id)}
                        selectAllOnFocus={false}
                        placeholder={!editedContent?  todo.body : null}
                    >
                        <EditablePreview textDecoration={todo.complete? "line-through" : null}/>
                        <EditableInput minW={{base: '40vw', sm: '45vw', lg: '30vw', xl: '25vw'}} value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
                    </Editable>
           
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