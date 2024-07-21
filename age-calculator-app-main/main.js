let btn = document.getElementById('calc-btn');
let day = document.getElementById('day');
let month = document.getElementById('month');
let year = document.getElementById('year');

// displays
let yearsDis = document.getElementById('dyear');
let monthDis = document.getElementById('dmonth');
let dayDis = document.getElementById('dday');

// error function
function error(el) {
  let txt = el.value;
  if (txt === '' || isNaN(txt) || parseInt(txt) <= 0) {
    el.classList.add('error');
    return false;
  } else {
    el.classList.remove('error');
    return true;
  }
}

// variables to hold the calculated values
let years = '--';
let months = '--';
let days = '--';

function calc() {
  // Get the current date
  const now = new Date();

  // Get the user input values for birth date
  const birthYear = parseInt(year.value);
  const birthMonth = parseInt(month.value) - 1; // JavaScript months are 0-indexed
  const birthDay = parseInt(day.value);

  // Create a date object for the birth date
  const birthDate = new Date(birthYear, birthMonth, birthDay);

  // Ensure the birth date is valid
  if (birthDate > now || birthDate.getDate() !== birthDay || birthDate.getMonth() !== birthMonth || birthDate.getFullYear() !== birthYear) {
    alert("Invalid date. Please check your input.");
    return;
  }

  // Calculate the difference in years, months, and days
  years = now.getFullYear() - birthDate.getFullYear();
  months = now.getMonth() - birthDate.getMonth();
  days = now.getDate() - birthDate.getDate();

  // Adjust if the current month is earlier in the year than the birth month
  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust if the current day is earlier in the month than the birth day
  if (days < 0) {
    months--;
    const prevMonth = (now.getMonth() + 11) % 12; // Previous month considering January case
    const daysInPrevMonth = new Date(now.getFullYear(), prevMonth + 1, 0).getDate();
    days += daysInPrevMonth;
  }

  console.log(`Age: ${years} years, ${months} months, and ${days} days.`);
}

function display() {
  monthDis.innerText = months;
  yearsDis.innerText = years;
  dayDis.innerText = days;
}

btn.onclick = function() {
  const monthValid = error(month);
  const dayValid = error(day);
  const yearValid = error(year);

  if (monthValid && dayValid && yearValid) {
    calc();
    display();
  }
};