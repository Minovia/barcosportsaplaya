document.addEventListener('DOMContentLoaded', () => {
  const calendarDaysEl = document.getElementById('calendar-days');
  const currentMonthYearEl = document.getElementById('currentMonthYear');
  const prevMonthButton = document.getElementById('prevMonth');
  const nextMonthButton = document.getElementById('nextMonth');

  const initialDate = new Date();
  const initialMonth = initialDate.getMonth(); // 0-indexed
  const initialYear = initialDate.getFullYear();

  let currentMonth = initialMonth;
  let currentYear = initialYear;

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  async function fetchAvailability(year, month) {
      try {
          // El mes en JS es 0-index, en PHP es 1-index
          const response = await fetch(`api.php?action=get_availability&year=${year}&month=${month + 1}`);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.error) {
              console.error("Error fetching availability:", data.error);
              return {};
          }
          return data;
      } catch (error) {
          console.error("Could not fetch availability:", error);
          return {};
      }
  }

  async function renderCalendar(year, month) {
      calendarDaysEl.innerHTML = ''; // Limpiar días anteriores
      currentMonthYearEl.textContent = `${monthNames[month]} ${year}`;

      const firstDayOfMonth = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
      const startPadding = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1; // Adjust for Monday start

      const availabilityData = await fetchAvailability(year, month);

      // Add padding days
      for (let i = 0; i < startPadding; i++) {
          const dayEl = document.createElement('div');
          dayEl.classList.add('h-8'); // Placeholder height
          calendarDaysEl.appendChild(dayEl);
      }

      // Add actual days
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for comparison

      for (let day = 1; day <= daysInMonth; day++) {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayDate = new Date(year, month, day);
          dayDate.setHours(0, 0, 0, 0); // Reset time for comparison

          const isAvailable = availabilityData[dateString] ?? true; // Default to available if not in DB

          const dayEl = document.createElement('div');
          dayEl.classList.add('h-8', 'w-8', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mx-auto', 'text-sm');
          dayEl.textContent = day;

          // Disable days before today and apply gray style
          if (dayDate < today) {
               dayEl.classList.add('bg-gray-300', 'text-gray-600');
          } else {
              // Apply color based on availability for current/future days
              if (isAvailable) {
                  dayEl.classList.add('bg-blue-100', 'text-blue-800');
              } else {
                  dayEl.classList.add('bg-blue-600', 'text-white');
              }
               // No cursor-pointer added to individual days
               // Optional: Add click listener for user info (e.g., show details)
               // dayEl.addEventListener('click', () => {
               //     alert(`Fecha: ${dateString}, Disponible: ${isAvailable ? 'Sí' : 'No'}`);
               // });
          }

          calendarDaysEl.appendChild(dayEl);
      }

      // Update previous month button state and cursor
      if (currentYear === initialYear && currentMonth === initialMonth) {
          prevMonthButton.classList.add('bg-gray-300', 'text-gray-600', 'cursor-not-allowed');
          prevMonthButton.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer'); // Remove cursor-pointer
      } else {
          prevMonthButton.classList.remove('bg-gray-300', 'text-gray-600', 'cursor-not-allowed');
          prevMonthButton.classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer'); // Add cursor-pointer
      }

      // Ensure next month button always has cursor-pointer
      nextMonthButton.classList.add('cursor-pointer');
  }

  prevMonthButton.addEventListener('click', () => {
      // Check if the button is currently disabled
      if (prevMonthButton.classList.contains('cursor-not-allowed')) {
          return; // Do nothing if disabled
      }

      currentMonth--;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
  });

  nextMonthButton.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
  });

  // Initial render
  renderCalendar(currentYear, currentMonth);
});