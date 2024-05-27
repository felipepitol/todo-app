import { Check, Trash } from "@phosphor-icons/react";
import styles from "./Task.module.css";
import { TaskInterface } from "../../App";

interface Props {
  task: TaskInterface;
  onDelete: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export function Task({ task, onDelete, onComplete }: Props) {
  return (
    <div className={styles.task}>
      <button
        className={styles.checkContainer}
        onClick={() => onComplete(task.id)}
      >
        {task.isCompleted ? <Check size={22} /> : <div />}
      </button>

      <p
        className={task.isCompleted ? styles.textCompleted : "teste"}
        onClick={() => onComplete(task.id)}
      >
        {task.title}
      </p>

      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <Trash key={task.id} size={22} />
      </button>
    </div>
  );
}
