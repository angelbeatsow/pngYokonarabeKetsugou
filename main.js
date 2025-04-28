let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 0;
canvas.height = 0;

let images = [];

document.getElementById("input").addEventListener("change",(event)=>{
  const file = event.target.files[0];
  let _img = new Image();
  _img.src = URL.createObjectURL(file);
  _img.onload = ()=>{
    images.push(_img);
    updateCanvas();
  };
});

function updateCanvas(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = 0;
  canvas.height = 0;
  for (var i = 0; i < images.length; i++) {
    let num = Number(i + "");
    let _img = images[num];
    canvas.width += _img.width;
    canvas.height = Math.max(canvas.height,_img.height);
    
  }
  let startXPoint = 0;
  for (var i = 0; i < images.length; i++) {
    let num = Number(i + "");
    let _img = images[num];
    ctx.drawImage(_img,startXPoint,0);
    startXPoint += _img.width +1;
  }
}

document.getElementById("clearButton").onclick = ()=>{
  images = [];
  updateCanvas();
  document.getElementById("input").value = "";
};

document.getElementById("dlButton").onclick=()=>{
  if(canvas.width == 0 || canvas.height == 0){
    window.alert("画像を追加してください");
    return;
  }
  if(document.getElementById("textInput").value == ""){
    window.alert("ファイル名を指定してください");
    return;
  }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png", 1);
    let _name = document.getElementById("textInput").value;
    //if(_name == "")_name = "pngKetsugou";
    a.download = _name + ".png";
    a.click();
};
