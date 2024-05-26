//declare two globel variable to store the uploaded image and initialize them with null
var displayImg=null;
var hideImage=null;
//Start with the Display image Upload get the data from dInput and create a new image using Simple Image API in dukeLearn to program package
function displayUpload(){
  // get the canvas element object by ID(can1)
  var canvas1 = document.getElementById("can1");
  // get the data from ID(dInput) and store in textinput
  var textinput = document.getElementById("dInput");
 // store newly created image in displayImg
  displayImg = new SimpleImage(textinput); 
  //Display the Image (displayImg) on canvas
  displayImg.drawTo(canvas1);    
}

function hideUpload(){
  var canvas2 = document.getElementById("can2");
  var textinput = document.getElementById("hInput");
  hideImage = new SimpleImage(textinput);  
  hideImage.drawTo(canvas2);
}

function stegnography(){
if(displayImg === null || hideImage === null){
  alert("Please select the Image or wait for some time");
  return null;
}
  displayImg.setSize(300,250);
  hideImage.setSize(300,250);
    var width = hideImage.getWidth();
    var height = hideImage.getHeight();
             
   var showImage = cropShiftLeft(displayImg);
   var hideImg = shiftRight(hideImage);   
    var combinedImage = combine(showImage,hideImg); 
  if(combinedImage !==null) {
    alert("Merge Successfull...!!\nRight click to save Encrupted Image");
    Clearscr();
  var canvas1 = document.getElementById("can1");
  var canvas2 = document.getElementById("can2");
 combinedImage.drawTo(canvas1);
  displayImg=combinedImage;
    
  return combinedImage;  
  }
  alert("Something went wrong plaese try again");
  return null;
}

function combine(show,hide){
  if(show !==null || hide !=null){
    var width = show.getWidth();
    var height = show.getHeight();
    //var res = new SimpleImage(width,height);
  for(var px of hide.values()){
      var x = px.getX(); var y = px.getY();
      
      var showPx = show.getPixel(x,y);
      //var resPx = hide.getPixel(x,y);
      
      showPx.setRed(showPx.getRed()+px.getRed());
      showPx.setGreen(showPx.getGreen()+px.getGreen());
      showPx.setBlue(showPx.getBlue()+px.getBlue());
  }  
  return show;
}
return null;
}
//crop function to be added after testing
/*function crop (image,width,height){
// Make copy of image using SimpleImage API from dukelearntoprogram library
    var img = new SimpleImage(image);
//Create a blank newImg with same hight and width give as parameter
    var newImg = new SimpleImage(width,height);
// Get the width(currWidth) and height(currHeight) of Image(img)
    var currWidth = img.getWidth();
    var currHeight = img.getHeight();
// Store the half of the differance (to crop image equally) of Width in startX  
    var startX = Math.floor((Math.abs(currWidth-width))/2);
// Store the half of the differance (to crop image equally) of Height in startY
    var startY = Math.floor((Math.abs(currHeight-height))/2);
// Itirate over each pixel(px)
    for(var px of newImg.values()){
        // get the X and Y position of current pixel(px)
        var x = px.getX(); var y = px.getY();
        //get The pixel at the location x+startX and y+startY of img (Image) and store in imgPx
        var imgPx = img.getPixel(x+startX, y+startY);
        // set current Pixel of newImg to imgPx
        newImg.setPixel(x,y,imgPx);
    }
    // return newImg with updated pixels from img
    return newImg;
    }
*/

function cropShiftLeft(img){
    for(var px of img.values()){
//Get RGB values of px(pixel)
        var currRed =   px.getRed();
        var currGreen = px.getGreen();
        var currBlue =  px.getBlue();
        
        px.setRed(color = Math.floor(currRed/16)*16);
       px.setGreen(color = Math.floor(currGreen/16)*16);
       px.setBlue(color = Math.floor(currBlue/16)*16);
    }
return img;
}

function shiftRight(img){
//  var img = new SimpleImage(image);
// Itirate over each pixel(px) of img   
    for(var px of img.values()){
    // Set the result value in red green and blue 
        px.setRed(color = Math.floor(px.getRed()/16));
        px.setGreen(color = Math.floor(px.getGreen()/16));
        px.setBlue(color = Math.floor(px.getBlue()/16));
    }
     
    // Return shifted img
    return img;
}

function Clearscr(){  
  var canvas1 = document.getElementById("can1")
  var ctx1 = canvas1.getContext("2d");
  var canvas2 = document.getElementById("can2")
  var ctx2 = canvas2.getContext("2d");
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
  var dInput = document.getElementById("dInput");
  var hInput = document.getElementById("hInput");
  dInput.value = null;
  hInput.value = null;
  hideImage = null;
  }

function decrupt(){
  var img = null;  
  if (displayImg != null){
  img = new SimpleImage(displayImg);
  }
  else{
    var input = document.getElementById("dInput");
    img = new SimpleImage(input);
  }   
  //var img = new SimpleImage(displayImg);
    var newImg = new SimpleImage(img.getWidth(),img.getHeight());
    for (var px of newImg.values()){
        var x = px.getX(); var y = px.getY();
        var imgPx = img.getPixel(x,y);
        var currRed = leastToMost(imgPx.getRed());
        var currGreen = leastToMost(imgPx.getGreen()); 
        var currBlue = leastToMost(imgPx.getBlue());
        
        px.setRed(currRed);
        px.setGreen(currGreen);
        px.setBlue(currBlue);
        
    }
  Clearscr();
    var canvas1 = document.getElementById("can1"); 
  var canvas2 = document.getElementById("can2");
  img.drawTo(canvas1)
  newImg.drawTo(canvas2);
  displayImg = null;
  download(newImg);
    return newImg;
}
function leastToMost(value){
var color =value;
        color = Math.floor(value%16)*16; 
        return color;
}

function download(outputImage){
const canvas = outputImage.canvas;
const dataUrl = canvas.toDataURL('image/jpeg');

const anchor = document.createElement('a');
anchor.download = 'output-image.jpg';
anchor.href = dataUrl;

anchor.style.display = 'none';
document.body.appendChild(anchor);
anchor.click();
document.body.removeChild(anchor);
}