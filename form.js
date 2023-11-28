window.addEventListener('DOMContentLoaded', function () {
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


//should better optimize eventlistener so it's not called twice.
// should be able to mix first and last name
const firstname = document.getElementById("firstname");
let nameMessage = document.querySelector("span.error-message"); 
firstname.addEventListener("keydown", function (event) {
    let inputValue = event.key;
    const pattern = /^[a-zA-Z]+$/u;
    if (!pattern.test(inputValue)) {
      event.preventDefault();
      firstname.classList.add("errormsg");
      nameMessage.style.display = "block";
      nameMessage.style.color = "red";
      nameMessage.textContent = 'Illegal character entered!';
      setTimeout(function () {
        nameMessage.style.display = "none";
        firstname.classList.remove("errormsg");
      }, 750)
      form_errors.push("Illegal character entered (first name)");
      console.log(form_errors);
      
    } 
    else {
      firstname.setCustomValidity("");
      nameMessage.textContent = "";
      nameMessage.style.display = "none";
      firstname.classList.remove("errormsg");
    } 
  });

  const lastname = document.getElementById("lastname");
  let lastnameMessage = document.querySelector("span.nameerror-message"); 
  lastname.addEventListener("keydown", function (event) {
      let inputValue = event.key;
      const pattern = /^[a-zA-Z]+$/u;
      if (!pattern.test(inputValue)) {
        event.preventDefault();
        lastname.classList.add("errormsg");
        nameMessage.style.display = "block";
        nameMessage.style.color = "red";
        nameMessage.textContent = 'Illegal character entered!';
        setTimeout(function () {
          nameMessage.style.display = "none";
          lastname.classList.remove("errormsg");
        }, 750)
        form_errors.push("Illegal character entered (last name)");
        console.log(form_errors);
      } 
      else {
        lastname.setCustomValidity("");
        nameMessage.textContent = "";
        nameMessage.style.display = "none";
        lastname.classList.remove("errormsg");
      } 
    });
 
    email.addEventListener("keydown", function (event) {
        let inputValue = event.key;
        const pattern = /^[a-zA-Z|0-9|+|\-|_|~|@|.]+$/u;
        if (!pattern.test(inputValue)) {
          event.preventDefault();
          email.classList.add("errormsg");
          nameMessage.style.display = "block";
          nameMessage.style.color = "red";
          nameMessage.textContent = 'Illegal character entered!';
          setTimeout(function () {
            nameMessage.style.display = "none";
            email.classList.remove("errormsg");
          }, 750)
          form_errors.push("Illegal character entered (email)");
          console.log(form_errors);
        } 
        else {
          email.setCustomValidity("");
          nameMessage.textContent = "";
          nameMessage.style.display = "none";
          email.classList.remove("errormsg");
        } 
      });

      // const form = document.querySelector("form");
      // form.addEventListener("submit", function (event) {    
      //   if (!form.checkValidity()) {
      //     form_errors.push("Form has validation errors");
    
      //     console.log(form_errors);
      //   } else {
      //     form_errors = [];
      //     // Form is valid, you can proceed with the form submission or perform additional actions
      //     console.log("Form submitted successfully");
      //   }
      // });

      //just figure out how to send to server
      let errorform = JSON.stringify(form_errors);
      console.log(errorform);
     