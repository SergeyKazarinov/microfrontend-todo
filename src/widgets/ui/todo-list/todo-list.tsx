import { ChangeEvent, FC, FormEvent, memo, useEffect, useMemo, useState } from 'react'
import { Accordion, Button, ButtonGroup, Form, Stack, ToggleButton } from 'react-bootstrap'
import { TodoCard } from '../../../shared/ui/todo-card'
import { ITodoData } from '../../../shared/utils/todoData'

export let todoData: ITodoData[] = [
  {
    id: 1,
    title: 'Todo 1',
    completed: true,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: false,
  },
  {
    id: 3,
    title: 'Todo 3',
    completed: false,
  },
  {
    id: 4,
    title: 'Todo 4',
    completed: false,
  },
]

enum FilteredButtonEnum {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

const filteredButton = [
  {
    id: 1,
    value: FilteredButtonEnum.ALL,
  },
  {
    id: 2,
    value: FilteredButtonEnum.ACTIVE,
  },
  {
    id: 3,
    value: FilteredButtonEnum.COMPLETED,
  },
]

interface TodoListProps {}

const TodoList: FC<TodoListProps> = () => {
  const [todos, setTodos] = useState(todoData)
  const [filteredTodos, setFilteredTodos] = useState(todos)
  const [buttonValue, setButtonValue] = useState(FilteredButtonEnum.ALL)
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    switch (buttonValue) {
      case FilteredButtonEnum.ALL:
        setFilteredTodos(todos)
        break
      case FilteredButtonEnum.ACTIVE:
        setFilteredTodos(todos.filter((item) => !item.completed))
        break
      case FilteredButtonEnum.COMPLETED:
        setFilteredTodos(todos.filter((item) => item.completed))
        break

      default:
        setFilteredTodos(todos)
    }
  }, [buttonValue])

  const handleClick = (todo: ITodoData, checked: boolean) => {
    const newTodoData = todos.map((todoItem) => {
      if (todoItem.id === todo.id) {
        return {
          ...todoItem,
          completed: checked,
        }
      }

      return todoItem
    })

    todoData = [...newTodoData]
    setTodos(todoData)
    setFilteredTodos(todoData)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setButtonValue(e.target.value as FilteredButtonEnum)
  }

  const handleClearCompletedTodos = () => {
    const newTodos = todoData.filter((item) => !item.completed)
    todoData = [...newTodos]
    setTodos(todoData)
    setFilteredTodos(newTodos)
  }

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNewTodo('')
    setTodos((prevState) => [...prevState, { title: newTodo, completed: false, id: new Date().toISOString() }])
    setFilteredTodos((prevState) => [...prevState, { title: newTodo, completed: false, id: new Date().toISOString() }])
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const todoList = useMemo(
    () => filteredTodos.map((todoItem) => <TodoCard todo={todoItem} key={todoItem.id} onClick={handleClick} />),
    [filteredTodos]
  )

  const itemsLeft = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos])
  return (
    <Accordion>
      <Accordion.Item eventKey='0'>
        <Accordion.Header>What needs to be done?</Accordion.Header>
        <Accordion.Body>
          <Form className='mb-5' onSubmit={handleAddTodo}>
            <Stack direction='horizontal' gap={1}>
              <Form.Label className='text-nowrap m-0'>Add todo</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter todo'
                value={newTodo}
                onChange={handleChangeInput}
                required
              />
              <Button className='w-25 text-nowrap' type='submit'>
                Add todo
              </Button>
            </Stack>
          </Form>
          {todoList}
          <Stack direction='horizontal' className='justify-content-between mt-4'>
            <p className='m-0'>{itemsLeft} items left</p>
            <ButtonGroup>
              {filteredButton.map((button) => (
                <ToggleButton
                  key={button.id}
                  id={String(button.id)}
                  type='radio'
                  value={button.value}
                  variant='outline'
                  checked={button.value === buttonValue}
                  onChange={handleChange}
                >
                  {button.value}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <Button onClick={handleClearCompletedTodos} variant='outline'>
              Clear Completed
            </Button>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default memo(TodoList)
