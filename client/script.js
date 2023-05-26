/* import assets */
import bot from './assets/bot.svg';
import user from './assets/user.svg';

/* target the elements manually by using .querySelector */
const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat-container');

let loadInterval;

function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi ? 'ai' : ''}">
      <div class="chat">
        <div class="profile">
          <img 
            src="${isAi ? bot : user}"
            alt="${isAi ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id="${uniqueId}">${value}</div>
      </div>
    </div>
  `;
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(form);

  const userMessage = data.get('prompt');
  const botUniqueId = generateUniqueId();

  // user's chatStripe
  chatContainer.insertAdjacentHTML('afterbegin', chatStripe(false, userMessage));
  // bot's chatstripe
  chatContainer.insertAdjacentHTML('afterbegin', chatStripe(true, '', botUniqueId));

  // clear the form
  form.reset();

  const botMessageDiv = document.getElementById(botUniqueId);
  
  loader(botMessageDiv);

  // Scroll to the top to show new messages
  chatContainer.scrollTop = 0;
};

form.addEventListener('submit', handleSubmit);

// to submit by pressing enter
form.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleSubmit(event);
  }
});