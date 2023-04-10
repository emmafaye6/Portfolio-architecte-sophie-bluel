// fetching the projects from api when the page has loaded

fetch("http://localhost:5678/api/works")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // checking that if user is logged in, more buttons will appear
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

      const modalWorksBlock = `<div class="modal__worksblock" data-id="${works.id}">${modalImages}${moveIcon}${trashIcon}${modalImagesCaption}</div>`;

      document
        .querySelector(".modal__workscontainer")
        .insertAdjacentHTML("beforeend", modalWorksBlock);
    });

    // creating the function that will take place on click
    const modal = document.querySelector(".modal");
    function modals() {
      modal.classList.remove("modal--hidden");
    }
    //opening modal on click on modify button
    const modifyButton = document.querySelectorAll(".modifybutton");

    modifyButton.forEach((button) => {
      button.addEventListener("click", () => {
        firstModal.classList.remove("modal__content--hidden");
        modals();
      });
    });

    //opening modal on click on other modify button
    const headerModify = document.querySelector(".portfolio__header--modify");
    headerModify.addEventListener("click", () => {
      modals();
    });

    //closing modal on click on cross
    const modalCross = document.querySelectorAll(".modal__closebutton");
    modalCross.forEach((cross) => {
      cross.addEventListener("click", () => {
        secondModal.classList.add("secondmodal__content--hidden");
        modal.classList.add("modal--hidden");
        resetItems();
      });
    });

    //modal closes whenever clicking out of it
    window.onclick = (event) => {
      const modalContainer = document.querySelector(".modal");
      const modal = document.querySelector(".modal__content");

      if (event.target.contains(modal) && event.target !== modal) {
        secondModal.classList.add("secondmodal__content--hidden");
        modalContainer.classList.add("modal--hidden");
        title.value = "";
        category.value = "";
        image.classList.add("--hidden");
        placeholderIcon.classList.remove("--hidden");
        blueButton.classList.remove("--hidden");
        description.classList.remove("--hidden");
      }
    };

    // deleting a post on click on trash icon

    const trashButtons = document.querySelectorAll(".trashcancontainer");
    const token = localStorage.token;

    trashButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        fetch(`http://localhost:5678/api/works/${button.dataset.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (response.ok) {
            secondModal.classList.add("secondmodal__content--hidden");
            modal.classList.add("modal--hidden");

            let smallDeletedWork = document.querySelector(
              `.modal__worksblock[data-id="${button.dataset.id}"]`
            );
            smallDeletedWork.remove();
          }
        });
      });
    });
    // change modal content on click on the add picture button

    const addContent = document.querySelector(".modal__button");
    const firstModal = document.querySelector(".modal__content");
    const secondModal = document.querySelector(".secondmodalcontent");

    let title = document.querySelector("#newtitle");
    let category = document.querySelector("#newcategory");
    let image = document.querySelector(".image-upload");
    let blueButton = document.querySelector(".secondmodal__buttoncontainer");

    addContent.addEventListener("click", (event) => {
      event.preventDefault();
      firstModal.classList.add("modal__content--hidden");
      secondModal.classList.remove("secondmodal__content--hidden");
    });

    // back to first modal on arrow click

    const arrow = document.querySelector(".secondmodal__arrow");

    function resetItems() {
      title.value = "";
      category.value = "";
      image.classList.add("--hidden");
      placeholderIcon.classList.remove("--hidden");
      blueButton.classList.remove("--hidden");
      description.classList.remove("--hidden");
    }

    arrow.addEventListener("click", () => {
      secondModal.classList.add("secondmodal__content--hidden");
      firstModal.classList.remove("modal__content--hidden");

      resetItems();
    });

    // making logout buton functional

    const logoutButton = document.querySelector(".logout");

    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("token");
      window.location.href = "/Frontend/index.html";
    });

    // creating a picture thumbnail on upload

    const addButton = document.querySelector("#newimage");
    const description = document.querySelector(".secondmodal__buttontext");
    const placeholderIcon = document.querySelector(".secondmodal__icon");
    const buttons = document.querySelector(".secondmodal__buttoncontainer");
    const button = document.querySelector(".sendbutton");

    const preview = (event) => {
      if (event.target.files.length > 0) {
        let src = URL.createObjectURL(event.target.files[0]);
        let thumbnail = document.querySelector(".image-upload");
        thumbnail.src = src;

        // removing all unnecessary content
        placeholderIcon.classList.add("--hidden");
        addButton.classList.add("--hidden");
        description.classList.add("--hidden");
        thumbnail.classList.remove("--hidden");
        buttons.classList.add("--hidden");
        button.classList.add("sendbutton--active");
      }
    };

    addButton.addEventListener("change", function (e) {
      e.preventDefault();
      preview(e);
    });

    // post functionality

    const submitButton = document.querySelector(".sendbutton");

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();

      // ensuring that all field are completed before user can send form
      if (
        title.value == "" ||
        category.value == "" ||
        image.classList.contains("--hidden")
      ) {
        alert("L'un des champs est vide");
      }

      const categorySelector = document.querySelector(".secondmodal__input");
      categorySelector.addEventListener("click", (event) => {
        event.preventDefault();
      });

      const newImage = document.querySelector("#newimage");
      const newTitle = document.querySelector("#newtitle");
      const newCategory = document.querySelector("#newcategory");

      const data = new FormData();

      // data sent to API will be field values
      data.append("image", newImage.files[0]);
      data.append("title", newTitle.value);
      data.append("category", newCategory.value);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          const postTrash = `<div class="trashcancontainer" data-id="${data.id}"><i class="fa-solid fa-trash-can modal__worksblock--icon1 fa-xs fa-1x" style="color:white"></i></div>`;
          const postMove = `<div class="moveiconcontainer"><i class="fa-solid fa-arrows-up-down-left-right fa-xs fa-1x" style="color:white"></i></div>`;
          const postCaption = `<p>${"éditer"}</p>`;

          secondModal.classList.add("secondmodal__content--hidden");
          modal.classList.add("modal--hidden");

          resetItems();

          const newWorks = `<div class="worksblock" data-category-id="${data.categoryId}"><figure><img src="${data.imageUrl}"/></figure><figcaption>${data.title}</figcaption></div>`;
          let gallery = document.querySelector(".gallery");
          gallery.insertAdjacentHTML("beforeend", newWorks);

          const deleteGallery = document.getElementById(
            "modal__workscontainer"
          );
          let smallGalleryWorks = `<div class="modal__worksblock" data-id="${data.id}"><img class="modal__image" src="${data.imageUrl}"/>${postMove}${postTrash}${postCaption}</div>`;
          deleteGallery.insertAdjacentHTML("beforeend", smallGalleryWorks);
        });
    });
  });
