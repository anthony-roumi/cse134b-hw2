const email = document.getElementById("email");

email.addEventListener("input", (event) => {
  if (!email.checkValidity()) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});