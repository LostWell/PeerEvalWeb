// back-end peer eval

var no_categories = 1;
var no_team = 1;
//var current_category_no = 0;

$(window).on('load', function(){
     // when the latest textbox category is clicked, new textbox for category will be inserted
     $('body').on('paste keypress', '#category', function(){
          no_categories++;

          // transfer id to secure that the last added category textbox will not be deleted and on keypress in it, another textbox will appear
          document.getElementById('category').removeAttribute('id');
          document.getElementById('delete_category').removeAttribute('id');

          var category_no = 'category' + no_categories; // to classify later on what categories do the questions belong
          var delete_question = 'delete' + no_categories;

          var add_box = '<div class="set">\
                              <span class="categoryContainer">\
                                   <label class="expandable expanded"></label>\
                                   <input id="category" class="category" name=' + category_no + ' type="text" placeholder="Type to add a category">\
                                   <label id="delete_category" class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                              <span class="questionContainer">\
                                   <ol class="itemList" id=' + category_no + '>\
                                        <li>\
                                             <span class="item">\
                                                  <input class=' + category_no + ' id="question" type="text" placeholder="Type to add a question">\
                                                  <label id=' + delete_question + ' class="delete"><img src="../images/delete-hover.png"/></label>\
                                             </span>\
                                        </li>\
                                   </ol>\
                              </span>\
                         </div>';
          $("#categoriesContainer").append(add_box);
     });

     // to insert new textbox for questions
     $('body').on('paste keypress', '#question', function(){
          var id_category = '#' + $(this).closest('ol').attr('id');
          var name_category = (this).getAttribute('class'); // to classify later on what categories do the questions belong
          var delete_name = 'delete' + name_category[name_category.length - 1];
          document.getElementById(delete_name).removeAttribute('id'); // transfer id to secure that the last added question textbox will not be deleted
          var add_box = '<li>\
                              <span class="item">\
                                   <input class=' + name_category + ' id="question" type="text" placeholder="Type to add a question">\
                                   <label id=' + delete_name + ' class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                         </li>';
          $(id_category).append(add_box);
          console.log((this).getAttribute('id'));
          $(this).removeAttr('id');
     });

     // to insert new textbox for participants
     $('body').on('paste keypress', '#participant', function(){
          var id_team = '#' + $(this).closest('ol').attr('id');
          var name_team = (this).getAttribute('class'); // to classify later on what teams do the participants belong
          document.getElementById('delete_btn').removeAttribute('id'); // transfer id to secure that the last added particpant textbox will not be deleted
          var add_box = '<li>\
                              <span class="item">\
                                   <input class="' + name_team + ' member" id="participant" type="text" placeholder="Type to add a participant">\
                                   <label id="delete_btn" class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                         </li>';
          $(id_team).append(add_box);
          console.log((this).getAttribute('id'));
          $(this).removeAttr('id');
     });

     // event handler if delete button is click
     $('body').on('click', '.delete', function(){
          var parent_class = $(this).closest('div').attr('class');
          if(parent_class == 'set'){
               var check = (this).getAttribute('id');
               if(check == null){
                    $(this).closest('div').removeClass().addClass('set_remove');
                    $('.set_remove').children().remove();
               }
          }
          else{
               var check = (this).getAttribute('id');
               console.log(check);
               if(check == null){
                    $(this).closest('li').remove().children().remove();
               }
          }
     });
});

function show_hide_icons(id_name){
     var checkbox =  $("input:checkbox:checked").length;
     var icon = document.getElementById(id_name);

     if(((id_name == 'edit') && (checkbox == 1)) || ((id_name == 'delete') && (checkbox > 0))){
          console.log("Item is Checked!");
          icon.style.display = 'inline-block';
     }   
     else{
          icon.style.display = 'none';
          //console.log("No/more than one item is checked :<");
     }
}