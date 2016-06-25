/** part 1 */
function dist(pixel,x,y) {
    var dx = pixel.getX() - x;
	var dy = pixel.getY() - y;
	return Math.sqrt(dx*dx + dy*dy);
}

// start with a blank image
var output = new SimpleImage(320,320);

//Make something here!
for (var pixel of output.values()) {
    if (dist(pixel,100,100) < 50)
	    pixel.setRed(255-4*dist(pixel,100,100));
	else if (dist(pixel,200,200) < 80)
	    pixel.setGreen(255-3*dist(pixel,200,200));
	else if (Math.random() > 0.995) {
	    pixel.setRed(255);
		pixel.setGreen(255);
	}
	pixel.setBlue(Math.max(1.5*pixel.getY() - pixel.getX(), pixel.getX() - 1.5*pixel.getY()));
}

//print whatever you made
print(output);

/** part 2 */
// blur by moving random pixels
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (image, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, image.getWidth());
    var ny = ensureInImage(y + dy, image.getHeight());
    return image.getPixel(nx, ny);
}

function grayScale(img, percent) {
    for (var p of img.values()) {
        var avg = p.getGreen()*0.114 + p.getRed()*0.299 + p.getBlue()*0.587;
        if (Math.random() > 1 - percent*0.01) {
            p.setRed(avg);
            p.setBlue(avg);
            p.setGreen(avg);
        }
    }
    return img;
}

var image = new SimpleImage("duvall.jpg");
var output = new SimpleImage(image.getWidth(), image.getHeight());

for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(image, x, y, 10);
        output.setPixel(x, y, other);
    }
    else {
        output.setPixel(x, y, pixel);
    }
}

output = grayScale(output, 70);

print(output);

/** part 3 */
function crop(image, width, height) {
    var n = new SimpleImage(width, height);
    for(var p of image.values()) {
        var x = p.getX();
        var y = p.getY();
        if(x < width && y < height) {
            var np = n.getPixel(x, y);
            np.setRed(p.getRed());
            np.setGreen(p.getGreen());
            np.setBlue(p.getBlue());
        }
    }
    return n;
}

// convert last numbits to 0's
function pixchange(pixval, numbits) {
    var n = Math.pow(2, numbits);
    var x = Math.floor(pixval/n) * n;
    return x;
}

// clearing pixels to hide data clearing numbits of the eight bits out
function chop2hide(image, numbits) {
    for(var px of image.values()) {
        px.setRed(pixchange(px.getRed(), numbits));
        px.setGreen(pixchange(px.getGreen(), numbits));
        px.setBlue(pixchange(px.getBlue(), numbits));
    }
    return image;
}

// shift top (8-numbits) bits to right, clear out top numbits bits
function shift(im, numbits) {
    var n = Math.pow(2, 8-numbits);
    var nim = new SimpleImage(im.getWidth(), im.getHeight());
    for(var px of im.values()) {
        var x = px.getX();
        var y = px.getY();
        var npx = nim.getPixel(x, y);
        npx.setRed(Math.floor(px.getRed()/n));
        npx.setGreen(Math.floor(px.getGreen()/n));
        npx.setBlue(Math.floor(px.getBlue()/n));
    }
    return nim;
}
function newpv(p, q) {
    var answer = p + q;
    if (p + q > 255) 
        print("error: answer too big");
    return answer;
}

function combine(a, b) {
    var n = new SimpleImage(a.getWidth(), a.getHeight());
    for(var pa of a.values()) {
        var x = pa.getX();
        var y = pa.getY();
        var pb = b.getPixel(x,y);
        var np = n.getPixel(x,y);
        np.setRed(newpv(pa.getRed(), pb.getRed()));
        np.setGreen(newpv(pa.getGreen(), pb.getGreen()));
        np.setBlue(newpv(pa.getBlue(), pb.getBlue()));
    }
    return n;
}

function exnum(num, numbits) {
    var n = Math.pow(2, numbits);
    var n2 = Math.pow(2, 8-numbits);
    return num % n * n2;
}

function extract(stego, numbits) {
    for(var px of stego.values()) {
        px.setRed(exnum(px.getRed(), numbits));
        px.setGreen(exnum(px.getGreen(), numbits));
        px.setBlue(exnum(px.getBlue(), numbits));
    }
    return stego;
}

// program

var start = new SimpleImage("astrachan.jpg");
var hide = new SimpleImage("MessageCSEveryone.jpg");
//var hide = new SimpleImage("duvall.jpg");
print(start);
print(hide);

// hidden code

var cropWidth = start.getWidth();
if (hide.getWidth() < cropWidth) {
	cropWidth = hide.getWidth();
}
var cropHeight = start.getHeight();
if (hide.getHeight() < cropHeight) {
	cropHeight = hide.getHeight();
}

print("done with crop");
start = crop(start, cropWidth, cropHeight);
hide = crop(hide, cropWidth, cropHeight);
print(start);
print(hide);

var bitsToHideIn = 2;
start = chop2hide(start, bitsToHideIn);
print("done with chop2Hide");
hide = shift(hide, bitsToHideIn);
print("done with shift");
var stego = combine(hide, start);
print(stego);
var hiddenImage = extract(stego,bitsToHideIn);
print(hiddenImage);
