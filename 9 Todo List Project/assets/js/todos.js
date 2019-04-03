//check off todos -- listener is added via on as this updates future children of the ul
// listener attached to ul as the object it is attached to must exist at pageload
//second argument in on() is an exception - only "li" will trigger the callback function
$("ul").on("click", "li", function(){
        $(this).toggleClass("selected");
});

//click on X to delete todo
$("ul").on("click", "li span", function(event){
        $(this).parent().fadeOut(200, function(){
                $(this).remove();
        })
        event.stopPropagation(); //stops event bubbling to parent elements triggering uneccessary funct
});

$("input[type = 'text']").keypress(function(event){
        if(event.which===13){
        //store text in variable
        var textTodo = $("input").val();
        //add new li with stored text
        $("ul").append("<li><span><i class='far fa-trash-alt'></i></span> " + textTodo + "</li>");
        //clear input text
        $(this).val("");
        }
})

//max input chars at this width = 35px

$(".plus").on("click", function(){
        $("input").fadeToggle(100);
})