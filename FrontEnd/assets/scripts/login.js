const form = document.getElementById("login__form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;

  fetch("http://localhost:5678/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        // checking wether there is already the right token
        // if there isn't, the token will be saved to local storage
        localStorage.setItem("token", data.token);

        // redirecting user to homepage
        window.location.href = "/Frontend/index.html";
      } else {
        window.alert("Erreur dans l’identifiant ou le mot de passe");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
