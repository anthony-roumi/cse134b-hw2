// const email = document.getElementById("email");
// const firstname = document.getElementById("firstname");
// const lastname = document.getElementById("lastname");
// const form = document.querySelector("form");
// const errormsg = document.getElementsByClassName("error-message");


// email.addEventListener("invalid", (e) => {
//   if (!email.checkValidity()) {
//     email.setCustomValidity("I am expecting an email address!");
//   } else {
//     email.setCustomValidity("");
//   }
// });



document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('checkbox');
  const htmlTag = document.querySelector('html');

  const savedTheme = localStorage.getItem('theme');
  if(savedTheme != null) {
    htmlTag.setAttribute('data-theme', savedTheme);

  }
  checkbox.checked = savedTheme === 'dark';

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      htmlTag.setAttribute('data-theme', 'dark');
    } else {
      htmlTag.setAttribute('data-theme', 'light')
    }

    localStorage.setItem('theme', htmlTag.getAttribute('data-theme'));

  });
});

