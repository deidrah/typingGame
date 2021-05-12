const quotes = [
  'Things are only impossible until they are not',
  'It is possible to commit no errors and still lose. That is not a weakness. That is life',
  'There is a way out of every box, a solution to every puzzle; it is just a matter of finding it.',
  'Without freedom of choice there is no creativity',
  'Logic is the beginning of wisdom, not the end',
  'Improve a mechanical device and you may double productivity. But improve yourself, you gain a thousandfold',
  'Compassion: that is the one thing no machine ever had. Maybe it is the one thing that keeps us ahead of them.',
];

let highlightPosition;
let wordQueue;
let startTime;

const quote = document.getElementById('quote');
const message = document.getElementById('message');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');

function startGame() {
  const quoteIndex = Math.floor(Math.random() * quotes.length);  // generate a random number between 0 and 6
  const quoteText = quotes[quoteIndex]; // set the random number to be the index of the quotes array, to select one of the quotes at random
  
  highlightPosition = 0;  // set the highlight position to be the 0th element (the first word)
  wordQueue = quoteText.split(' '); // split the string into separate strings each containing one word
  
  quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join(''); // wrap each word in a span, then join all of the separate spanned words into a string again.
  
  quote.childNodes[highlightPosition].className = 'highlight'; // add a class to the span at the index of highlightedPosition
  
  input.focus();  // put the focus on the input so that the user doesn't have to click into it
  input.value = ''; // empty the input in case the user has typed into it
  message.innerText = ''; // empty the text in the message (incase it previously had winner text in it)
  
  startTime = new Date().getTime(); // get the current time (the time the game was started)
  document.body.className = ''; // remove the winner class from the body
  start.className = 'started'; // add a class to the start button to animate the rocket
  setTimeout(() => { start.className = 'button'}, 2000); // remove the rocket animate class after two seconds and set it back to just a plain old button
}

function checkInput() {
  // first we remove any punctuation from the word so that the user doesn't have to type it
  const currentWord = wordQueue[0].replaceAll('.', '').replaceAll(',','').replaceAll(';','');
  
  // then we remove any spaces that the user has typed (this is what trim does)
  const typedValue = input.value.trim();
  
  if (currentWord !== typedValue) {
    input.className = currentWord.startsWith(typedValue) ? '' : 'error'; // if the typed value isn't found in the current word then add an error class to the input
    return
  }
  
  wordQueue.shift() // shift removes first item from an array
  input.value = ''; // clear the input
  quote.childNodes[highlightPosition].className = ''; // unlighlight the words in the hint by removing the hightlight class
  
  if (wordQueue.length === 0) {    // if the word queue is empty then the game is over!
    gameOver();
    return;
  }
  
  // if the game is not over then we increment the highlighter position until it is finished
  
  highlightPosition++; // increment highlighted word index
  quote.childNodes[highlightPosition].className = 'highlight';  // add the highlighted class to the word at the new highlighted word index
}

function gameOver() {
  const elapsedTime = new Date().getTime() - startTime;  // get current time in ms, delete the start time in ms
  document.body.className = "winner";  // style the page to show confetti
  message.innerHTML = `<span class="congrats">Congratulations!</span> <br> You finished in ${elapsedTime / 1000} seconds.`   // add some winner text to the message paragraph
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);