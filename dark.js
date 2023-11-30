const checkbox = document.getElementById('checkbox');
const htmlTag = document.querySelector('html');
const mailImg = document.querySelector('nav img');
const linkedImg = document.querySelector('nav li:last-child img');

let savedTheme = localStorage.getItem('theme');
if(savedTheme != null) {
  htmlTag.setAttribute('data-theme', savedTheme);
}
if(savedTheme === 'dark') {
  mailImg.setAttribute('src', '/images/contacticons/mailwhite.png');
  linkedImg.setAttribute('src', '/images/contacticons/linkedinwhite.png');
} else {
  mailImg.setAttribute('src', '/images/contacticons/mailicon.png');  
  linkedImg.setAttribute('src', '/images/contacticons/linkedinicon.png');
}
checkbox.checked = savedTheme === 'dark';
checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    htmlTag.setAttribute('data-theme', 'dark');
    mailImg.setAttribute('src', '/images/contacticons/mailwhite.png');
    linkedImg.setAttribute('src', '/images/contacticons/linkedinwhite.png');
  } else {
    htmlTag.setAttribute('data-theme', 'light');
    mailImg.setAttribute('src', '/images/contacticons/mailicon.png'); 
    linkedImg.setAttribute('src', '/images/contacticons/linkedinicon.png');
  }
  localStorage.setItem('theme', htmlTag.getAttribute('data-theme'));
});