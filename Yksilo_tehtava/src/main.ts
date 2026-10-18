import { errorModal, restaurantDaily, restaurantWeekly, restaurantRow } from './components';
import { fetchData } from './functions';
import { apiUrl, uploadUrl, positionOptions } from './variables';
import { dailyMenu, weeklyMenu } from './interfaces/Menu';
import { Restaurant } from './interfaces/Restaurant';
import { User, LoginUser, UpdateUser, CreateUser } from './interfaces/User'
import { UpdateResult } from './interfaces/UpdateResult';
import { UploadResult } from './interfaces/UploadResult';

let chosenRestaurant: Restaurant;

const login = document.querySelector('#login');
const regLink = document.querySelector('#registerLink')
const logLink = document.querySelector('#loginLink')
const daily = document.querySelector('#daily');
const weekly = document.querySelector('#weekly');
const userInfo = document.querySelector('#userInfo');

if (!daily || !weekly || !userInfo) {
  throw new Error('Info buttons not found');
}

if (!regLink || !logLink) {
  throw new Error('Modal links not found');
}

const info = document.getElementById('info');

if (!info) {
  throw new Error('Info section not found');
}

daily.addEventListener('click', async () => {
  info.innerHTML = '';

  if (!chosenRestaurant) {
    info.innerHTML = '<p>Pick a restaurant first.</p>'
  }

  else {

    const dailyMenu = await fetchData<dailyMenu>(
      apiUrl + `/restaurants/daily/${chosenRestaurant._id}/fi`
    );
    console.log(dailyMenu);

    const dailyMenuHtml = restaurantDaily(chosenRestaurant, dailyMenu);
    info.insertAdjacentHTML('beforeend', dailyMenuHtml);
  }
});

weekly.addEventListener('click', async () => {
  info.innerHTML = '';

  if (!chosenRestaurant) {
    info.innerHTML = '<p>Pick a restaurant first.</p>'
  }

  else {
    const weeklyMenu = await fetchData<weeklyMenu>(
      apiUrl + `/restaurants/weekly/${chosenRestaurant._id}/fi`
    );
    console.log(weeklyMenu);

    const weeklyMenuHtml = restaurantWeekly(chosenRestaurant, weeklyMenu);
    info.insertAdjacentHTML('beforeend', weeklyMenuHtml);
  }
});

userInfo.addEventListener('click', async () => {
  info.innerHTML = '';
})

const modalLogin = document.querySelector('#loginDialog') as HTMLDialogElement | null;
const modalRegister = document.getElementById('registerDialog') as HTMLDialogElement | null;
if (!modalLogin || !modalRegister) {
  throw new Error('Modals not found');
}
modalLogin.addEventListener('click', () => {
  modalLogin.close();
});

modalRegister.addEventListener('click', () => {
  modalRegister.close();
});

if (!login) {
  throw new Error('Login button not found');
}

login.addEventListener('click', () => {
  modalLogin.showModal()
})

regLink.addEventListener('click', () => {
  modalLogin.close()
  modalRegister.showModal()
})

logLink.addEventListener('click', () => {
  modalRegister.close()
  modalLogin.showModal()
})

const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const createTable = (restaurants: Restaurant[]) => {
  const table = document.querySelector('table');
  if (!table) {
    throw new Error('Table not found.')
  }
  table.innerHTML = '';
  restaurants.forEach((restaurant): void => {
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

        chosenRestaurant = restaurant;

        info.innerHTML = '';

        // fetch menu
        const dailyMenu = await fetchData<dailyMenu>(
          apiUrl + `/restaurants/daily/${restaurant._id}/fi`
        );
        console.log(dailyMenu);

        const dailyMenuHtml = restaurantDaily(restaurant, dailyMenu);
        info.insertAdjacentHTML('beforeend', dailyMenuHtml);

      } catch (error) {
        info.innerHTML = errorModal((error as Error).message);
      }

    });
  });
};



const error = (err: GeolocationPositionError) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

const success = async (pos: GeolocationPosition) => {
  try {
    const crd = pos.coords;
    const restaurants = await fetchData<Restaurant[]>(apiUrl + '/restaurants');
    console.log(restaurants);
    restaurants.sort((a: Restaurant, b: Restaurant) => {
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
    const espooBtn = document.querySelector('#espoo')
    const helsinkiBtn = document.querySelector('#helsinki')

    if (!sodexoBtn) {
      throw new Error('Sodexo button not found');
    }

    sodexoBtn.addEventListener('click', () => {
      const sodexoRestaurants = restaurants.filter(
        (restaurant: Restaurant) => restaurant.company === 'Sodexo'
      );
      console.log(sodexoRestaurants);
      createTable(sodexoRestaurants);
    });

    if (!compassBtn) {
      throw new Error('Compass button not found');
    }

    compassBtn.addEventListener('click', () => {
      const compassRestaurants = restaurants.filter(
        (restaurant: Restaurant) => restaurant.company === 'Compass Group'
      );
      console.log(compassRestaurants);
      createTable(compassRestaurants);
    });

    if (!espooBtn) {
      throw new Error('Espoo button not found');
    }

    espooBtn.addEventListener('click', () => {
      const espooRestaurants = restaurants.filter(
        (restaurant: Restaurant) => restaurant.city === 'Espoo'
      );
      console.log(espooRestaurants);
      createTable(espooRestaurants);
    });

    if (!helsinkiBtn) {
      throw new Error('Helsinki button not found');
    }

    helsinkiBtn.addEventListener('click', () => {
      const helsinkiRestaurants = restaurants.filter(
        (restaurant: Restaurant) => restaurant.city === 'Helsinki'
      );
      console.log(helsinkiRestaurants);
      createTable(helsinkiRestaurants);
    });

    if (!resetBtn) {
      throw new Error('Reset button not found');
    }

    resetBtn.addEventListener('click', () => {
      createTable(restaurants);
    });
  } catch (error) {
    info.innerHTML = errorModal((error as Error).message);
  }
};

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
