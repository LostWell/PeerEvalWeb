// back-end peer eval

$('#edit').hide();

var checker = 0;

function show_hide_icons(){
     var checkbox =  $('input:checkbox').is(':checked');
     var icon = document.getElementById('edit');
 
     if((checkbox > 0) && (checker == 0)){
          checker++;
          console.log("Item is Checked!");
          icon.style.visibility = 'visible';
     }
     else{
          icon.style.visibility = 'hidden';
          console.log("No item is checked :<");
     }
 }