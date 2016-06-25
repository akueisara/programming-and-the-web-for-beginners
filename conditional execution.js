var image = new SimpleImage("hilton.jpg");
for (var p of image.values()) {
    if ( p.getX() < image.getWidth()/3 ) 
        p.setRed(255);	    
    else if (p.getX() >= image.getWidth()/3 &&  p.getX() <= 2*image.getWidth()/3 )
        p.setGreen(255);	
    else if (p.getX() > 2*image.getWidth()/3 )
        p.setBlue(255);	
}
print(image);
