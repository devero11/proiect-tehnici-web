import {load, map, skybox} from './game_src/loader.js'
import {killed,draw, canvas} from './game_src/renderer.js'
import {update} from './game_src/update.js'
import {player} from './game_src/player.js'
let rotate = 0
let gameover =true 
let highscore= localStorage.getItem("highscore")? localStorage.getItem("highscore") : 0;
let highText = document.getElementById("highscore")     
highText.textContent = "High Score: " +highscore.toString()
//SETUP FULLSCREEN LOGIC
document.body.addEventListener("click", (event) => {
const target = event.target.getAttribute("id");
const currentTarget = event.currentTarget.getAttribute("id");
  if(target == "play"){
  if (document.fullscreenElement){
    document.exitFullscreen();
    return;
  }
  gameover = false
  canvas.style.display = "block"
  canvas.requestFullscreen();
}});
document.addEventListener("fullscreenchange", () => {
  canvas.style.display = !document.fullscreenElement? "none" : "block"
})







//Input Handler
canvas.addEventListener('click', () => {
  canvas.requestPointerLock();
});

const SPEED = 3;
const keys = {};

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function updatePlayer() {
  const cos = Math.cos(player.angle);
  const sin = Math.sin(player.angle);

  let directionX=player.x
  let directionY=player.y
if (keys['n']) {
  rotate =-20
  }
if (keys['m']) {
  rotate = 20 
  }
if (!keys['n'] && !keys['m']) {
  rotate =0
  }
  // forward / backward
  if (keys['w']) {
    directionX += cos * SPEED;
    directionY += sin * SPEED;
  }
  if (keys['s']) {
    directionX -= cos * SPEED;
    directionY -= sin * SPEED;
  }
  // strafe left / right
  if (keys['a']) {
    directionX += sin * SPEED;
    directionY -= cos * SPEED;
  }
  if (keys['d']) {
    directionX -= sin * SPEED;
    directionY += cos * SPEED;
  }
  if(map &&  map[Math.round(directionX/10)+Math.round(directionY/10)*248]==0){
    player.x=directionX
    player.y=directionY
  }

  player.angle += rotate * MOUSE_SENSITIVITY;
  if(player.health<0) gameover =true
}

const MOUSE_SENSITIVITY = 0.001; // adjust to taste

document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== canvas) return;

  player.angle += e.movementX * MOUSE_SENSITIVITY;

});


document.addEventListener('keydown', (e) => {

});

document.addEventListener('keyup', (e) => {

});








//GAMELOOP
let lastTime = performance.now();
let created = false
function gameLoop(currentTime) {
  
  if(!gameover ){
  const deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;
  currentTime = performance.now()
  
  update()
  updatePlayer()
  draw(map,player,deltaTime) 
}
  else{
    canvas.display = "none"
    if(document.fullscreenElement)
document.exitFullscreen();
    if(player.health<=0 && !created){
    let overText = document.createElement("h1")
      overText.classList.add("gameoverText")
    overText.textContent = "GAME OVER"
      overText.style.color ="white"
    document.body.appendChild(overText)
      created=true
      document.getElementById("play").remove()     
let overBut = document.createElement("button")
    highText.remove()
    overBut.textContent = "Play Again"
overBut.addEventListener("click", () => {
  location.reload();

});

  localStorage.setItem("highscore", Math.max(killed,highscore))
    document.body.appendChild(overBut)
    }

  }

  requestAnimationFrame(gameLoop);
}

load() 



gameLoop();



