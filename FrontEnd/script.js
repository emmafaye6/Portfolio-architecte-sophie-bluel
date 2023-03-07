fetch("http://localhost:5678/api/works")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((works) => {
      //GENERATE WORKS HERE
    });
  });
