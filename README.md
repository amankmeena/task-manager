# Simple Task Manager

A straightforward task management application built with React. The emphasis is on core functionality and a user-friendly interface.

## Features

- **Dashboard:**  
  - View all tasks categorized as Upcoming, Overdue, or Completed.
- **Task Management:**  
  - Add, edit, and delete tasks.
  - Each task includes a title, description, due date, and priority level.
- **Priority Levels:**  
  - Three levels: High, Medium, Low.
  - Set and update the priority of each task.
- **Search and Filter:**  
  - Search tasks by title or description.
  - Filter tasks by priority and completion status.

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App

Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```sh
npm run build
```

## Project Structure

src/
  `App.jsx`           # Main app component
  `App.css`           # Global styles
  `index.jsx`         # Entry point
  components/
    `TaskForm.jsx`    # Form for adding tasks
    `TaskList.jsx`    # List and edit tasks
  pages/
    `Dashboard.jsx`   # Main dashboard, task logic

## Usage

- Add a new task using the form.
- Edit or delete tasks from the dashboard.
- Tasks are automatically sorted into Upcoming, Overdue, or Completed sections.
- Use search and filter options to quickly find tasks.

## Planned Enhancements

**Enhanced Task Organization:**
- Task categories/tags for better organization
- Drag-and-drop functionality for task reordering
- Subtasks support within main tasks
- Task templates for recurring tasks

**Improved User Experience:**
- Dark mode theme support
- Customizable task priority levels
- Bulk task actions (delete, complete, move)
- Rich text editor for task descriptions

**Collaboration Features:**
- Task sharing between users
- Comments on tasks
- Task assignment capabilities
- Team workspaces

**Data & Integration:**
- Data export/import functionality
- Calendar integration
- Email notifications for due tasks
- Task statistics and productivity insights

**Technical Improvements:**
- Better state management with Redux
- Unit tests for critical components
- Keyboard shortcuts for common actions

## License

This project is for educational purposes.