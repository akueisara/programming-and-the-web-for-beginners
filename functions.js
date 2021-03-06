/** program 1 */
print("Program 1");
// The function swaps the red and green values of the pixel
function swapRedGreen (pixel){
    pix.setRed(pix.getGreen());
    pix.setGreen(pix.getRed());
}
print("The original image");
var image = new SimpleImage("palm-and-beach.png");
print(image);

for(var pix of image.values()){
    swapRedGreen(pix);
}

print("The resulting image");
print(image);

/** program 2 */
print("Program 2");
// The function makes an image have more red in it
function moreRed (pixel, value){
    var currentRed = pix.getRed();
    var totalRed = currentRed + value;
    if(totalRed <= 255){
        pix.setRed(totalRed);
        return true;
    }
    else
        return false;
}

print("The original image");
var image = new SimpleImage("duke_blue_devil.png");
print(image);

for(var pix of image.values()){
    var a = moreRed(pix,100);
}
print("The resulting image");
print(image);

/** Program 3 */
print("Program 3");
// The function returns a pixel that has been changed to be the color black
function setBlack(pixel){
    pixel.setRed(0);
    pixel.setGreen(0);
    pixel.setBlue(0);
    
    return pixel;
}

// The function returns true if the pixel's location is within borderWidth of any of the four borders, and thus on the border. Otherwise it returns false.
function pixelOnEdge(pixel, image, borderWidth) {
    var x = pixel.getX();
    var y = pixel.getY();
    
    if(x <= borderWidth) {return true;}
    else if(y <= borderWidth) {return true;} 
    else if(x >= image.getWidth()-borderWidth) {return true;}
    else if(y >= image.getHeight()-borderWidth) {return true;}
    else return false;
}

print("The original image");
var image = new SimpleImage("duke_blue_devil.png");
print(image);

for(var pix of image.values()){
    if(pixelOnEdge(pix, image, 10)){
        setBlack(pix);
    }
}

print("The resulting image");
print(image);

/** Program 4 */
print("Program 4");
// This function returns true if the pixel's location is within borderWidth of any of the two vertical borders, and thus on the border. Otherwise it returns false. 
function pixelOnVerticalEdge(pixel, image, borderWidth) {
    var x = pixel.getX();
    if(x <= borderWidth) {return true;}   
    else if(x >= image.getWidth()-borderWidth) {return true;}
    else return false;
}

// This function returns true if the pixel’s location is within borderWidth of any of the two horizontal borders, and thus on the border. Otherwise it returns false.
function pixelOnHorizontalEdge(pixel, image, borderWidth) {
    var y = pixel.getY();
    if(y <= borderWidth) {return true;}  
    else if(y >= image.getHeight()-borderWidth) {return true;}
    else return false;
}

print("The original image");
var image = new SimpleImage("duke_blue_devil.png");
print(image);

for(var pix of image.values()){
    if(pixelOnVerticalEdge(pix, image, 10)){
        setBlack(pix);
    }
    else if (pixelOnHorizontalEdge(pix, image, 20)){
        setBlack(pix);
    }
    else 
        continue;
}

print("The resulting image");
print(image);

/** Program 5 */
print("Program 5");

function pixelOnEdgeDifferentThicknesses(pixel,image,borderWidth1,borderWidth2){
    var x=pixel.getX();
    var y=pixel.getY(); 
    if (x<borderWidth1) return true;
    if(x>=image.getWidth()-borderWidth1) return true;
    if (y<borderWidth2) return true;
    if(y>=image.getHeight()-borderWidth2) return true;
    return false;
}

print("The original image");
var image=new SimpleImage("duke_blue_devil.png");
print(image);

for (var pixel of image.values()){
    if(pixelOnEdgeDifferentThicknesses(pixel,image,10,20)){
        pixel=setBlack(pixel);
    }
}

print("The resulting image");
print(image);
