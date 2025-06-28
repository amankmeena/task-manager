import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    completed: boolean;
};

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterPriority, setFilterPriority] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [activeTab, setActiveTab] = useState('upcoming');

    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        const savedTasks: Task[] = saved ? JSON.parse(saved) : [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Get today's date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split('T')[0];

    // Categorizing tasks dynamically
    const upcomingTasks = tasks.filter((task: Task) => !task.completed && task.dueDate >= currentDate);
    const overdueTasks = tasks.filter((task: Task) => !task.completed && task.dueDate < currentDate);
    const completedTasks = tasks.filter((task: Task) => task.completed);

    // Search and Priority Filter
    const filterTasks = (taskList: Task[]) => {
        return taskList.filter((task: Task) => 
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filterPriority === 'All' || task.priority === filterPriority) &&
            (filterStatus === 'All' || task.completed === (filterStatus === 'Complete'))
        );
    };

    return (
        <div>
            <TaskForm setTasks={setTasks} />

            <div className='search-and-filter'>
                <input 
                    type="text" 
                    placeholder="Search tasks..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="All">All Status</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
                <button onClick={() => {setSearchQuery(''); setFilterPriority('All'); setFilterStatus('All')}}>
                    <i className="fas fa-filter-circle-xmark"></i>
                </button>
            </div>

            <div className="task-tabs">
                <div 
                    className={`tab-label ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming Tasks
                </div>
                <div 
                    className={`tab-label ${activeTab === 'overdue' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overdue')}
                >
                    Overdue Tasks
                </div>
                <div 
                    className={`tab-label ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed Tasks
                </div>
            </div>

            <div className="task-section">
                {activeTab === 'upcoming' && (
                    <TaskList tasks={filterTasks(upcomingTasks)} setTasks={setTasks} />
                )}
                {activeTab === 'overdue' && (
                    <TaskList tasks={filterTasks(overdueTasks)} setTasks={setTasks} />
                )}
                {activeTab === 'completed' && (
                    <TaskList tasks={filterTasks(completedTasks)} setTasks={setTasks} />
                )}
            </div>
        </div>
    );
}

export default Dashboard;
