/** Problem 1 */
var image1 = new SimpleImage(200,200);

for (var pixel of image1.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (x<100 & y<100)
        pixel.setRed(255);
    else if (x>=100 & y<100)
        pixel.setGreen(255);
    else if (x<100 & y>=100) {
        pixel.setRed(255);
        pixel.setBlue(255);
    }
    else 
        pixel.setBlue(255);
}
print(image1);

/** Problem 2 */
var image2 = new SimpleImage(200,200);
for (var pixel of image2.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (y>=2*200/3)
        pixel.setBlue(255);
    else if (y<200/3 || x< 200/3)
        pixel.setRed(255);
    else if (y>=200/3 && y<2*200/3)
        pixel.setGreen(255);
}
print(image2);
