const form = document.getElementById("login__form");
console.log(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("I am submitted");
  const email = form.email.value;
  console.log(email);
  const password = form.password.value;
  console.log(password);
});
