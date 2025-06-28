import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskList({ tasks, setTasks }: TaskListProps) {
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const toggleComplete = (id: number) => {
        setTasks((prevTasks: Task[]) =>
            prevTasks.map((task: Task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prevTasks: Task[]) => prevTasks.filter((task: Task) => task.id !== id));
    };

    const editTask = (task: Task) => {
        setEditingTask(task);
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingTask) return;

        const updatedFormattedDueDate = new Date(editingTask.dueDate).toISOString().split('T')[0];

        setTasks((prevTasks: Task[]) =>
            prevTasks.map((task: Task) =>
                task.id === editingTask.id ? { ...editingTask, dueDate: updatedFormattedDueDate } : task
            )
        );
        setEditingTask(null);
    };

    return (
        <div>
            {editingTask && (
                <div className="edit-form-overlay">
                    <form className="edit-form" onSubmit={handleEditSubmit}>
                        <h3>Edit Task</h3>
                        <input
                            value={editingTask.title}
                            onChange={(e) => setEditingTask(editingTask ? { ...editingTask, title: e.target.value } : null)}
                            placeholder="Task Title"
                            required
                        />
                        <textarea
                            value={editingTask.description}
                            onChange={(e) => setEditingTask(editingTask ? { ...editingTask, description: e.target.value } : null)}
                            placeholder="Task Description"
                        ></textarea>
                        <DatePicker
                            selected={editingTask.dueDate ? new Date(editingTask.dueDate) : new Date()}
                            onChange={(date: Date | null) => {
                                if (date && editingTask) setEditingTask({ ...editingTask, dueDate: date.toISOString().split('T')[0] });
                            }}
                            placeholderText="Due Date"
                            required
                        />
                        <select
                            value={editingTask.priority}
                            onChange={(e) => setEditingTask(editingTask ? { ...editingTask, priority: e.target.value } : null)}
                        >
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                        <div className="edit-form-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditingTask(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            <ul>
                {tasks.length === 0 ? <p>No tasks found</p> : tasks.map((task: Task) => (
                    <li key={task.id}>
                        <div className="task-header">
                            <div className="task-title">
                                <strong>{task.title}</strong>
                                <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
                            </div>
                            <div className="button-group">
                                <button onClick={() => toggleComplete(task.id)}>
                                    <i className={`fas ${task.completed ? "fa-times" : "fa-check"}`}></i>
                                </button>
                                <button onClick={() => editTask(task)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => deleteTask(task.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div className="description">{task.description}</div>
                        <div className="due-date">Due: {task.dueDate}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
