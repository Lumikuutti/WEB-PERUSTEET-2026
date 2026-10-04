const options = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
};

(async function postTest() {
  try {
    const response = await fetch("https://reqres.in/api/unknown/23", options);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error.message);
  }
})();

//POST and PUT succeed, while DELETE encounters an error of unexpected end of line in json
