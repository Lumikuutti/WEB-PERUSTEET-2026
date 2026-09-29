const options = {
  body: JSON.stringify({ name: "morpheus" }),
  method: "POST",
  headers: {
    "x-api-key": "reqres-free-v1",
  },
};

(async function postTest() {
  const response = await fetch("https://reqres.in/api/users", options);
  console.log(response);
})();
