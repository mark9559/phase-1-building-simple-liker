// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', () => {
  const emptyHearts = document.querySelectorAll('.like-glyph');
  
  // Add click event listeners to empty hearts
  emptyHearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      likeUnlikePost(heart);
    });
  });

  // Add click event listeners to full hearts
  const fullHearts = document.querySelectorAll('.activated-heart');
  fullHearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      likeUnlikePost(heart);
    });
  });
});

function likeUnlikePost(heart) {
  mimicServerCall()
    .then(() => {
      if (heart.classList.contains('activated-heart')) {
        // Unlike: Change the heart back to empty
        heart.classList.remove('activated-heart');
        heart.textContent = EMPTY_HEART;
      } else {
        // Like: Change the heart to full
        heart.classList.add('activated-heart');
        heart.textContent = FULL_HEART;
      }
    })
    .catch((error) => {
      const errorModal = document.getElementById('modal');
      const errorMessage = document.getElementById('modal-message');
      errorMessage.textContent = error;
      errorModal.classList.remove('hidden');

      // Hide the error modal after 3 seconds
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}


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
