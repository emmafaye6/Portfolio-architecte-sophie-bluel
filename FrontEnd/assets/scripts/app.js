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
      const modalImages = `<img class="modal__image" src="${works.imageUrl}"/>`;
      const modalImagesCaption = `<p>${"éditer"}</p>`;
      const moveIcon = `<div class="moveiconcontainer"><i class="fa-solid fa-arrows-up-down-left-right fa-xs fa-1x" style="color:white"></i></div>`;
      const trashIcon = `<div class="trashcancontainer" data-id="${works.id}"><i class="fa-solid fa-trash-can modal__worksblock--icon1 fa-xs fa-1x" style="color:white"></i></div>`;

      const modalWorksBlock = `<div class="modal__worksblock">${modalImages}${moveIcon}${trashIcon}${modalImagesCaption}</div>`;

      document
        .querySelector(".modal__workscontainer")
        .insertAdjacentHTML("beforeend", modalWorksBlock);
    });

    function modals() {
      const modal = document.querySelector(".modal");
      modal.classList.remove("modal--hidden");

      const modalCross = document.querySelectorAll(".modal__closebutton");

      modalCross.forEach((cross) => {
        cross.addEventListener("click", (event) => {
          modal.classList.add("modal--hidden");
        });
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
    const token = localStorage.token;

    trashButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        fetch(`http://localhost:5678/api/works/${button.dataset.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.ok) {
            console.log("response is ok");
          } else {
            console.log("response is not ok");
          }
        });
      });
    });

    // change modal content on click on the add picture button
    const addContent = document.querySelector(".modal__button");

    const firstModal = document.querySelector(".modal__content");
    const secondModal = document.querySelector(".secondmodalcontent");

    addContent.addEventListener("click", (event) => {
      event.preventDefault();
      firstModal.classList.add("modal__content--hidden");
      secondModal.classList.remove("secondmodal__content--hidden");
    });

    // back to first modal on arrow click

    const arrow = document.querySelector(".secondmodal__arrow");

    arrow.addEventListener("click", (event) => {
      console.log("I am the arrow");
      secondModal.classList.add("secondmodal__content--hidden");
      firstModal.classList.remove("modal__content--hidden");
    });

    // creating a picture thumbnail on upload
  });
