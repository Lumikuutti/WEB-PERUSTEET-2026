'use strict';
import {apiURL} from './variables';
import {fetchData} from './utils';
import {restaurantModal, restaurantRow} from './components';

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
  target.innerHTML = '';

  const dialog = document.querySelector('dialog');

  for (const restaurant of restaurants) {
    const tr = restaurantRow(restaurant);

    tr.addEventListener('click', async function (evt) {
      const prev = document.querySelector('.highlight');
      if (prev) {
        prev.classList.toggle('highlight');
      }

      dialog.innerHTML = '';

      tr.classList.toggle('highlight');

      const dailyMenu = await fetchData(
        `${apiURL}/restaurants/daily/${restaurant._id}/fi`
      );

      const contents = restaurantModal(restaurant, dailyMenu, dialog);
      dialog.append(contents);
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
