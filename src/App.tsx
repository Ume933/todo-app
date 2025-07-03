import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
     <div className="min-h-screen bg-green-100 p-8 flex flex-col items-center">
      <h1 className="text-8xl font-bold mb-6 text-blue-600">TODO List</h1>

      <AddTodo />
      <h1 className="text-8xl font-bold mb-6 text-blue-600">Tasks</h1>
      <TodoList />
    </div>
  );
};

export default App;
