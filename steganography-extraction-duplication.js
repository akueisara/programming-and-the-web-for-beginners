/** Program 1 */
var start = new SimpleImage("astrachan.jpg");
var hide = new SimpleImage("duvall.jpg");
var bitsToHideIn = 4;

var cropWidth = start.getWidth();
if (hide.getWidth() < cropWidth) {
     cropWidth = hide.getWidth();
}

var cropHeight = start.getHeight();
if (hide.getHeight() < cropHeight) {
     cropHeight = hide.getHeight();
}

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

function pixchange(pixval, numbits){
    var n = Math.pow(2, numbits);
    var x = Math.floor(pixval/n) * n;
    return x;
}

function chop2hide(image, numbits){
    for(var px of image.values()){
        px.setRed(pixchange(px.getRed(), numbits));
        px.setGreen(pixchange(px.getGreen(), numbits));
        px.setBlue(pixchange(px.getBlue(), numbits));
    }
    return image;
}

function shift(im, numbits){
  var n = Math.pow(2, 8-numbits);
  var nim = new SimpleImage(im.getWidth(), im.getHeight());
  for(var px of im.values()){
    var x = px.getX();
    var y = px.getY();
    var npx = nim.getPixel(x,y);
    npx.setRed(Math.floor(px.getRed()/n));
    npx.setGreen(Math.floor(px.getGreen()/n));
    npx.setBlue(Math.floor(px.getBlue()/n));
  }
  return nim;
}

function newpv(p, q){
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

function pchange(num, numbits){
    var n = Math.pow(2, numbits);
    var n2 = Math.pow(2, 8-numbits);
    return num % n * n2;
}

function extract(image, numbits){
    for(var p of image.values()){
        p.setRed(pchange(p.getRed(), numbits));
        p.setGreen(pchange(p.getGreen(), numbits));
        p.setBlue(pchange(p.getBlue(), numbits));
    }
    return image;
}

start = crop(start, cropWidth, cropHeight);
hide = crop(hide, cropWidth, cropHeight);

start = chop2hide(start, bitsToHideIn);
hide = shift(hide, bitsToHideIn);

combinedimage= combine(start,hide);

print(start);
print(hide);
print(combinedimage);

hiddenimage = extract(combinedimage, bitsToHideIn);
print(hiddenimage);

/** Program 2 */
var image = new SimpleImage("rodger.png");
print(image);

function duplicate(img) {
    var dup = new SimpleImage(img.getWidth()*2, img.getHeight()*2);
    for(var p of img.values()){
        var x = p.getX();
        var y = p.getY();
        var npx1 = dup.getPixel(x,y);
        var npx2 = dup.getPixel(img.getWidth()+x,y);
        var npx3 = dup.getPixel(x,img.getHeight()+y);
        var npx4 = dup.getPixel(img.getWidth()+x,img.getHeight()+y);
            npx1.setRed(p.getRed());
            npx2.setRed(p.getRed());
            npx3.setRed(p.getRed());
            npx4.setRed(p.getRed());
            npx1.setGreen(p.getGreen());
            npx2.setGreen(p.getGreen());
            npx3.setGreen(p.getGreen());
            npx4.setGreen(p.getGreen());
            npx1.setBlue(p.getBlue());
            npx2.setBlue(p.getBlue());
            npx3.setBlue(p.getBlue());
            npx4.setBlue(p.getBlue());
    }
    return dup;
}

dup_image = duplicate(image);
print(dup_image);
