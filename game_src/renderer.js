import {load, map, skybox, wall} from '/game_src/loader.js'

    let gunframe = 0 
let PL
class Enemy{
  constructor(x,y){
    this.x = x
    this.y = y
    this.distance = 0
  }
}
export let killed = 0
let offsetFrame= 200
//SETUP CANVAS
//
export var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")
canvas.width = Math.floor(screen.width/2);
canvas.height = Math.floor(screen.height/2);
let m
let width = canvas.width
let height = canvas.height
const imageData = ctx.createImageData(width, height);
const buffer = new Uint32Array(imageData.data.buffer);

    let frame = false
let enemyFrame =0
let enemies= []
enemies.push(new Enemy(900,900))
enemies.push(new Enemy(2000,2000))

let hudFrame=0
export function draw(map, player,deltaTime){
  //Clear scene
   
  if(map && skybox && wall)
  renderScene(map,player,width,height,deltaTime)

  m = map
}

function renderScene(map,player,width,height,deltaTime){
  PL = player
  buffer.fill(0);

     
    let fov = Math.PI/2
    for(let i =Math.floor(-width/2); i<Math.floor(width/2); i++){

        //Skybox
        let degrees = (((i*(fov/width)+player.angle)*180/Math.PI%360) + 360) % 360
      let point = hitPoint(map,player,i*fov/width+player.angle)
      let distance = Math.sqrt((point.x-player.x/2)**2+(point.y-player.y/2)**2)/50
distance = Math.max(distance, 0.3);
      let w=255/(distance)
      w=Math.min(255,Math.floor(w))
      //ctx.strokeStyle=`rgb(${w}, ${w}, ${w})`;
      //ctx.lineWidth = 10
      //ctx.beginPath()
      let columnHeight =1.5* height / (distance*Math.cos(i*(fov/(width))))  
      let yTop = (height / 2) - (columnHeight / 2) ;
      let yBottom = yTop + columnHeight;


      for(let j = 0; j<height; j++){

        let w = 1024;
        let h = 258;
        let x = Math.floor(degrees * (w-1)/360);
        let y = Math.floor(j * h / height);
        let index = (y * w + x) * 4;
        //ctx.fillStyle = `rgb(${skybox[index]}, ${skybox[index+1]}, ${skybox[Math.floor(degrees*255/360)*4*j*124+2]})`
        //ctx.fillRect(screen.width*(i+250)/500,j*screen.height/124,10,10)
        setPixel(Math.floor(i+width/2), Math.floor((j)),color(skybox[index],skybox[index+1],skybox[index+2],255)) 
      
      }
      

      //walls
            //ctx.moveTo(screen.width*(i+250)/500,yTop)
      //ctx.lineTo(screen.width*(i+250)/500,yBottom)
      //ctx.stroke()
      //ctx.closePath()
      
      for(let j = 0; j< columnHeight; j++){


      let wallX;
      let TEX_W = 124; 
      if (point.vertical) {
          wallX = point.y / 124;
      } else {
          wallX = point.x / 124;
      }
      wallX = wallX - Math.floor(wallX);
      let texY= Math.floor(j*123/columnHeight)
      let texX = Math.floor(wallX * TEX_W);

      let index = (texY * TEX_W +texX ) * 4;
        setPixel(Math.floor(i+width/2), Math.floor(yTop)+j,  color(wall[index]/(!point.vertical+1),wall[index+1]/(!point.vertical+1),wall[index+2]/(!point.vertical+1),255))
        //drawColumn(Math.floor(i+width/2), Math.floor(yTop),Math.floor(yBottom), color(w,w,w,255))
      }
    } 



    
   

    MoveEnemies(deltaTime,player)  

    ctx.putImageData(imageData, 0,0 );

    let enemySprite = new Image()
    enemySprite.src = "assets/game_assets/enemy.png"
 
    enemies.forEach(enemy => {
      
      
     enemy.distance = Math.sqrt(((player.x/2-enemy.x/2)**2) + ((player.y/2-enemy.y/2)**2) )/50;
    })
enemies.sort((a, b) => -a.distance + b.distance);
    enemies.forEach(enemy => {
     let enemyAngle = Math.atan2(enemy.y/2-player.y/2, enemy.x/2-player.x/2)
     let angleDiff =enemyAngle-player.angle;
     angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
     let enemyX 
     enemyX = (angleDiff / fov +0.5 ) * width;
     let enemyY = height/(enemy.distance*Math.cos((fov/(width))))
   ctx.drawImage(enemySprite,
    
    enemyFrame,0,200,258,

    enemyX-(enemySprite.width*enemyY/enemySprite.height)/6,height/2-enemyY/1.5 + 10,enemySprite.width*enemyY/enemySprite.height/3*1.5,enemyY*1.5)
    if(enemy.distance<1){
      player.health-=deltaTime%1000;
      offsetFrame = 400
    }else{
      offsetFrame =200
    }
  if(enemyFrame == 400)
  {
    ctx.fillStyle = "#ff000044"
    ctx.fillRect(0,0,width,height)
  }

    });

   if(player.health<0)
      console.log("gameover")


const gun = new Image();
    gun.src = "assets/game_assets/gun.png";
    ctx.drawImage(gun,
      gunframe,0,68,80,
      width/2-width/12,height-gun.height*width/height*1.8,width/6,gun.height*width/height)

     
    const img = new Image();
    
    img.src = "assets/game_assets/hud1.png";
    ctx.drawImage(img,
      hudFrame,0,640,120,
      0,canvas.height-img.height*height/width*2,width,img.height*height/width*2)
ctx.font = "28px serif";
  ctx.fillStyle = "red"
  ctx.fillText("Health",  width/5,height-90);
ctx.font = "48px serif";
  ctx.fillStyle = "red"
  ctx.fillText(Math.ceil(player.health*5).toString()+"%", width/5,height-50);
ctx.font = "28px serif";
  ctx.fillStyle = "blue"
  ctx.fillText("Kills",  width-width/5,height-90);
ctx.font = "48px serif";
  ctx.fillStyle = "blue"
  ctx.fillText(Math.ceil(killed).toString(), width-width/5,height-50);


}
setInterval(() => {
  // do somethingo
    if(hudFrame==0) 
  hudFrame=640
  else
    hudFrame= 0

}, 1845);

setInterval(() => {
  // do somethingo
  if(enemyFrame==0) 
  enemyFrame=offsetFrame
  else
    enemyFrame= 0
}, 1000);

function round(n) {
    if (n - Math.floor(n) < 0.5)
        return Math.floor(n);
    return Math.floor(n + 1);
};

function hitPoint(map, player, angle) {
    let dx = Math.cos(angle) * 2000;
    let dy = Math.sin(angle) * 2000;

    let step = Math.max(Math.abs(dx), Math.abs(dy));
    let x_incr = dx / step;
    let y_incr = dy / step;

    let x = player.x / 2;
    let y = player.y / 2;

    let prevTileX = Math.floor(x / 5);
    let prevTileY = Math.floor(y / 5);

    for (let i = 0; i < step; i++) {
        let tileX = Math.floor(x / 5);
        let tileY = Math.floor(y / 5);

        if (map[tileY * 248 + tileX] === 1) {
            return {
                x,
                y,
                vertical: Math.abs(tileX - prevTileX) > Math.abs(tileY - prevTileY)  // crossed x boundary
            };
        }

        prevTileX = tileX;
        prevTileY = tileY;

        x += x_incr;
        y += y_incr;
    }
  return {x:0, y:0, vertical:0}
}


function color(r, g, b, a = 255) {
  return (a << 24) | (b << 16) | (g << 8) | r;
}
function setPixel(x, y, col) {
  buffer[(y) * width + x] = col;
}
function drawColumn(x, top, bottom, col) {
  for (let y = top; y < bottom; y++) {
    buffer[y * width + x] = col;
  }
}


function MoveEnemies(deltaTime,player){
  
  enemies.forEach(enemy => {
    if(deltaTime && enemy.distance > 0.7){
      enemy.x = enemy.x + deltaTime*Math.sign(player.x-enemy.x)*100
      enemy.y = enemy.y + deltaTime*Math.sign(player.y-enemy.y)*100 
    }
  });
}

function Shoot(player){
    gunframe=69
  setTimeout(() => {
    gunframe=0 
  }, 250);
    for (let i = enemies.length - 1; i >= 0; i--) {
      let enemyAngle = Math.atan2(enemies[i].y/2-player.y/2, enemies[i].x/2-player.x/2)
      let angleDiff =enemyAngle-player.angle;
      angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
      if(angleDiff<0.5/enemies[i].distance && angleDiff>-0.5/enemies[i].distance) 
      {enemies.splice(i, 1);
        killed+=1
      }


    }
}

setInterval(() => {
  let x = Math.floor(Math.random()*247)
  let y = Math.floor(Math.random()*247)
  if(map){
  while(map[y + x*248] == 1){
     x = Math.floor(Math.random()*247)
     y = Math.floor(Math.random()*247)
  }
  enemies.push(new Enemy(x*10, y*10)) 
  }
}, 1000);

window.addEventListener('keyup', (event) => {
  console.log(event.key.toLowerCase())
  if(event.key.toLowerCase() == "b")
  Shoot(PL)
});
canvas.addEventListener('click', () => {

  Shoot(PL)
});
