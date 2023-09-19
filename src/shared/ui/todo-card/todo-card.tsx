import { ChangeEvent, FC, memo, useState } from 'react'
import { Form, Stack } from 'react-bootstrap'
import { ITodoData } from '../../utils/todoData'

interface TodoCardProps {
  todo: ITodoData
  onClick: (todo: ITodoData, checked: boolean) => void
}

const TodoCard: FC<TodoCardProps> = ({ todo, onClick }) => {
  const [value, setValue] = useState(todo.completed)
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.checked
    onClick(todo, val)
    setValue(val)
  }

  return (
    <Stack direction='horizontal' className='p-2 border-bottom' gap={3}>
      <Form.Check onChange={handleClick} checked={value} />
      <p className={`m-0 ${todo.completed && 'text-decoration-line-through text-secondary opacity-50'}`}>
        {todo.title}
      </p>
    </Stack>
  )
}

export default memo(TodoCard)
