import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">My Todo App</h1>
      <h1 className="text-3xl underline text-red-500">Hello Tailwind!</h1>

      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
