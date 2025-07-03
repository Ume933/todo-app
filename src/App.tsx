import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
     <div className="min-h-screen bg-green-100 p-8 flex flex-col items-center">
      <h1 className="text-8xl font-bold mb-6 text-blue-600">Todo App</h1>

      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
