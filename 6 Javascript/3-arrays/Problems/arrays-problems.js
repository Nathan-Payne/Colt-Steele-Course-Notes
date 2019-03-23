//takes array prints elements in reverse order
function printReverse(array){
    for(var i=array.length-1; i>=0; i-=1){
        console.log(array[i]);
    }
}
printReverse([1,2,3,4]);

//isUniform takes array returns true if all items identical
function isUniform(arr){
    var check = arr[0];
    for(var i=1; i<arr.length; i++){
        if(check!==arr[i]){
            return false;
        }
    }
    return true
}
console.log(isUniform([1,1,1,1,1]));
console.log(isUniform(['a','v', 'q']));

//sumArray() takes array of nums returns sum
function sumArray(arr){
    var tot = 0;
    arr.forEach(num => {
        tot += num;
    });
    return tot;
}
console.log(sumArray([1,2,3,4])); //10
console.log(sumArray([0,7,7,80])); //94

//max() takes array of nums returns max num
function max(arr){
    var max_num = 0;
    arr.forEach(num => {
        if (num>max_num){
            max_num=num;
        }
    });
    return max_num;
}
console.log(max([1,2,3]))
console.log(max([100,-2,3]))

// custom forEach function ==========================
console.log("Custom forEach");
//====================================================
function myForEach(arr, f){
    for (var i=0; i<arr.length; i++){
        f(arr[i]);  //calls function f on each item in array individually
    }
}

myForEach([1,2], alert);    //only reference function - do not call with parens
myForEach([1,2,3,4], function(){console.log("test")});  

//adding as a new method for arrays - prototype is similar to python class, "this" is similar to
// python "self". 
Array.prototype.myForEach = function(f){
    for(var i=0; i<this.length; i++){
        f(this[i]);
    }
}

var nums = [33,55,66];
nums.myForEach(function(n){
    console.log("a number is..." + n);
}) ;


