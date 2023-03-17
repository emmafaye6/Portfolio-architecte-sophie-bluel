//fetching data from the api
fetch("http://localhost:5678/api/categories")
  .then((res) => {
    return res.json();
  })
  .then((categories) => {
    let buttonsContainer = document.querySelector(".buttons__container");

    // creating as many buttons as there are categories

    categories.forEach((category) => {
      let button = document.createElement("a");
      button.classList.add("button");
      // the button's content matches the cateegorie's name
      button.innerHTML = category.name;

      // adding them to buttons container
      buttonsContainer.appendChild(button);

      button.addEventListener("click", (event) => {
        let projects = document.querySelectorAll(".worksblock");
        projects.forEach((project) => {
          //removing the hidden category so we don't end up with 0 project showing
          project.classList.remove("--hidden");
        });

        // i target every element in the works block that does not have the cateory id
        let notCategory = document.querySelectorAll(
          `.worksblock:not([data-category-id="${category.id}"])`
        );
        // i add a class of hidden to those elements
        notCategory.forEach((element) => {
          element.classList.add("--hidden");
        });
      });
    });

    // when clicking the all button, every project that was hidden reappears
    let buttonAll = document.querySelector("#filter-all");
    buttonAll.addEventListener("click", (event) => {
      let projects = document.querySelectorAll(".worksblock");
      projects.forEach((project) => {
        project.classList.remove("--hidden");
      });
    });

    //
    const buttonList = document.querySelectorAll(".button");

    // removes active class from buttons that should not be active
    buttonList.forEach((button) => {
      button.addEventListener("click", function () {
        const buttons = document.querySelectorAll(".button");
        buttons.forEach((b) => {
          b.classList.remove("button--selected");
        });
        button.classList.add("button--selected");
      });
    });
  });
