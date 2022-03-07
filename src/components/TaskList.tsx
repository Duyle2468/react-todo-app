import { useTasksByFilter } from '../context/useTaskManagerContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const tasks = useTasksByFilter();

  return (
    <div className='mt-4'>
      {tasks.map(task => {
        return <TaskItem key={task.id} data={task} />;
      })}
    </div>
  );
}
