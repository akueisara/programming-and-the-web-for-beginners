// create a black square
var image = new SimpleImage(200,200);

for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (x>y)
        pixel.setRed(255);
    else if (x+y > 200)
        pixel.setRed(255);
    else if (x>20)
        pixel.setRed(255);
}
print(image);
