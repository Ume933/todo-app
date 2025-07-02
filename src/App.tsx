import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">My Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
