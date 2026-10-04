async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok && json.message) {
      throw new Error("Error: " + json.message);
    } else if (!response.ok) {
      throw new Error("Error: " + response.status + response.statusText);
    }
    return json;
  } catch (error) {
    console.log(error.message);
  }
}

const options = {
  method: "GET",
  headers: {
    "x-api-key": "reqres-free-v1",
  },
};

const url = "https://reqres.in/api/unknown/23";

fetchData(url, options);
