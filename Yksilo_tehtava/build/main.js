'use strict';

const restaurantRow = (restaurant) => {
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
const restaurantDaily = (restaurant, menu) => {
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
const restaurantWeekly = (restaurant, menu) => {
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
        <table>`;
        day.courses.forEach((course) => {
            const { name, diets, price } = course;
            html += `
            <tr>
              <th>Course</th>
              <th>Diet</th>
              <th>Price</th>
            </tr>
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
const errorModal = (message) => {
    const html = `
        <h3>Error</h3>
        <p>${message}</p>
        `;
    return html;
};

const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error ${response.status} occured`);
    }
    const json = response.json();
    return json;
};

const apiUrl = 'https://media1.edu.metropolia.fi/restaurant/api/v1';
const positionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const modalLogin = document.querySelector('#loginDialog');
const modalRegister = document.getElementById('registerDialog');
if (!modalLogin || !modalRegister) {
    throw new Error('Modals not found');
}
modalLogin.addEventListener('click', () => {
    modalLogin.close();
});
modalRegister.addEventListener('click', () => {
    modalRegister.close();
});
const info = document.getElementById('info');
if (!info) {
    throw new Error('Info section not found');
}
const calculateDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
const createTable = (restaurants) => {
    const table = document.querySelector('table');
    if (!table) {
        throw new Error('Table not found.');
    }
    table.innerHTML = '';
    restaurants.forEach((restaurant) => {
        const tr = restaurantRow(restaurant);
        table.appendChild(tr);
        tr.addEventListener('click', async () => {
            try {
                // remove all highlights
                const allHighs = document.querySelectorAll('.highlight');
                allHighs.forEach((high) => {
                    high.classList.remove('highlight');
                });
                // add highlight
                tr.classList.add('highlight');
                // add restaurant data to modal
                info.innerHTML = '';
                // fetch menu
                const dailyMenu = await fetchData(apiUrl + `/restaurants/daily/${restaurant._id}/fi`);
                console.log(dailyMenu);
                const dailyMenuHtml = restaurantDaily(restaurant, dailyMenu);
                info.insertAdjacentHTML('beforeend', dailyMenuHtml);
                const weeklyMenu = await fetchData(apiUrl + `/restaurants/weekly/${restaurant._id}/fi`);
                console.log(weeklyMenu);
                const weeklyMenuHtml = restaurantWeekly(restaurant, weeklyMenu);
                info.insertAdjacentHTML('beforeend', weeklyMenuHtml);
            }
            catch (error) {
                info.innerHTML = errorModal(error.message);
            }
        });
    });
};
const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
const success = async (pos) => {
    try {
        const crd = pos.coords;
        const restaurants = await fetchData(apiUrl + '/restaurants');
        console.log(restaurants);
        restaurants.sort((a, b) => {
            const x1 = crd.latitude;
            const y1 = crd.longitude;
            const x2a = a.location.coordinates[1];
            const y2a = a.location.coordinates[0];
            const distanceA = calculateDistance(x1, y1, x2a, y2a);
            const x2b = b.location.coordinates[1];
            const y2b = b.location.coordinates[0];
            const distanceB = calculateDistance(x1, y1, x2b, y2b);
            return distanceA - distanceB;
        });
        createTable(restaurants);
        // buttons for filtering
        const sodexoBtn = document.querySelector('#sodexo');
        const compassBtn = document.querySelector('#compass');
        const resetBtn = document.querySelector('#reset');
        const espooBtn = document.querySelector('#espoo');
        const helsinkiBtn = document.querySelector('#helsinki');
        if (!sodexoBtn) {
            throw new Error('Sodexo button not found');
        }
        sodexoBtn.addEventListener('click', () => {
            const sodexoRestaurants = restaurants.filter((restaurant) => restaurant.company === 'Sodexo');
            console.log(sodexoRestaurants);
            createTable(sodexoRestaurants);
        });
        if (!compassBtn) {
            throw new Error('Compass button not found');
        }
        compassBtn.addEventListener('click', () => {
            const compassRestaurants = restaurants.filter((restaurant) => restaurant.company === 'Compass Group');
            console.log(compassRestaurants);
            createTable(compassRestaurants);
        });
        if (!espooBtn) {
            throw new Error('Espoo button not found');
        }
        espooBtn.addEventListener('click', () => {
            const espooRestaurants = restaurants.filter((restaurant) => restaurant.city === 'Espoo');
            console.log(espooRestaurants);
            createTable(espooRestaurants);
        });
        if (!helsinkiBtn) {
            throw new Error('Helsinki button not found');
        }
        helsinkiBtn.addEventListener('click', () => {
            const helsinkiRestaurants = restaurants.filter((restaurant) => restaurant.city === 'Helsinki');
            console.log(helsinkiRestaurants);
            createTable(helsinkiRestaurants);
        });
        if (!resetBtn) {
            throw new Error('Reset button not found');
        }
        resetBtn.addEventListener('click', () => {
            createTable(restaurants);
        });
    }
    catch (error) {
        info.innerHTML = errorModal(error.message);
    }
};
navigator.geolocation.getCurrentPosition(success, error, positionOptions);
