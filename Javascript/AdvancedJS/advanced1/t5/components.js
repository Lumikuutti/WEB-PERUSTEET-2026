'use strict';

const restaurantRow = restaurant => {
  const {name, address, company} = restaurant;
  const tr = document.createElement('tr');

  const name_td = document.createElement('td');
  name_td.textContent = name;

  const address_td = document.createElement('td');
  address_td.textContent = address;

  const company_td = document.createElement('td');
  company_td.textContent = company;

  tr.append(name_td, address_td, company_td);

  return tr;
};

const restaurantModal = (restaurant, dailyMenu, dialog) => {
  const {name, address, postalCode, city, phone} = restaurant;

  const contents = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.textContent = name;

  const table = document.createElement('table');
  const info_address = document.createElement('td');
  info_address.textContent = address;

  const postCode = document.createElement('td');
  postCode.textContent = postalCode;

  const city_td = document.createElement('td');
  city_td.textContent = city;

  const phone_td = document.createElement('td');
  phone_td.textContent = !'-' ? phone : 'No phone given';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.id = 'closeBtn';

  closeBtn.addEventListener('click', function (evt) {
    dialog.close();
  });

  table.append(info_address, postCode, city_td, phone_td);
  contents.append(closeBtn, h1, table);

  const menuTable = document.createElement('table');
  menuTable.id = 'menu';

  try {
    for (const item of dailyMenu.courses) {
      const row = document.createElement('tr');
      const mealName = document.createElement('td');
      mealName.textContent = item.name;

      const mealPrice = document.createElement('td');
      mealPrice.textContent = item.price || 'No price specified';

      const mealDiets = document.createElement('td');
      mealDiets.textContent = item.diets;

      row.append(mealName, mealPrice, mealDiets);
      menuTable.append(row);
    }
    if (dailyMenu.courses.length < 1) {
      const noMenu = document.createElement('p');
      noMenu.textContent = 'No daily menu available';
      menuTable.append(noMenu);
    }
  } catch (error) {
    console.log(error.message);
  }
  // ^

  try {
    contents.append(menuTable);
  } catch (error) {
    console.log(error.message);
  }

  return contents;
};

export {restaurantRow, restaurantModal};
