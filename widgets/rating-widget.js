class ratingWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const template = document.getElementById("stars");
    this.shadowRoot.innerHTML = '<style>span {display: flex;justify-content: center;margin-top: 2em;}ol {color: grey;display: flex;list-style-type: none;cursor: pointer;justify-content: center;align-content: center;margin-left: 1.2em;font-size: xx-large;gap: .2em;transform: scaleX(-1);}ol li {transition: all 80ms ease-out;}ol li:hover,ol li:hover ~ li {color: gold !important;}</style><ol><li id="fiveStar">&#9733;</li><li id="fourStar">&#9733;</li><li id="threeStar">&#9733;</li><li id="twoStar">&#9733;</li> <li id="oneStar">&#9733;</li>  </ol><span id="ratingMsg"></span>';
    let oneStar = this.shadowRoot.getElementById('oneStar');
    let twoStar = this.shadowRoot.getElementById('twoStar');
    let threeStar = this.shadowRoot.getElementById('threeStar');
    let fourStar = this.shadowRoot.getElementById('fourStar');
    let fiveStar = this.shadowRoot.getElementById('fiveStar');
    let ratingMsg = this.shadowRoot.getElementById('ratingMsg');
    function postData(rating) {
      const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://httpbin.org/post");
    xhr.setRequestHeader("X-Sent-By", "Javascript");
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
    let body = JSON.stringify({sentBy : "JS", rating: rating});
    console.log(xhr.send(body));

    }
           oneStar.addEventListener('click', function () {
              oneStar.style.color = "gold";
              twoStar.style.color = "grey";
              threeStar.style.color = "grey";
              fourStar.style.color = "grey";
              fiveStar.style.color = "grey";
              ratingMsg.innerHTML = 'Aw man 1 star :( <br> Thank you for your feedback, I must do better!'; 
              postData(1);

            });
            twoStar.addEventListener('click', function () {
              oneStar.style.color = "gold";
              twoStar.style.color = "gold";
              threeStar.style.color = "grey";
              fourStar.style.color = "grey";
              fiveStar.style.color = "grey";
              ratingMsg.innerHTML = 'Man 2 stars :/ <br> Thank you for your feedback, I will do better!';
              postData(2);
            });
            threeStar.addEventListener('click', function () {
              oneStar.style.color = "gold";
              twoStar.style.color = "gold";
              threeStar.style.color = "gold";
              fourStar.style.color = "grey";
              fiveStar.style.color = "grey";
              ratingMsg.innerHTML = '3 stars is not bad. <br> Thank you for your feedback, I will make some improvements';
              postData(3);
            });
            fourStar.addEventListener('click', function () {
              oneStar.style.color = "gold";
              twoStar.style.color = "gold";
              threeStar.style.color = "gold";
              fourStar.style.color = "gold";
              fiveStar.style.color = "grey";
              ratingMsg.innerHTML = 'Thank you for a 4 star rating!';
              postData(4);
            });
            fiveStar.addEventListener('click', function () {
              oneStar.style.color = "gold";
              twoStar.style.color = "gold";
              threeStar.style.color = "gold";
              fourStar.style.color = "gold";
              fiveStar.style.color = "gold";
              ratingMsg.innerHTML = 'Wow 5 Stars! <br> Thank you for your feedback!';
              postData(5);
            });             
          }
  }
window.customElements.define('rating-widget', ratingWidget);