import {load, map, skybox, wall} from '/game_src/loader.js'


class Enemy{
  constructor(x,y){
    this.x = x
    this.y = y
  }
}
//SETUP CANVAS
//
export var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")
canvas.width = Math.floor(screen.width/2);
canvas.height = Math.floor(screen.height/2);
let width = canvas.width
let height = canvas.height
const imageData = ctx.createImageData(width, height);
const buffer = new Uint32Array(imageData.data.buffer);

    let frame = false

let enemies= []
enemies.push(new Enemy(500,500))

export function draw(map, player){
  //Clear scene

  if(map && skybox && wall)
  renderScene(map,player,width,height)
}

function renderScene(map,player,width,height){
  buffer.fill(0);

     
    let fov = Math.PI/2
    for(let i =Math.floor(-width/2); i<Math.floor(width/2); i++){

        //Skybox
        let degrees = (((i*(fov/width)+player.angle)*180/Math.PI%360) + 360) % 360
      let point = hitPoint(map,player,i*fov/width+player.angle)
      let distance = Math.sqrt((point.x-player.x/2)**2+(point.y-player.y/2)**2)/50
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




   




    ctx.putImageData(imageData, 0,0 );


     let enemyDist = Math.sqrt(((player.x/2-enemies[0].x/2)**2) + ((player.y/2-enemies[0].y/2)**2) )/50;
    let enemySprite = new Image()
    enemySprite.src = "assets/game_assets/enemy.png"
    let enemyAngle = Math.atan2(enemies[0].y/2-player.y/2, enemies[0].x/2-player.y/2)
 let angleDiff = enemyAngle - player.angle;

  // Normalize angle to [-PI, PI]
  angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
let enemyX 
  // Outside FOV
   enemyX = (angleDiff / fov + 0.5) * width;
  console.log(enemyX)
    let enemyY = height/(enemyDist*Math.cos((fov/(width))))
  ctx.drawImage(enemySprite,enemyX,height/2-enemyY/2,enemySprite.width*enemyY/enemySprite.height,enemyY)



    const img = new Image();
    if(performance.now()%10==0)
      frame =!frame      
    if(frame)
    img.src = "assets/game_assets/hud1.png";
    else
    img.src = "assets/game_assets/hud2.png";
    ctx.drawImage(img,0,canvas.height-img.height*height/width*2,width,img.height*height/width*2)
}


function round(n) {
    if (n - Math.floor(n) < 0.5)
        return Math.floor(n);
    return Math.floor(n + 1);
};

function hitPoint(map, player, angle) {
    let dx = Math.cos(angle) * 1000;
    let dy = Math.sin(angle) * 1000;

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

        if (map[tileY * 124 + tileX] === 1) {
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





