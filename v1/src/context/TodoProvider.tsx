import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useHistory } from 'react-router-dom';

interface TodoContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  todo: any[];
  setTodo: React.Dispatch<React.SetStateAction<any[]>>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<any | null>(null);
  const [todo, setTodo] = useState<any[]>([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    setUser(userInfo);

    if (!userInfo) {
      history.push('/');
    }
  }, [history]);

  return (
    <TodoContext.Provider value={{ user, setUser, todo, setTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoState = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }

  return context;
};

export { TodoProvider, useTodoState };
