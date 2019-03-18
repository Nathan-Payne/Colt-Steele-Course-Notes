//user input via prompts 
// var userAge=prompt('Age?');
// alert(userAge + " is roughly " + (userAge*365) + ((userAge/4)) + "days.");
// console.log(userAge);

// print nums using while loops//
var num = -10;
while (num <= 19) {
    console.log(num);
    num++
}

var num2 = 10;
while (num2 <= 40) {
    if (num2 % 2 ===0) {
        console.log(num2);
    }
    num2++
}

// odd between 300- 333
var num3=300;
while (num3 <= 333){
    if (num3%2 ===1){
        console.log(num3)
    }
    num3++
}

console.log(all nums divisible by 5 and 3 between 5->50)
var num4=5;
while (num4<=50){
    if (num4%5===0 && num4%3===0){
        console.log(num4)
    }
    num4++
}


console.log("The equivalent for loop");
for (var i=5; i<=50; i+=1){
    if (i%5===0 && i%3===0){
        console.log(i);
    }
}