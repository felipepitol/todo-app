import todoLogo from "../../assets/logo-todo.svg";
import { PlusCircle } from "@phosphor-icons/react";

interface Props {
  onAddTask: (taskTitle: string) => void;
}

import styles from "./Header.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
export function Header({ onAddTask }: Props) {
  const [title, setTitle] = useState("");
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onAddTask(title);
    setTitle("");
  }

  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <header className={styles.header}>
      <img src={todoLogo} />

      <form className={styles.addTaskForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          onChange={onChangeTitle}
          value={title}
        />
        <button>
          Criar <PlusCircle size={22} />{" "}
        </button>
      </form>
    </header>
  );
}
