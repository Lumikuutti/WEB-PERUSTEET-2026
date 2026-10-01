const options = {
  body: JSON.stringify({ name: "morpheus" }),
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
};

(async function postTest() {
  const response = await fetch("https://reqres.in/api/users", options);
  const json = await response.json();
  console.log(json);
})();
