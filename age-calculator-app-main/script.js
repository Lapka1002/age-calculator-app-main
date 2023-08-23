function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year, month) {
    const daysPerMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    if (month === 1 && isLeapYear(year)) {
        return 29;
    }

    return daysPerMonth[month];
}

function addErrorAll(el) {
    el.forEach((input) => {
        input.classList.add('error');
    });
}
function removeErrorAll(el) {
    el.forEach((input) => {
        input.classList.remove('error');
    });
}

function errorMessage(id, text) {
    document.querySelector('#' + id).innerHTML = text;
}

function validateInput(day, month, year) {
    let valid = true;

    if (year < 0) {
        valid = false;
        errorMessage("errorYear", 'Must be a valid year');
    } else if (year > new Date().getFullYear()) {
        valid = false;
        errorMessage("errorYear", 'Must be in the past');
    } else if (isNaN(year)) {
        valid = false;
        errorMessage("errorYear", 'This field is required');
    } else {
        errorMessage("errorYear", '');
    }

    if (month < 1 || month >= 12) {
        valid = false;
        errorMessage("errorMonth", 'Must be a valid month');
    } else if (isNaN(month)) {
        valid = false;
        errorMessage("errorMonth", 'This field is required');
    } else {
        errorMessage("errorMonth", '');
    }

    if (day < 1) {
        valid = false;
        errorMessage("errorDay", 'Must be a valid day');
    } else if (day > 31) {
        valid = false;
        errorMessage("errorDay", 'Must be a valid day');
    } else if (isNaN(day)) {
        valid = false;
        errorMessage("errorDay", 'This field is required');
    } else if (day > daysInMonth(year, month)) {
        valid = false;
        errorMessage("errorDay", 'Must be a valid date');
    } else {
        errorMessage("errorDay", '');
    }

    return valid;
}

function calculateAge() {
    let day = parseInt(document.querySelector('#date').value);
    let month = parseInt(document.querySelector('#month').value) - 1;
    let year = parseInt(document.querySelector('#year').value);

    const titles = document.querySelectorAll('.title');
    const inputs = document.querySelectorAll('.input-text');
    let isValidInput = validateInput(day, month, year); // Проверяем корректность ввода

    if (!isValidInput) {
        titles.forEach((title) => {
            title.style.color = `#ff5757`;
        });
        addErrorAll(inputs);
        return;
    } else {
        titles.forEach((title) => {
            title.style.color = ``;
        });
        removeErrorAll(inputs);
    }

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    let years = currentYear - year;
    let months = currentMonth - month;
    let days = currentDay - day;

    if (days < 0) {
        months--;
        days += daysInMonth(currentYear, currentMonth - 1);
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.querySelector('.for-years').innerHTML = years;
    document.querySelector('.for-months').innerHTML = months;
    document.querySelector('.for-days').innerHTML = days;
}