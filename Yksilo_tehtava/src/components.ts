import { dailyMenu, weeklyMenu } from "./interfaces/Menu";
import { Restaurant } from "./interfaces/Restaurant";

const restaurantRow = (restaurant: Restaurant) => {
  const { name, address } = restaurant;
  const tr = document.createElement('tr');
  const nameCell = document.createElement('td');
  nameCell.innerText = name;
  const addressCell = document.createElement('td');
  addressCell.innerText = address;
  tr.appendChild(nameCell);
  tr.appendChild(addressCell);
  return tr;
};

const restaurantDaily = (restaurant: Restaurant, menu: dailyMenu) => {
  const { name, address, city, postalCode, phone, company } = restaurant;
  let html = `<h3>${name}</h3>
    <p>${company}</p>
    <p>${address} ${postalCode} ${city}</p>
    <p>${phone}</p>
    <table>
      <tr>
        <th>Course</th>
        <th>Diet</th>
        <th>Price</th>
      </tr>
    `;
  menu.courses.forEach((course) => {
    const { name, diets, price } = course;
    html += `
          <tr>
            <td>${name}</td>
            <td>${diets ?? ' - '}</td>
            <td>${price ?? ' - '}</td>
          </tr>
          `;
  });
  html += '</table>';
  return html;
};

const restaurantWeekly = (restaurant: Restaurant, menu: weeklyMenu) => {
  const { name, address, city, postalCode, phone, company } = restaurant;
  let html = `<h3>${name}</h3>
    <p>${company}</p>
    <p>${address} ${postalCode} ${city}</p>
    <p>${phone}</p>
    `;

  menu.days.forEach((day) => {
    const { date } = day;
    html +=
      `
        <h4>${date}</h4>
        <table>
        <tr>
              <th>Course</th>
              <th>Diet</th>
              <th>Price</th>
            </tr>`


    day.courses.forEach((course) => {
      const { name, diets, price } = course;
      html += `
            <tr>
              <td>${name}</td>
              <td>${diets ?? ' - '}</td>
              <td>${price ?? ' - '}</td>
            </tr>
            `;
    });
  });
  html += '</table>';


  return html;
};

const errorModal = (message: string) => {
  const html = `
        <h3>Error</h3>
        <p>${message}</p>
        `;
  return html;
};

export { restaurantRow, restaurantDaily, restaurantWeekly, errorModal };
