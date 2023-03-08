fetch("http://localhost:5678/api/works")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);

    // FOREACH WILL RUN THROUGH EVERY ELEMENT FROM THE ARRAY

    data.forEach((works) => {
      // here i wil insert a variable with image paths

      // I CONCATENATE IMAGE FROM WORKS AND HTML TAG AND
      // TELL THE BROWSER TO ADD IT RIGHT BEFORE THE END OF FIGURE TAG

      const markup = `<figure>${works.imageUrl}</figure>`;

      document
        .querySelector(".gallery")
        .insertAdjacentHTML("beforeend", markup);

      const markupCaption = `<figcaption>${works.title}</figcaption>`;
      document
        .querySelector(".gallery")
        .insertAdjacentHTML("beforeend", markupCaption);
    });
  });
