'use strict';
const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok && json.message) {
    throw new Error('Error: ' + json.message);
  } else if (!response.ok) {
    throw new Error('Error: ' + response.status + response.statusText);
  }
  return json;
};

export {fetchData};
