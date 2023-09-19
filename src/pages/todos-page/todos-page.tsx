import { FC } from 'react'
import { TodoList } from '../../widgets/ui/todo-list'

const TodoPage: FC = () => {
  return (
    <section>
      <h1 className='text-center'>TODOS</h1>
      <TodoList />
    </section>
  )
}

export default TodoPage
