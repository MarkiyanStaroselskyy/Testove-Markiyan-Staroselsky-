const form = document.getElementById('eventForm');
const tableBody = document.querySelector('#eventsTable');
const statsDiv = document.getElementById('stats');

// Завантаження подій з localStorage
let events = JSON.parse(localStorage.getItem('events')) || [];

// Функція для оновлення таблиці та статистики
function updateUI() {
    tableBody.innerHTML = '';
    let counts = {
        total: 0,
        click: 0,
        lead: 0,
        sale: 0,
    }

    events.forEach(event => {
        const row = document.createElement('tr');
        row.classList.add('row');
        row.innerHTML = `
        <td>${event.name}</td>
        <td>${event.type}</td>
        <td>${event.timestamp}</td>
        `;
        tableBody.appendChild(row);

        counts.total++;
        counts[event.type]++;
    });

    statsDiv.innerHTML = `
                Загальна кількість подій: ${counts.total}<br>
                Click: ${counts.click}<br>
                Lead: ${counts.lead}<br>
                Sale: ${counts.sale}
            `;
}

// Додавання нової події
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const timestamp = new Date().toLocaleString('uk-UA');

    events.push({ name, type, timestamp });
    localStorage.setItem('events', JSON.stringify(events));

    updateUI();
    form.reset();
});

// Кнопка очистити
document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Точно очистити всі події?')) {
        events = [];
        localStorage.removeItem('events');
        updateUI();
    }
});

// Ініціалізація
updateUI();