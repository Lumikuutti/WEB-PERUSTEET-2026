async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok && json.message) {
      throw new Error('Error: ' + json.message);
    } else if (!response.ok) {
      throw new Error('Error: ' + response.status + response.statusText);
    }
    return json;
  } catch (error) {
    console.log(error.message);
  }
}

const apiURL = 'https://media1.edu.metropolia.fi/restaurant/api/v1';

const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

let restaurants = [];

async function getRestaurants() {
  try {
    restaurants = await fetchData(apiURL + '/restaurants');
    navigator.geolocation.getCurrentPosition(success, error, locationOptions);
  } catch (error) {
    if (restaurants.length < 1) {
      alert('Failed to get restaurants.');
    }
    console.error(error.message);
  }
}

function renderRestaurants() {
  const target = document.querySelector('table');
  const dialog = document.querySelector('dialog');
  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');

    const name_td = document.createElement('td');
    name_td.textContent = restaurant.name;

    const address_td = document.createElement('td');
    address_td.textContent = restaurant.address;

    tr.append(name_td, address_td);
    tr.addEventListener('click', async function (evt) {
      const prev = document.querySelector('.highlight');
      if (prev) {
        prev.classList.toggle('highlight');
      }

      dialog.innerHTML = '';

      tr.classList.toggle('highlight');

      const h1 = document.createElement('h1');
      h1.textContent = restaurant.name;

      const table = document.createElement('table');
      const info_address = document.createElement('td');
      info_address.textContent = restaurant.address;

      const postCode = document.createElement('td');
      postCode.textContent = restaurant.postalCode;

      const city = document.createElement('td');
      city.textContent = restaurant.city;

      const phone = document.createElement('td');
      phone.textContent = restaurant.phone;

      const company = document.createElement('td');
      company.textContent = restaurant.company;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.id = 'closeBtn';

      closeBtn.addEventListener('click', function (evt) {
        dialog.close();
      });

      table.append(info_address, postCode, city, phone, company);
      dialog.append(closeBtn, h1, table);

      //new stuff
      const dailyMenu = await fetchData(
        `${apiURL}/restaurants/daily/${restaurant._id}/fi`
      );

      const menuTable = document.createElement('table');
      menuTable.id = 'menu';

      try {
        console.log(dailyMenu.courses);
        for (const item of dailyMenu.courses) {
          const row = document.createElement('tr');
          const mealName = document.createElement('td');
          mealName.textContent = item.name;

          const mealPrice = document.createElement('td');
          mealPrice.textContent = item.price;

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
        dialog.append(menuTable);
      } catch (error) {
        console.log(error.message);
      }

      dialog.showModal();
    });

    target.append(tr);
  }
}

function success(position) {
  const x = position.coords.longitude;
  const y = position.coords.latitude;
  try {
    restaurants.sort((a, b) => {
      let distance1 = Math.sqrt(
        (a.location.coordinates[0] - x) ** 2 +
          (a.location.coordinates[1] - y) ** 2
      );

      let distance2 = Math.sqrt(
        (b.location.coordinates[0] - x) ** 2 +
          (b.location.coordinates[1] - y) ** 2
      );

      return distance1 - distance2;
    });
    renderRestaurants();
  } catch (error) {
    console.log(error.message);
  }
}

// Function to be called if an error occurs while retrieving location information
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  renderRestaurants();
}

getRestaurants();
