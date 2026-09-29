const options = {
  headers: {
    "x-api-key": "reqres-free-v1",
  },
};

(async function getTest() {
  const response = await fetch("https://reqres.in/api/users", options);
  console.log(response);
})();
