// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', () => {
  // Add the .hidden class to the error modal in the HTML
  const errorModal = document.getElementById('modal');
  errorModal.classList.add('hidden');

  // Select all the like-glyph elements
  const hearts = document.querySelectorAll('.like-glyph');

  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('activated-heart')) {
        // If the heart is full, empty it
        heart.classList.remove('activated-heart');
        heart.innerHTML = '&#x2661;';
      } else {
        // If the heart is empty, make a server call
        mimicServerCall()
          .then(() => {
            // On successful server response, make the heart full
            heart.classList.add('activated-heart');
            heart.innerHTML = '&#x2665;';
          })
          .catch((error) => {
            // On failure, display the error modal
            errorModal.classList.remove('hidden');
            document.getElementById('modal-message').innerText = error;
            // Hide the modal after 3 seconds
            setTimeout(() => {
              errorModal.classList.add('hidden');
            }, 3000);
          });
      }
    });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

