// fetching the works portion of API

fetch("http://localhost:5678/api/works")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
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

      const modalImages = `<img class="modal__image" src="${works.imageUrl}"/>`;
      const modalImagesCaption = `<p>${"éditer"}</p>`;

      const modalWorksBlock = `<div class="modal__worksblock">${modalImages}${modalImagesCaption}</div>`;
      console.log(modalWorksBlock);

      document
        .querySelector(".modal__workscontainer")
        .insertAdjacentHTML("beforeend", modalWorksBlock);
    });
    console.log(data);
  });
