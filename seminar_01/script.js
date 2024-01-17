document.addEventListener('DOMContentLoaded', function () {
    const scheduleData = getScheduleDataFromLocalStorage() || [
        {
            "id": 1,
            "name": "Йога",
            "time": "10:00 - 11:00",
            "maxParticipants": 15,
            "currentParticipants": 8
        },
        {
            "id": 2,
            "name": "Пилатес",
            "time": "11:30 - 12:30",
            "maxParticipants": 10,
            "currentParticipants": 5
        },
        {
            "id": 3,
            "name": "Кроссфит",
            "time": "13:00 - 14:00",
            "maxParticipants": 20,
            "currentParticipants": 15
        },
        {
            "id": 4,
            "name": "Танцы",
            "time": "14:30 - 15:30",
            "maxParticipants": 12,
            "currentParticipants": 10
        },
        {
            "id": 5,
            "name": "Бокс",
            "time": "16:00 - 17:00",
            "maxParticipants": 8,
            "currentParticipants": 6
        }
    ];

    const scheduleTableContainer = document.getElementById('schedule-table-container');

    function renderScheduleTable() {
        const table = document.createElement('table');
        table.classList.add('schedule-table');

        // Заголовок таблицы
        const headerRow = table.insertRow();
        headerRow.innerHTML = '<th>Название занятия</th><th>Время</th><th>Макс. участники</th><th>Текущие участники</th><th>Действия</th>';

        // Заполнение данными
        scheduleData.forEach((item) => {
            const row = table.insertRow();

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>${item.maxParticipants}</td>
                <td>${item.currentParticipants}</td>
                <td>
                    <button class="btn-enroll" data-id="${item.id}">Записаться</button>
                    <button class="btn-cancel" data-id="${item.id}">Отменить запись</button>
                </td>
            `;
        });

        scheduleTableContainer.appendChild(table);

        // Добавление обработчиков событий на кнопки
        document.querySelectorAll('.btn-enroll').forEach((btn) => {
            btn.addEventListener('click', handleEnrollButtonClick);
        });

        document.querySelectorAll('.btn-cancel').forEach((btn) => {
            btn.addEventListener('click', handleCancelButtonClick);
        });
    }

    function handleEnrollButtonClick(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const scheduleItem = scheduleData.find(item => item.id === id);

        if (scheduleItem.currentParticipants < scheduleItem.maxParticipants) {
            scheduleItem.currentParticipants++;
            saveDataToLocalStorage(scheduleData);
            updateTable();
        }
    }

    function handleCancelButtonClick(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const scheduleItem = scheduleData.find(item => item.id === id);

        if (scheduleItem.currentParticipants > 0) {
            scheduleItem.currentParticipants--;
            saveDataToLocalStorage(scheduleData);
            updateTable();
        }
    }

    function updateTable() {
        const table = document.querySelector('.schedule-table');
        table.remove();
        renderScheduleTable();
    }

    function saveDataToLocalStorage(data) {
        localStorage.setItem('scheduleData', JSON.stringify(data));
    }

    function getScheduleDataFromLocalStorage() {
        const storedData = localStorage.getItem('scheduleData');
        return storedData ? JSON.parse(storedData) : null;
    }

    renderScheduleTable();
});