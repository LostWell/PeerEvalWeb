// back-end peer eval

var no_categories = 1;

$(window).on('load', function(){
     // when the latest textbox category is clicked, new textbox for category will be inserted
     $(document).on('click', '#category', function(){
          no_categories++;
          document.getElementById("category").removeAttribute("id");
          var class_name = "set" + no_categories;
          var add_box = '<div class=' + class_name + '>\
                                   <span class="categoryContainer">\
                                        <label class="expandable"><img src="../images/down-arrow.png"/></label>\
                                        <input class="category" type="text" placeholder="Type to add a category">\
                                        <label class="delete"><img src="../images/delete-hover.png"/></label>\
                                   </span>\
                              <span class="questionContainer">\
                                   <ol class="questionList">\
                                        <li>\
                                             <span>\
                                                  <input class="question" type="text" placeholder="Type to add a question">\
                                                  <label class="delete"><img src="../images/delete-hover.png"/></label>\
                                             </span>\
                                        </li>\
                                   </ol>\
                              </span>\
                         </div>';
          $(".append").append(add_box);
     });
});

function show_hide_icons(id_name){
     var checkbox =  $("input:checkbox:checked").length;
     var icon = document.getElementById(id_name);

     if(((id_name == 'edit') && (checkbox == 1)) || ((id_name == 'delete') && (checkbox > 0))){
          console.log("Item is Checked!");
          icon.style.visibility = 'visible';
     }   
     else{
          icon.style.visibility = 'hidden';
          console.log("No/more than one item is checked :<");
     }
}

