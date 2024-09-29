// Événements au chargement de la page
document.getElementById('addTaskButton').addEventListener("click", addTask);
document.getElementById('taskInput').addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Charger les tâches depuis le localStorage lors du chargement de la page
loadTodos();

// Nouvelle fonction pour charger les tâches
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(task => {
        addTaskToDOM(task);
    });
}

// Fonction pour ajouter une tâche au DOM
function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';

    // Gestionnaire d'événements pour le bouton de suppression
    deleteButton.addEventListener('click', function() {
        document.getElementById('taskList').removeChild(li);
        removeTaskFromStorage(taskText);
    });

    // Événement pour marquer la tâche comme complète
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Événement pour l'édition des tâches
    li.addEventListener('dblclick', function() { // Utiliser un double clic pour éditer
        editTask(li, taskText);
    });

    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
}

// Fonction pour supprimer une tâche du localStorage
function removeTaskFromStorage(taskText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter(task => task !== taskText);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
    const taskText = document.getElementById('taskInput').value;

    if (taskText !== '') {
        addTaskToDOM(taskText);

        // Mise à jour du localStorage
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(taskText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    document.getElementById('taskInput').value = '';
}

// Fonction pour éditer une tâche
function editTask(li, oldTaskText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldTaskText;

    // Remplacer le texte de la tâche par le champ de saisie
    li.textContent = ''; // Vider le contenu du <li>
    li.appendChild(input); // Ajouter l'input au <li>

    // Ajouter un bouton pour valider l'édition
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Valider';
    
    saveButton.addEventListener('click', function() {
        const newTaskText = input.value;

        // Mettre à jour le texte de la tâche
        li.textContent = newTaskText;
        li.appendChild(deleteButton); // Ajouter à nouveau le bouton de suppression

        // Mettre à jour le localStorage
        updateTaskInStorage(oldTaskText, newTaskText);
    });

    li.appendChild(saveButton);
}

function updateTaskInStorage(oldTaskText, newTaskText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.map(task => task === oldTaskText ? newTaskText : task);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

