import {load, map, skybox} from '/game_src/loader.js'
import {draw, canvas} from '/game_src/renderer.js'
import {update} from '/game_src/update.js'
import {player} from '/game_src/player.js'

//SETUP FULLSCREEN LOGIC
document.getElementById("play").addEventListener("click", () => {
  if (document.fullscreenElement){
    document.exitFullscreen();
    return;
  }
  canvas.style.display = "block"
  canvas.requestFullscreen();
});
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
  if(map && map[Math.round(directionX/10)+Math.round(directionY/10)*124]==0){
    player.x=directionX
    player.y=directionY
  }
    
}

const MOUSE_SENSITIVITY = 0.001; // adjust to taste

document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement !== canvas) return;

  player.angle += e.movementX * MOUSE_SENSITIVITY;
});









//GAMELOOP
let lastTime = performance.now();

function gameLoop(currentTime) {
  
  const deltaTime = (currentTime - lastTime) / 1000;

  lastTime = currentTime;
  currentTime = performance.now()
  
  update()
  updatePlayer()
  draw(map,player) 

  requestAnimationFrame(gameLoop);
}

load() 
gameLoop();



