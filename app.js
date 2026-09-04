// Local Storage Manager
class TodoStorage {
    constructor(storageKey = 'todoApp') {
        this.storageKey = storageKey;
    }

    getTodos() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    }

    saveTodos(todos) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(todos));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }

    addTodo(todo) {
        const todos = this.getTodos();
        const newTodo = {
            id: Date.now(),
            text: todo.text,
            priority: todo.priority || 'low',
            completed: false,
            createdAt: new Date().toISOString()
        };
        todos.push(newTodo);
        this.saveTodos(todos);
        return newTodo;
    }

    deleteTodo(id) {
        const todos = this.getTodos();
        const filtered = todos.filter(todo => todo.id !== id);
        this.saveTodos(filtered);
    }

    toggleTodo(id) {
        const todos = this.getTodos();
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos(todos);
        }
    }

    clearCompleted() {
        const todos = this.getTodos();
        const filtered = todos.filter(todo => !todo.completed);
        this.saveTodos(filtered);
    }
}

// Todo App Manager
class TodoApp {
    constructor() {
        this.storage = new TodoStorage();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.render();
    }

    cacheElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.taskCount = document.getElementById('taskCount');
        this.completedCount = document.getElementById('completedCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) {
            alert('Please enter a task!');
            return;
        }

        this.storage.addTodo({ text });
        this.todoInput.value = '';
        this.render();
    }

    deleteTodo(id) {
        this.storage.deleteTodo(id);
        this.render();
    }

    toggleTodo(id) {
        this.storage.toggleTodo(id);
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderTodoList();
    }

    clearCompleted() {
        if (confirm('Are you sure you want to delete all completed tasks?')) {
            this.storage.clearCompleted();
            this.render();
        }
    }

    getFilteredTodos() {
        const todos = this.storage.getTodos();
        switch (this.currentFilter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }

    renderTodoList() {
        const todos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (todos.length === 0) {
            this.todoList.innerHTML = '<div class="empty-state">No tasks yet. Add one to get started!</div>';
            return;
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="app.toggleTodo(${todo.id})"
                >
                <span class="priority ${todo.priority}">${todo.priority}</span>
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
            `;
            this.todoList.appendChild(li);
        });
    }

    updateStats() {
        const todos = this.storage.getTodos();
        const completed = todos.filter(t => t.completed).length;
        this.taskCount.textContent = `${todos.length} task${todos.length !== 1 ? 's' : ''}`;
        this.completedCount.textContent = `${completed} completed`;
    }

    render() {
        this.renderTodoList();
        this.updateStats();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();