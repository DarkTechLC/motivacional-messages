const message = document.querySelector('#message');
const nextBtn = document.querySelector('#next-btn');
const previousBtn = document.querySelector('#previous-btn');
const copyBtn = document.querySelector('#copy-btn');

const inputMessage = document.querySelector('#input-message');

let messages;
let count = 0;

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

(function selectBackground() {
  const backgrounds = [
    'img/back1.webp',
    'img/back2.webp',
    'img/back3.webp',
    'img/back4.webp',
  ];

  const index = generateRandomNumber(0, backgrounds.length - 1);

  document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
})();

fetch('/api/messages-api')
  .then(response => {
    response.json()
      .then(msgsResponse => {
        messages = msgsResponse;
        count = generateRandomNumber(0, messages.length - 1);
        renderMessage(messages, count);
      })
  })
  .catch(err => {
    console.log(err);
  })

function renderMessage(msgs, index = 0) {
  let textMessage = `"${msgs[index].message}"`;
  message.innerHTML = textMessage;
  inputMessage.setAttribute('value', textMessage);
};

function previousMessage() {
  count -= 1;

  if (count < 0) count = messages.length - 1;

  renderMessage(messages, count);
};

function nextMessage() {
  count += 1;

  if (count === messages.length) count = 0;

  renderMessage(messages, count);
};

function keyboardControl(e) {
  let key = e.key;

  switch (key) {
    case 'ArrowLeft':
      previousMessage();
      break;

    case 'ArrowRight':
      nextMessage();
      break;

    default:
      break;
  }
};

function copyMessageToClipboard() {
  let copyText = inputMessage;
  copyText.select();
  document.execCommand('copy');
  console.log('Text copied: ', copyText.value);
};

document.body.addEventListener('keydown', keyboardControl);
previousBtn.addEventListener('click', previousMessage);
nextBtn.addEventListener('click', nextMessage);
copyBtn.addEventListener('click', copyMessageToClipboard);
