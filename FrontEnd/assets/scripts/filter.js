fetch("http://localhost:5678/api/categories")
  .then((res) => {
    return res.json();
  })
  .then((categories) => {
    console.log(categories);

    let buttonsContainer = document.querySelector(".buttons__container");
    let buttonAll = document.querySelector("#filter-all");

    buttonAll.addEventListener("click", (event) => {
      let projects = document.querySelectorAll(".worksblock");
      projects.forEach((project) => {
        project.classList.remove("--hidden");
      });
    });

    categories.forEach((category) => {
      // creating buttons as many as there are categories
      let button = document.createElement("a");
      button.classList.add("button");
      button.innerHTML = category.name;

      //adding them to buttons container
      buttonsContainer.appendChild(button);

      button.addEventListener("click", (event) => {
        let projects = document.querySelectorAll(".worksblock");
        projects.forEach((project) => {
          project.classList.remove("--hidden");
        });

        let notCategory = document.querySelectorAll(
          `.worksblock:not([data-category-id="${category.id}"])`
        );

        notCategory.forEach((element) => {
          element.classList.add("--hidden");
        });
      });
    });

    //creating a
    const buttonList = document.querySelectorAll(".button");
    console.log(buttonList);
    buttonList.forEach((button) => {
      button.addEventListener("click", function () {
        console.log("I am clicked");
        const buttons = document.querySelectorAll(".button");
        buttons.forEach((b) => {
          b.classList.remove("button--selected");
        });
        button.classList.add("button--selected");
      });
    });
  });
