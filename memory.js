const cards = document.querySelector('section.cards');
const obscured = document.querySelector('section.obscured');
const image = document.querySelector('section.image>img');
const obscuredImg = document.querySelector('section.obscured>img');

let card1, card2;
let remainingCards = 18;
let tries = 0;

function setImage() {
  const img = Math.floor(Math.random() * 5);
  image.setAttribute('src', `images/backgrounds/${img}.jpg`);
  obscuredImg.setAttribute('src', `images/backgrounds/${img}.jpg`);
}

function revealBg() {
  obscured.classList.add('revealed');
  console.log('tries', tries);
}

setImage();

function start() {
  obscured.classList.remove('revealed');
  setImage();
  remainingCards = 18;
  tries = 0;

  while(cards.firstChild) { cards.removeChild(cards.firstChild); }
  let values = [];
  for(let i = 0; i < 18; i++) {
    for(let j = 0; j < 2; j++) values.push(i);
  }
  for(let i = 0; i < 36; i++) {
    let card = cards.appendChild(document.createElement('div'));
    let face = card.appendChild(document.createElement('div'));
    let back = card.appendChild(document.createElement('div'));
    
    card.classList.add('card');
    face.classList.add('face');
    back.classList.add('back');

    let valIndex = Math.floor(Math.random() * values.length);
    let img = face.appendChild(document.createElement('img'));
    img.setAttribute('src', `images/cards/${values[valIndex]}.svg`);
    face.setAttribute('data-val', values[valIndex]);
    values.splice(valIndex, 1);

    card.addEventListener('click', cardClick);
  }
}
start();

function cardClick(e) {
  check(e.target.parentElement);
}

function check(card) {
  if (card1 && card2 || card === card1) return;
  card.classList.add('faceUp');
  if (!card1) {
    card1 = card;
    return;
  }
  else {
    card2 = card;
    setTimeout(() => {
      if (card1.children[0].getAttribute('data-val') === card2.children[0].getAttribute('data-val')) {
        while(card1.firstChild) card1.removeChild(card1.firstChild);
        while(card2.firstChild) card2.removeChild(card2.firstChild);
        card1.removeEventListener('click', cardClick);
        card2.removeEventListener('click', cardClick);
        remainingCards--;
        if (remainingCards === 0) revealBg();
      }
      else {
        card1.classList.remove('faceUp');
        card2.classList.remove('faceUp');
      }
      tries++;
      card1 = card2 = undefined;
    }, 2000);
  }
}

function autoPlay() {
  setTimeout(() => {
    while(remainingCards > 0) {

    }
  }, 2000);
}