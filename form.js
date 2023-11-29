document.addEventListener('DOMContentLoaded', function () {
  const checkbox = document.getElementById('checkbox');
  const htmlTag = document.querySelector('html');

  let savedTheme = localStorage.getItem('theme');
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

let form_errors = [];

const email = document.getElementById("email");				
email.addEventListener("input", function () {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Enter a valid email address.");
    form_errors.push("Invalid email address");
  } else {
    email.setCustomValidity("");
  }  
});


const comments = document.getElementById("comments");
let commentsMessage = document.querySelector("#comments + span.error-message");
const maxCharacters = parseInt(comments.getAttribute("maxlength"));
comments.addEventListener("input", function () { 
  const remainingCharacters = maxCharacters - comments.value.length;
  commentsMessage.textContent = `${remainingCharacters}/${maxCharacters} characters remaining`;  
  if (remainingCharacters <= 50) {    
    commentsMessage.style.color = "orange";   
  }
  if (remainingCharacters <= 20) {
    commentsMessage.style.color = "red";
  }
  if (remainingCharacters > 50) {
    commentsMessage.style.color = "";
  }  
});

const firstname = document.getElementById("firstname");
let nameMessage = document.querySelector("span.error-message"); 
firstname.addEventListener("keydown", function (event) {
    let inputValue = event.key;
    const pattern = /^[a-zA-Z]+$/u;
    if (!pattern.test(inputValue)) {
      event.preventDefault();
      firstname.classList.add("error");
      nameMessage.style.display = "block";
      nameMessage.style.color = "red";
      nameMessage.textContent = 'Illegal character entered!';
      setTimeout(function () {
        nameMessage.style.display = "none";
        firstname.classList.remove("error");
      }, 750)
      form_errors.push("Illegal character entered (first name)");      
    } 
    else {
      firstname.setCustomValidity("");
      nameMessage.textContent = "";
      nameMessage.style.display = "none";
    } 
  });

  const lastname = document.getElementById("lastname");
  let lastnameMessage = document.querySelector("span.nameerror-message"); 
  lastname.addEventListener("keydown", function (event) {
      let inputValue = event.key;
      const pattern = /^[a-zA-Z]+$/u;
      if (!pattern.test(inputValue)) {
        event.preventDefault();
        lastname.classList.add("error");
        nameMessage.style.display = "block";
        nameMessage.style.color = "red";
        nameMessage.textContent = 'Illegal character entered!';
        setTimeout(function () {
          nameMessage.style.display = "none";
          lastname.classList.remove("error");
        }, 750)
        form_errors.push("Illegal character entered (last name)");
      } 
      else {
        lastname.setCustomValidity("");
        nameMessage.textContent = "";
        nameMessage.style.display = "none";
      } 
    });
 
    email.addEventListener("keydown", function (event) {
        let inputValue = event.key;
        const pattern = /^[a-zA-Z|0-9|+|\-|_|~|@|.]+$/u;
        if (!pattern.test(inputValue)) {
          event.preventDefault();
          email.classList.add("error");
          nameMessage.style.display = "block";
          nameMessage.style.color = "red";
          nameMessage.textContent = 'Illegal character entered!';
          setTimeout(function () {
            nameMessage.style.display = "none";
            email.classList.remove("error");
          }, 750)
          form_errors.push("Illegal character entered (email)");
        } 
        else {
          email.setCustomValidity("");
          nameMessage.textContent = "";
          nameMessage.style.display = "none";
        } 
      });

      const submitButton = document.getElementById("submit");
      const form = document.querySelector("form");
      submitButton.onclick = function() {
       if(!form.checkValidity()) {
        form_errors.push("Form incomplete");
       } else {
        let errorsJson = JSON.stringify(form_errors);
        let errorsInput = document.createElement('input');
        errorsInput.name = 'form-errors';
        errorsInput.value = errorsJson;
        form.appendChild(errorsInput);
        form_errors = [];
       }
      }