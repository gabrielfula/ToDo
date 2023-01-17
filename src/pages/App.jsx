import { useState } from "react";
import "../styles/appStyled.css";
import { MdDelete } from "react-icons/md";

export default (App) => {
  const ENTER_KEY = 13;
  const ESC_KEY = 27;

  const [todos, setTodos] = useState([]);

  const [value, setValue] = useState("");

  const onChecked = (todo) => {
    setTodos(
      todos.map((obj) =>
        obj.id === todo.id ? { ...obj, checked: !todo.checked } : obj
      )
    );
  };

  const onDelete = (todo) => {
    setTodos(todos.filter((obj) => obj.id !== todo.id));
  };

  const onChange = (events) => {
    setValue(events.target.value);
  };

  const erase = () => {
    setValue("");
  };

  const onKeyDown = (events) => {
    if (events.which === ENTER_KEY) {
      setTodos([
        ...todos,
        { id: new Date().getTime(), title: value, checked: false },
      ]);
      erase();
    } else if (events.which === ESC_KEY) {
      console.log("limpou");
      erase();
    }
  };

  return (
    <div className="container">
      <h1 className="title">To do List</h1>
      <section className="main">
        <input
          placeholder="Digite suas tarefas de hoje"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id.toString}>
              <span
                className={["todo", todo.checked ? "checked" : ""].join(" ")}
                onClick={() => onChecked(todo)}
              >
                {todo.title}
              </span>
              <button className="delete" onClick={() => onDelete(todo)}>
                <MdDelete size={18} />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
