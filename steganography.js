/** section 1 */
var start = new SimpleImage("usain.jpg");
var hide = new SimpleImage("smalllion.jpg");

/** section 2 */
function crop(image,width,height) {
   var n = new SimpleImage(width,height);
   for(var p of image.values()) {
       var x = p.getX();
       var y = p.getY();
       if (x < width && y < height) {
           var np = n.getPixel(x,y);
           np.setRed(p.getRed());
           np.setBlue(p.getBlue());
           np.setGreen(p.getGreen()); 
        }
    }
    return n;
}

/** section 3 */
var cropWidth = start.getWidth();
if (hide.getWidth() < cropWidth) {
     cropWidth = hide.getWidth();
}

var cropHeight = start.getHeight();
if (hide.getHeight() < cropHeight) {
     cropHeight = hide.getHeight();
}

start = crop(start,cropWidth, cropHeight);
hide = crop(hide,cropWidth, cropHeight);
print("usain.jpg after cropping");
print(start);
print("smalllion.jpg after cropping");
print(hide);
print("");

/** section 4 */
function pixchange(pixval){
    var x = Math.floor(pixval/16) * 16;
    return x;
}

function chop2hide(image){
    for(var px of image.values()){
        px.setRed(pixchange(px.getRed()));
        px.setGreen(pixchange(px.getGreen()));
        px.setBlue(pixchange(px.getBlue()));
    }
    return image;
}

var start_pixel = start.getPixel(50,60);

// before calling chop2hide
print("before calling chop2hide");
print(start_pixel);
print(start);

// chop2hide
start = chop2hide(start);

// after calling chop2hide
print("after calling chop2hide");
print(start_pixel);
print(start);
print("");

/** section 5 */
function shift(im){
  var nim = new SimpleImage(im.getWidth(), 
                            im.getHeight());
  for(var px of im.values()){
    var x = px.getX();
    var y = px.getY();
    var npx = nim.getPixel(x,y);
    npx.setRed(Math.floor(px.getRed()/16));
    npx.setGreen(Math.floor(px.getGreen()/16));
    npx.setBlue(Math.floor(px.getBlue()/16));
  }
  return nim;
}

var hide_pixel = hide.getPixel(50,60);

// before calling shift
print("before calling shift");
print(hide_pixel);
print(hide);

// shift
hide = shift(hide);

// after calling shift
print("after calling shift");
print(hide_pixel);
print(hide);
print("");

function newpv(p,q){
    var sum = p + q;
    if (sum > 255) print("error:RGB value cannot be greater than 255"); 
    return sum;
}
function combine(image1,image2){
    var n = new SimpleImage (image1.getWidth(),image1.getHeight());
    for (var p1 of image1.values()){
        var x = p1.getX();
        var y = p1.getY();
        var p2 = image2.getPixel (x,y);
        var np = n.getPixel (x,y);
        np.setRed(newpv(p1.getRed(),p2.getRed()));
        np.setGreen(newpv(p1.getGreen(),p2.getGreen()));
        np.setBlue(newpv(p1.getBlue(),p2.getBlue()));
    }
    return n;
}

combinedimage= combine(start,hide);
print("The combination of two images");
print(combinedimage);
print("");

//Test
print("Test a pixel at x=50, y=60 in image1, image2");
var sum = new SimpleImage (start.getWidth(),start.getHeight());
var image1_pixel = start.getPixel(50,60);
var image2_pixel = hide.getPixel(50,60);
var sum_pixel = sum.getPixel (50,60);
sum_pixel.setRed(image1_pixel.getRed() + image2_pixel.getRed());
sum_pixel.setGreen(image1_pixel.getGreen() + image2_pixel.getGreen());
sum_pixel.setBlue(image1_pixel.getBlue() + image2_pixel.getBlue());
var combined_pixel = combinedimage.getPixel(50,60);
print(sum_pixel + " v.s. " + combined_pixel);
