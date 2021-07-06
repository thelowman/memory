const section = document.querySelector('section.cards');
const bg = document.createElement('img');
const canvas = document.querySelector('section.image').appendChild(document.createElement('canvas'));
const ctx = canvas.getContext('2d');

bg.addEventListener('load', bgLoaded);

function sizeCanvas() {
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;
}

function setBackgroundImage() {
  bg.setAttribute('src', 'images/bg1-1.jpg');
}

function bgLoaded() {
  ctx.filter = 'blur(40px)';
  ctx.drawImage(bg, 0, 0);
}

function revealBg() {
  // for(let i = 15; i > 0; i-= 5) {
  //   ctx.filter = `blur(${i}px)`;
  //   ctx.drawImage(bg, 0, 0);
  // }
}

setBackgroundImage();

let remainingCards = 18;
function start() {
  while(section.firstChild) { section.removeChild(section.firstChild); }
  let values = [];
  for(let i = 0; i < 18; i++) {
    for(let j = 0; j < 2; j++) values.push(i);
  }
  for(let i = 0; i < 36; i++) {
    let card = section.appendChild(document.createElement('div'));
    let face = card.appendChild(document.createElement('div'));
    let back = card.appendChild(document.createElement('div'));
    
    card.classList.add('card');
    face.classList.add('face');
    back.classList.add('back');

    let valIndex = Math.floor(Math.random() * values.length);
    let img = face.appendChild(document.createElement('img'));
    img.setAttribute('src', `images/${values[valIndex]}.svg`);
    face.setAttribute('data-val', values[valIndex]);
    values.splice(valIndex, 1);

    card.addEventListener('click', e => check(e.target.parentElement));
  }
  sizeCanvas();
}
start();


let card1;
let card2;
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
        while(card1.firstChild) { card1.removeChild(card1.firstChild); }
        while(card2.firstChild) { card2.removeChild(card2.firstChild); }
        remainingCards--;
        if (remainingCards === 0) revealBg();
      }
      else {
        card1.classList.remove('faceUp');
        card2.classList.remove('faceUp');
      }
      card1 = card2 = undefined;
    }, 2000);
  }
}