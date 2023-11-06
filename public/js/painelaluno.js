document.addEventListener("DOMContentLoaded", function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
  
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthElement = document.getElementById("current-month");
  
    function generateCalendar() {
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      const currentDay = currentDate.getDate();
  
      currentMonthElement.textContent = firstDay.toLocaleString("default", { month: "long" }) + " " + currentYear;
  
      let date = new Date(firstDay);
      calendarBody.innerHTML = "";
  
      while (date <= lastDay) {
        const row = document.createElement("tr");
  
        for (let i = 0; i < 7; i++) {
          if (i === date.getDay()) {
            const cell = document.createElement("td");
            cell.textContent = date.getDate();
  
            
            if (date.getDate() === currentDay && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                cell.classList.add("today"); // Adiciona a classe 'today' apenas para o dia atual no mês atual
            } else if (date.getMonth() !== currentMonth) {
                    cell.classList.add("not-this-month"); // Adiciona a classe 'not-this-month' para destacar os dias que não são do mês atual
                }
                            
              
            row.appendChild(cell);
            date.setDate(date.getDate() + 1);
          } else {
            const cell = document.createElement("td");
            row.appendChild(cell);
          }
        }
  
        calendarBody.appendChild(row);
      }
    }
  
    generateCalendar();
  
    document.getElementById("prev-month").addEventListener("click", function () {
      currentMonth -= 1;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
      }
      generateCalendar();
    });
  
    document.getElementById("next-month").addEventListener("click", function () {
      currentMonth += 1;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
      }
      generateCalendar();
    });
  });
  