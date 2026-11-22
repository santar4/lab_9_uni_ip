// Зберегти завдання та стан у localStorage
function saveData() {
    let name = document.getElementById("name").value;
    if (name) {
        localStorage.setItem("taskName", name);
        localStorage.setItem("taskDone", document.getElementById("done").checked);
        localStorage.setItem("taskImportant", document.getElementById("important").checked);
        alert("Завдання збережено!");
    } else {
        alert("Будь ласка, введіть завдання!");
    }
}

// Отримати завдання з localStorage та показати на сторінці
function getData() {
    let name = localStorage.getItem("taskName");
    if (name) {
        document.getElementById("taskList").textContent = name;
        document.getElementById("done").checked = localStorage.getItem("taskDone") === "true";
        document.getElementById("important").checked = localStorage.getItem("taskImportant") === "true";
        alert("Збережене завдання: " + name);
    } else {
        alert("Завдання не знайдено у localStorage!");
    }
}

// Видалити завдання
function removeData() {
    localStorage.removeItem("taskName");
    localStorage.removeItem("taskDone");
    localStorage.removeItem("taskImportant");
    document.getElementById("taskList").textContent = "Завдання";
    alert("Завдання видалено!");
}

// Очистити весь список
function clearData() {
    localStorage.clear();
    alert("Усі дані з localStorage видалено!");
}