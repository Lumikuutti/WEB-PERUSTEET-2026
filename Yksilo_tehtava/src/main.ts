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
  checkToken();
})

const modalLogin = document.querySelector('#loginDialog') as HTMLDialogElement | null;
const modalRegister = document.getElementById('registerDialog') as HTMLDialogElement | null;
const update = document.querySelector('#update') as HTMLDialogElement | null;
const avatarUpload = document.querySelector('#avatarUpload') as HTMLDialogElement | null;
const loginClose = document.querySelector('#loginClose')
const registerClose = document.querySelector('#registerClose')
const updateClose = document.querySelector('#updateClose')
const avatarClose = document.querySelector('#avatarClose')

if (!loginClose || !registerClose || !updateClose || !avatarClose) {
  throw new Error('Close buttons not found');
}

if (!modalLogin || !modalRegister || !update || !avatarUpload) {
  throw new Error('Modals not found');
}
loginClose.addEventListener('click', () => {
  modalLogin.close();
});

registerClose.addEventListener('click', () => {
  modalRegister.close();
});

updateClose.addEventListener('click', () => {
  update.close();
});

avatarClose.addEventListener('click', () => {
  avatarUpload.close();
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
    const favorite = document.createElement('td')
    favorite.innerText = '☆'
    favorite.classList.add('star')

    favorite.addEventListener('click', async () => {
      const user: UpdateUser = {
        favoriteRestaurant: restaurant.name,
      };
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Login first');
        return;
      }
      const updateResult = await updateUserData(user, token);
      console.log(updateResult);
    })

    tr.appendChild(favorite)
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

    const search = document.querySelector('#search')
    const searchValue = document.querySelector('#searchValue') as HTMLInputElement | null

    if (!search || !searchValue) {
      throw new Error('Search element(s) not found.')
    }

    search.addEventListener('click', () => {
      let searchRestaurants = restaurants.filter(
        (restaurant: Restaurant) => restaurant.name.includes(searchValue.value)
      );
      console.log(searchRestaurants);
      createTable(searchRestaurants);
    })

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


const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const profileForm = document.querySelector('#updateForm');
const avatarForm = document.querySelector('#avatarForm');

const loginUsernameInput = document.querySelector('#loginUsername') as HTMLInputElement | null;
const loginPasswordInput = document.querySelector('#loginPassword') as HTMLInputElement | null;

const registerUsernameInput = document.querySelector('#registerUsername') as HTMLInputElement | null;
const registerPasswordInput = document.querySelector('#registerPassword') as HTMLInputElement | null;
const registerEmailInput = document.querySelector('#registerEmail') as HTMLInputElement | null;

const profileUsernameInput = document.querySelector('#updateUsername') as HTMLInputElement | null;
const profileEmailInput = document.querySelector('#updateEmail') as HTMLInputElement | null;

if (!loginForm || !registerForm || !profileForm || !avatarForm) {
  throw new Error('Forms not found.')
}

const loginFunction = async (): Promise<LoginUser> => {
  const credentials = {
    username: loginUsernameInput?.value,
    password: loginPasswordInput?.value
  }

  const loginOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };
  return await fetchData(apiUrl + '/auth/login', loginOptions);
};

const registerFunction = async (): Promise<CreateUser> => {
  const credentials = {
    username: registerUsernameInput?.value,
    password: registerPasswordInput?.value,
    email: registerEmailInput?.value
  }

  const registerOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };
  return await fetchData(apiUrl + '/users', registerOptions);
};

const updateUserData = async (
  user: UpdateUser,
  token: string
): Promise<UpdateResult> => {
  const updateOptions: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(user),
  };
  return await fetchData(apiUrl + '/users', updateOptions);
};

const addUserDataToDom = (user: User): void => {
  info.innerHTML = '';
  const { avatar, email, username, favouriteRestaurant } = user
  info.innerHTML =
    `
  <img src="${uploadUrl + avatar}" alt="User Avatar">
  <h1>${username}</h1>
  <p>${email}</p>
  `
  if (favouriteRestaurant) {
    info.innerHTML += `<p>${favouriteRestaurant}</p>`
  }

  info.innerHTML +=
    `<button id="updateBtn">Change Username/Email</button>
    <button id="avatarBtn">Change/Add Avatar</button>`

  const updateBtn = document.querySelector('#updateBtn')
  const avatarBtn = document.querySelector('#avatarBtn')

  if (!updateBtn || !avatarBtn) {
    throw new Error('Update buttons not found.')
  }

  updateBtn.addEventListener('click', () => {
    update.showModal()
  })

  avatarBtn.addEventListener('click', () => {
    avatarUpload.showModal()
  })

};

const getUserData = async (token: string): Promise<User> => {
  const udataOptions: RequestInit = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  return await fetchData(apiUrl + '/users/token', udataOptions);
};

const checkToken = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }
  try {
    const userData = await getUserData(token);
    addUserDataToDom(userData);
  } catch (error) {
    alert((error as Error).message);
  }
};

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const user = await loginFunction();
  console.log(user);
  localStorage.setItem('token', user.token);
  addUserDataToDom(user.data);
});

registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const newUser = await registerFunction();
  console.log(newUser);
  const credentials = {
    username: registerUsernameInput?.value,
    password: registerPasswordInput?.value
  }

  const loginOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };
  const user: LoginUser = await fetchData(apiUrl + '/auth/login', loginOptions);
  localStorage.setItem('token', user.token);
  addUserDataToDom(user.data);
  modalRegister.close();
});

avatarForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const token = localStorage.getItem('token');
  if (!(avatarForm instanceof HTMLFormElement) || !token) {
    return;
  }
  const formData = new FormData(avatarForm);
  const options: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  };
  const avatarResult = await fetchData<UploadResult>(
    apiUrl + '/users/avatar',
    options
  );
  const updateResult = await updateUserData(
    { avatar: avatarResult.data.avatar },
    token
  );
  addUserDataToDom(updateResult.data);
  avatarUpload.close();
});

profileForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const user: UpdateUser = {
    username: profileUsernameInput?.value,
    email: profileEmailInput?.value,
  };
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Login first');
    return;
  }
  const updateResult = await updateUserData(user, token);
  console.log(updateResult);
  addUserDataToDom(updateResult.data);
  update.close();
});

checkToken();

navigator.geolocation.getCurrentPosition(success, error, positionOptions);
