// back-end peer eval

var no_categories = 1;
//var current_category_no = 0;

$(window).on('load', function(){
     // when the latest textbox category is clicked, new textbox for category will be inserted
     $(document).on('keypress', '#category', function(){
          no_categories++;
          document.getElementById('category').removeAttribute('id');
          var id_categoryno = 'category' + no_categories;
          var delete_name = 'delete' + no_categories;
          var add_box = '<div class="set">\
                              <span class="categoryContainer">\
                                   <label class="expandable"><img src="../images/down-arrow.png"/></label>\
                                   <input id="category" class="category" type="text" placeholder="Type to add a category">\
                                   <label name=' + id_categoryno + ' class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                              <span class="questionContainer">\
                                <ol class="itemList">\
                                    <div id=' + id_categoryno + '>\
                                        <li>\
                                            <span class="item">\
                                                <input name=' + id_categoryno + ' id="question" type="text" placeholder="Type to add a question">\
                                                <label id=' + delete_name + ' class="delete"><img src="../images/delete-hover.png"/></label>\
                                            </span>\
                                        </li>\
                                    </div>\
                                </ol>\
                            </span>\
                         </div>';
          $("#categories").append(add_box);
     });

     $(document).on('keypress', '#question', function(){
          var parent_id = '#' + $(this).closest('div').attr('id');
          var name_category = (this).getAttribute('name');
          console.log(name_category);
          var delete_name = 'delete' + name_category[name_category.length - 1];
          console.log(delete_name);
          if(document.getElementById(delete_name) != null){
               document.getElementById(delete_name).removeAttribute('id');
          }
          var add_box = '<li>\
                              <span class="item">\
                                   <input name=' + name_category + ' id="question" type="text" placeholder="Type to add a question">\
                                   <label id=' + delete_name + ' class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                         </li>';
          $(parent_id).append(add_box);
          $(this).removeAttr('id');
     });

     $(document).on('keypress', '#participant', function(){
          document.getElementById('participant').removeAttribute("id");
          var add_box = '<li>\
                              <span class="item">\
                              <input id="participant" type="text" placeholder="Enter a participant\'s name">\
                              <label class="delete"><img src="../images/delete-hover.png"/></label>\
                              </span>\
                         </li>';
          $("#participants").append(add_box);     
     });

     $(document).on('click', '.delete', function(){
          var parent_class = $(this).closest('div').attr('class');
          if(parent_class == 'set'){
               var checker = $(this).attr('name');
               checker = checker[checker.length - 1];
               //console.log(checker);
               if(checker != no_categories){
                    //no_categories--;
                    $(this).closest('div').removeClass().addClass('set_remove');
                    $('.set_remove').children().remove();
               }
               else{
                    //no_categories++;
               }
          }
          else{
               var check = (this).getAttribute('id');
               //console.log(check);
               if(check == null){
                    $(this).closest('li').remove().children().remove();
               }
               else{
                    console.log('No question textbox left!');
               }
          }
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
          //console.log("No/more than one item is checked :<");
     }
}

