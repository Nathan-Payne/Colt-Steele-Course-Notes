var todos = ['buy shorts'];
//allows html instructions to load in by delaying main code from executing 500ms.
window.setTimeout(function(){

function listTodos(){
    console.log("*******");
    todos.forEach(function(todo, i){
        console.log(i + ": " + todo);
    });
    console.log("*******");
};

function addTodo(){
    var item = prompt("Add item:____");
    todos.push(item);
    console.log("Added Todo");
};

function delTodo(){
    //get index for delete
    var index = prompt("Number to delete from list?");
    //remove that index from todos
    todos.splice(index, 1);
    console.log("Deleted Todo");
};



var input = prompt("What are you going to do?");
while (input!=="quit"){
    if (input==="list"){
        listTodos();
    } else if (input==="new"){
        addTodo();
    } else if (input==="delete"){
        delTodo();
    }
    var input = prompt("What are you going to do?"); 
}

console.log("final todos: ");
todos.forEach(function(todo, i){
    console.log(i + ": " + todo);
});
//end of setTimeout function
}, 500); 