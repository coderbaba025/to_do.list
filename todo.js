document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Mahalliy saqlashdan vazifalarni yuklash
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    // Vazifani DOM ga qo'shish
    function addTaskToDOM(taskText, isCompleted) {
        const li = document.createElement("li");

        // Checkbox yaratish
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompleted;

        // Checkbox o'zgarishi hodisasi
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        // O'chirish tugmasini yaratish
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "O'chirish";
        deleteBtn.classList.add("delete-btn"); // O'chirish tugmasiga klass qo'shamiz
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks(); // O'chirishdan so'ng vazifalarni saqlash
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        li.appendChild(deleteBtn); // O'chirish tugmasini qo'shish
        if (isCompleted) {
            li.classList.add("completed");
        }
        taskList.appendChild(li);
    }

    // Vazifalarni saqlash
    function saveTasks() {
        const tasks = [];
        const taskItems = document.querySelectorAll("li");
        taskItems.forEach(item => {
            const checkbox = item.querySelector("input[type='checkbox']");
            tasks.push({
                text: item.textContent.trim().replace("O'chirish", "").trim(), // O'chirish tugmasini olib tashlash
                completed: checkbox.checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Yangi vazifa qo'shish
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Iltimos, vazifani kiriting!");
            return;
        }
        addTaskToDOM(taskText, false);
        taskInput.value = ""; // Input maydonini tozalash
        saveTasks(); // Har doim vazifani saqlash
    });

    // Sahna yuklanganda vazifalarni yuklash
    loadTasks();
});