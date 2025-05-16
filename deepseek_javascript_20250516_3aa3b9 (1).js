// Datos de ejemplo (puedes editarlos después)
let tasks = [
    { id: 1, description: "Limpiar el almacén", assignedTo: "Juan", status: "not-started" },
    { id: 2, description: "Revisar inventario", assignedTo: "María", status: "in-progress" },
    { id: 3, description: "Actualizar base de datos", assignedTo: "Carlos", status: "completed" }
];

// Cargar usuarios en el selector
function loadUsers() {
    const userSelect = document.getElementById('user-select');
    userSelect.innerHTML = '<option value="">-- Elegir --</option>';
    
    const users = [...new Set(tasks.map(task => task.assignedTo))];
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user;
        option.textContent = user;
        userSelect.appendChild(option);
    });
}

// Mostrar tareas del usuario seleccionado
function loadTasks() {
    const userId = document.getElementById('user-select').value;
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    if (!userId) return;

    const userTasks = tasks.filter(task => task.assignedTo === userId);
    
    if (userTasks.length === 0) {
        container.innerHTML = '<p>No tienes tareas asignadas.</p>';
        return;
    }

    userTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.status}`;
        taskElement.innerHTML = `
            <h3>${task.description}</h3>
            <p>Estado: 
                <select onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="not-started" ${task.status === 'not-started' ? 'selected' : ''}>No iniciado</option>
                    <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>En progreso</option>
                    <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completado</option>
                </select>
            </p>
        `;
        container.appendChild(taskElement);
    });
}

// Actualizar estado de una tarea
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        alert(`Tarea actualizada a: ${newStatus}`);
        loadTasks(); // Recargar la vista
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});