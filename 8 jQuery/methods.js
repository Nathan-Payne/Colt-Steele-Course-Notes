//-- .text() returns all text content from selected element and children 
//-- also allows text assignment (like vanilla js .textContent) by providing argument
$("h1").text();

//-- .html() get html content of first element in the selected elements
//-- or pass argument to set html content for all selected elements (similar to .innerHTML in JS)
$("ul").html();

//-- .attr() get or set value of attribute of selected element (first if many)
$("input").attr("type", "color"); //changes input type to be color

//-- get or set current value of selected element (or first of multiple)
$("input").val();
$("input").val(""); //useful for clearing input after user submits a value

//-- .addClass(className) adds specified class to each element in selected elements
$("p").addClass("paraclass textclass"); //adds two classes to all paragraphs on page
$("h1").removeClass("correct"); //removes class correct from h1
$("li").last().toggleClass("done");  //toggles done for last() li
$("ul li").toggleClass("done"); //toggles done for all li - adds to li1 li2 removes from li3

