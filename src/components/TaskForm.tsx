import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    completed: boolean;
};

type TaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskForm({ setTasks }: TaskFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !dueDate) return alert("Fill the required details!");

        const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

        setTasks((prevTasks: Task[]) => [
            ...prevTasks,
            {
                id: Date.now(),
                title,
                description,
                dueDate: formattedDueDate,
                priority,
                completed: false,
            },
        ]);
        setTitle("");
        setDescription("");
        setDueDate(new Date());
        setPriority("Medium");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
            ></textarea>
            <DatePicker
                selected={dueDate}
                onChange={(date: Date | null) => {
                    if (date) setDueDate(date);
                }}
                placeholderText="Due Date"
                required
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <button type="submit">+ Add Task</button>
        </form>
    );
}

export default TaskForm;
