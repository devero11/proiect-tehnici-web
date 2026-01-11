export var map;
export var skybox;
export var wall;


function processImage(image, isMap) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const bitmap = new Uint8Array(image.width * image.height);

  if(isMap){
  for (let i = 0; i < image.width * image.height; i++) {
    bitmap[i] = imageData.data[i * 4] < 128 ? 1 : 0;
  }
  return bitmap;
  }

  return imageData.data
}

export function load(){
  //Map load
  const img = new Image();
  img.src = "assets/game_assets/test_map.png";

  img.onload = () => {
  map = processImage(img, true);
  }; 
  const skySource = new Image();
  skySource.src = "assets/game_assets/skybox.png"
  skySource.onload = () => {
  skybox = processImage(skySource, false);
    console.log(skybox)
  };
  const wallTex = new Image();
  wallTex.src = "assets/game_assets/test_texture.png"
  wallTex.onload = () => {
  wall = processImage(wallTex, false);
  };
}


