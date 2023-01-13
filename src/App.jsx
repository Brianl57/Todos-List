import React from "react";
import Todolist from "./components/TodoList";
import Addtodo from "./components/AddTodo";
import { Heading, Spacer } from '@chakra-ui/react';
import { VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
 
function App() {

  const initialTodos = [
    {
        id: 1,
        body: "Write something ",
    },
    {
        id: 2,
        body: "get butter",
    
    }
  ]

  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  })

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => {
      return todo.id !== id;
    }) 
    setTodos(newTodos); 
  }

  function addTodo(todo) {
    setTodos([...todos, todo])
  }

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <VStack p={4}>
      <IconButton 
        icon={colorMode === "light" ? <FaSun  /> : <FaMoon />} 
        isRound={true} 
        size="lg" 
        alignSelf="flex-end" 
        onClick={toggleColorMode} 
      />
      <Heading 
        m="8" 
        p={1} 
        fontWeight="extrabold" 
        size="2xl" 
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)" 
        bgClip="text"
      >My Todo's</Heading>
      <Addtodo addTodo={addTodo}/>
      <Spacer />
      <Todolist todos={todos} deleteTodo={deleteTodo}/>
    </VStack>
  )
}

export default App
