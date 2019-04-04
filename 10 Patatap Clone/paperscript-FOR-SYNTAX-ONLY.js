












//testing paperscript with js
var color = ["purple", "red", "orangered", "cyan", "whitesmoke"];   
generatePent();

function generatePent(){
    for (j=0; j<50; j+=1){
        for (i=0; i<100; i+=1){
            var myCircle = new Path.RegularPolygon(new Point((i*10 +50), (j*10+50)), 5, 4);
            myCircle.fillColor = pickColor();
        }
    }     
};
function pickColor(){
    var random = Math.floor(Math.random() * color.length);
    return color[random];
}; 
function onKeyDown(event){
    if (event.key=='a') {
        color = ["red", "blue"];
        generatePent();
    }
};