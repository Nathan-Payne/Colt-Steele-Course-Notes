


var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));
console.log(average([3,6,9]));


function average(arr){
    var sum = 0;
    for (i=0; i<arr.length; i++){
        sum+=arr[i];
    }
    return Math.round(sum/arr.length);
}





