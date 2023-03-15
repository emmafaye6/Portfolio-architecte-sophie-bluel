fetch("http://localhost:5678/api/categories")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    // adding Event listeners to test one button

    const objectsButton = document.getElementById("filter-objects");

    objectsButton.addEventListener("click", function (e) {
      console.log("I am clicked");
    });
  });
