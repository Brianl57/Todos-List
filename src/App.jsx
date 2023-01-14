import React from "react";
import Todolist from "./components/TodoList";
import Addtodo from "./components/AddTodo";
import { Heading, Input, Spacer, useToast } from '@chakra-ui/react';
import { VStack, IconButton, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
 
function App() {
  
  const exampleTodos = [
    {
      id: 1,
      body: "Practice my instrument.",
      complete: false,
    },
    {
      id: 2,
      body: "Slept for at least 4 hours.",
      complete: false,
    },
    {
      id: 3,
      body: "Buy boba from Sunright Tea Studio.",
      complete: true,
    },
    {
      id: 4,
      body: "Check TikTok content.",
      complete: true,
    },
    {
      id: 5,
      body: "Play with Mocha.",
      complete: true,
    }
  ];

  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || exampleTodos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },)

  function filterCompleted(todo) {
    const completedTodos = todo.filter(todo => todo.complete === true)
    const uncompletedTodos = todo.filter(todo => todo.complete === false)
    return [...uncompletedTodos, ...completedTodos ]
  }  

  function deleteTodo(id) {
    const newTodos = todos.filter(todo => {
      return todo.id !== id;
    }) 
    setTodos(newTodos); 
  }

  function addTodo(todo) {
    setTodos([todo, ...todos]);
  }

  function editTodo(todoId, editedContent) {
    const editedTodos = todos.map(todo => todo.id === todoId? { ...todo,body: editedContent} : todo);
    setTodos(editedTodos);
    console.log("edit function ran")
  }

  function completeTodo(id) {    
    var updatedTodos = [];
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        let updatedTodo = {
          ...todos[i],
          complete: !todos[i].complete
        }
        updatedTodos.push(updatedTodo)
      } else {
        updatedTodos.push(todos[i])
      }
    }
    setTodos(filterCompleted(updatedTodos));
    
  }

  function toggleAll() {
    var updatedTodos = [];

    const allComplete = (todo) => todo.complete === true;
    const notAllComplete = (todo) => todo.complete === false;

    const toggleAll = (todos) => {
      for (var i = 0; i < todos.length; i++) {
        updatedTodos.push(
          {
          ...todos[i],
          complete: !todos[i].complete
          }
        )
      }
    }

    if (todos.every(allComplete) || todos.every(notAllComplete)) {
      toggleAll(todos)
    } else {
      for (var i = 0; i < todos.length; i++) {
        if (!todos[i].complete) {
          updatedTodos.push({
          ...todos[i],
          complete: !todos[i].complete
        })} else {
          updatedTodos.push(todos[i])
        }  
      }
    }
    setTodos(updatedTodos)
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
      <Addtodo addTodo={addTodo} toggleAll={toggleAll}/>
      <Spacer />
      <Todolist colorMode={colorMode} todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} editTodo={editTodo}/>
    </VStack>
  )
}

export default App
