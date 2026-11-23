// Регулярні вирази для перевірки полів
const priorityRegex = /^[1-5]$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;

// Додаткова перевірка існування дати (наприклад, 31/02/2026 не існує)
function isRealDate(value) {
    const parts = value.split("/");
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const daysInMonth = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return day <= daysInMonth[month - 1];
}

// Показати або очистити повідомлення про помилку для поля
function setError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
    document.getElementById(fieldId).classList.toggle("invalid", message !== "");
}

// Перевірка всіх полів форми
function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const priority = document.getElementById("priority").value.trim();
    const dueDate = document.getElementById("dueDate").value.trim();

    setError("name", "");
    setError("priority", "");
    setError("dueDate", "");

    if (name === "") {
        setError("name", "Введіть назву завдання.");
        isValid = false;
    }

    if (!priorityRegex.test(priority)) {
        setError("priority", "Пріоритет має бути цілим числом від 1 до 5.");
        isValid = false;
    }

    if (!dateRegex.test(dueDate)) {
        setError("dueDate", "Дата має бути у форматі DD/MM/YYYY.");
        isValid = false;
    } else if (!isRealDate(dueDate)) {
        setError("dueDate", "Такої дати не існує.");
        isValid = false;
    }

    return isValid;
}

// Зберегти завдання та стан у localStorage
function saveData() {
    if (!validateForm()) {
        return;
    }
    localStorage.setItem("taskName", document.getElementById("name").value.trim());
    localStorage.setItem("taskPriority", document.getElementById("priority").value.trim());
    localStorage.setItem("taskDueDate", document.getElementById("dueDate").value.trim());
    localStorage.setItem("taskDone", document.getElementById("done").checked);
    localStorage.setItem("taskImportant", document.getElementById("important").checked);
    alert("Завдання збережено!");
}

// Отримати завдання з localStorage та показати на сторінці
function getData() {
    let name = localStorage.getItem("taskName");
    if (name) {
        document.getElementById("taskList").textContent = name;
        document.getElementById("priority").value = localStorage.getItem("taskPriority");
        document.getElementById("dueDate").value = localStorage.getItem("taskDueDate");
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
    localStorage.removeItem("taskPriority");
    localStorage.removeItem("taskDueDate");
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