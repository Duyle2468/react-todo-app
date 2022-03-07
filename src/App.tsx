import Header from './components/Header';
import MainSection from './components/MainSection';
import Topbar from './components/Topbar';
import { TaskManagerProvider } from './context/TaskManagerProvider';

export default function App() {
  return (
    <TaskManagerProvider>
      <Topbar />
      <div className='max-w-screen-md mx-auto px-4 py-8 mt-12'>
        <Header />
        <MainSection />
      </div>
    </TaskManagerProvider>
  );
}
