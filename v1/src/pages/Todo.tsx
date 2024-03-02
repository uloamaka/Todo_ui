import * as React from 'react';
import Main from '../components/Todo';
interface ITodoPageProps {}

const TodoPage: React.FunctionComponent<ITodoPageProps> = (props) => {
  return (
    <div>
      <Main />
    </div>
  );
};

export default TodoPage;
