import { ClipboardText } from "@phosphor-icons/react";
import { TaskInterface } from "../../App";
import { Task } from "../Task/Task";
import styles from "./Tasks.module.css";

interface Props {
  tasks: TaskInterface[];
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Tasks({ tasks, onDelete, onComplete }: Props) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Tarefas criadas</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Concluídas</p>
          <span>
            {completedTasks} de {tasksQuantity}
          </span>
        </div>
      </header>
      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))}
        {tasks.length <= 0 && (
          <section className={styles.emptyState}>
            <ClipboardText size={64} />
            <p>Não foram encontradas tarefas</p>
            <span>Adicione uma tarefa e organize seus itens a fazer</span>
          </section>
        )}
      </div>
    </section>
  );
}
