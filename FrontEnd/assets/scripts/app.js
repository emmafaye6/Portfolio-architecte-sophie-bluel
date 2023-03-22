// fetching the works portion of API

fetch("http://localhost:5678/api/works")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    window.addEventListener("load", (event) => {
      let userElements = document.querySelectorAll(".userelements--hidden");
      const logoutLink = document.querySelector(".logout");
      const loginLink = document.querySelector(".login");

      if (localStorage.getItem("token") !== null) {
        userElements.forEach((userElement) => {
          userElement.classList.remove("userelements--hidden");
        });
        loginLink.classList.add("login--hidden");
        logoutLink.classList.remove("logout--hidden");
      }
    });

    //IMAGES AND CAPTIONS GENERATION

    // foreach loop will run through every object of the array

    data.forEach((works) => {
      const images = `<figure><img src="${works.imageUrl}"/></figure>`;

      const worksCaption = `<figcaption>${works.title}</figcaption>`;

      // i concatenate the images and their caption into one
      // container and add it at the end of the gallery div
      // i tell the browser to insert it before the end of the closing tag

      const worksBlock = `<div class="worksblock" data-category-id="${works.categoryId}">${images}${worksCaption}</div>`;
      document
        .querySelector(".gallery")
        .insertAdjacentHTML("beforeend", worksBlock);

      // MODAL WORK

      //generating works and "edit" text for each work that exists in api
      const modalImages = `<img class="modal__image" src="${works.imageUrl}" data-id="${works.id}"/>`;
      const modalImagesCaption = `<p>${"éditer"}</p>`;
      const moveIcon = `<div class="moveiconcontainer"><i class="fa-solid fa-arrows-up-down-left-right fa-sm" style="color:white"></i></div>`;
      const trashIcon = `<div class="trashcancontainer"><i class="fa-solid fa-trash-can modal__worksblock--icon1 fa-sm" style="color:white"></i></div>`;

      const modalWorksBlock = `<div class="modal__worksblock">${modalImages}${moveIcon}${trashIcon}${modalImagesCaption}</div>`;

      document
        .querySelector(".modal__workscontainer")
        .insertAdjacentHTML("beforeend", modalWorksBlock);
    });

    function modals() {
      const modal = document.querySelector(".modal");
      const modalCross = document.querySelector(".modal__closebutton");
      modal.classList.remove("modal--hidden");

      modalCross.addEventListener("click", (event) => {
        modal.classList.add("modal--hidden");
      });
    }
    //opening modal on click on modify button
    const modifyButton = document.querySelector(".modifybutton");
    modifyButton.addEventListener("click", (event) => {
      modals();
    });

    //opening modal on click on other modify button
    const headerModify = document.querySelector(".portfolio__header--modify");
    headerModify.addEventListener("click", (event) => {
      modals();
    });

    //modal closes whenever clicking out of it
    window.onclick = (event) => {
      const modalContainer = document.querySelector(".modal");
      const modal = document.querySelector(".modal__content");
      if (event.target.contains(modal) && event.target !== modal) {
        modalContainer.classList.add("modal--hidden");
      }
    };

    const trashButtons = document.querySelectorAll(".trashcancontainer");
    const projects = document.querySelectorAll(".modal__image");
    console.log(projects);

    trashButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        console.log("I am trash");
        console.log(projects.dataset.id);
      });
    });
  });
