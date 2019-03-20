var todos = ['buy shorts'];
//allows html instructions to load in by delaying main code from executing 500ms.
window.setTimeout(function(){

var input = prompt("What are you going to do?");
while (input!=="quit"){

    if (input==="list"){
        todos.forEach(function(todo){
            console.log(todo);
        });
    } else if (input==="new"){
        var item = prompt("Add item:____");
        todos.push(item);
    }
    var input = prompt("What are you going to do?"); 
}

console.log("final todos: ");
todos.forEach(function(todo){
    console.log(todo);
});

}, 500); 