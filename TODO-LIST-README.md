# To-Do List Application

A modern, responsive to-do list application with local storage functionality. Add, complete, delete, and filter your tasks with ease!

## Features

✨ **Core Features:**
- ✅ Add new tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Delete individual tasks
- ✅ Clear all completed tasks at once
- ✅ Filter tasks (All, Active, Completed)
- ✅ Task counters
- 💾 **Local storage** - All tasks persist between sessions

## User Interface

- Clean, modern design with gradient background
- Responsive layout that works on desktop and mobile
- Smooth animations and transitions
- Custom scrollbar styling
- Visual feedback for hover and active states

## How to Use

1. **Open** `index.html` in your web browser
2. **Add Task**: Type in the input field and press Enter or click "Add Task"
3. **Complete Task**: Check the checkbox next to a task to mark it as done
4. **Delete Task**: Click the "Delete" button to remove a task
5. **Filter Tasks**: Use the filter buttons to view All, Active, or Completed tasks
6. **Clear Completed**: Click "Clear Completed" to remove all finished tasks

## Local Storage

All your tasks are automatically saved to your browser's local storage. This means:
- Your tasks persist even after closing the browser
- No server or internet connection needed
- Data is stored locally on your device

## File Structure

```
.
├── index.html      # HTML structure
├── styles.css      # CSS styling and responsive design
├── app.js          # JavaScript functionality and local storage
└── README.md       # This file
```

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and flexbox
- **JavaScript (ES6)** - Object-oriented programming with classes
- **Local Storage API** - Client-side data persistence

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

Works on all modern browsers that support:
- Local Storage API
- ES6 Classes
- CSS Flexbox

## Features Breakdown

### TodoStorage Class
Manages all local storage operations:
- `getTodos()` - Retrieve all tasks
- `saveTodos()` - Save tasks to storage
- `addTodo()` - Create new task
- `deleteTodo()` - Remove a task
- `toggleTodo()` - Mark task as completed/incomplete
- `clearCompleted()` - Remove all completed tasks

### TodoApp Class
Handles UI interactions and rendering:
- Event listeners for user actions
- Dynamic DOM updates
- Filter management
- Statistics tracking
- HTML escaping for security

## Tips

- Tasks are automatically saved as you work
- Check your browser's Developer Tools → Application → Local Storage to see stored data
- Filter buttons help organize your workflow
- Use task completion tracking to monitor productivity

## Future Enhancements

Possible features to add:
- Task due dates and reminders
- Priority levels with color coding
- Task categories/tags
- Search functionality
- Edit existing tasks
- Dark mode theme
- Export/Import tasks
- Recurring tasks

## License

This project is open source and available for personal and educational use.

---

**Enjoy organizing your tasks! 📝**