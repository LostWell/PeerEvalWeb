// functions for execution

/* MANAGER SIDE FUNCTIONS */

// variables used
var questionnaire = $JExcel.new("Arial 10");
var categories = [];
var input_filename = [];

// Generate Questionnaire to excel file
function create_questions(){
     console.log("Generating Questions...");


     if(prompt_final() == true){
          get_InputValues('questionnaire', input_filename);
          var filename = input_filename[0] + '.xlsx';
          console.log('Here!');
          console.log(filename);
          var category_label = getCategories();
          addSheetsNames(questionnaire, categories);

          categories.splice(0, 1);
          addValues_in_Sheet(questionnaire, 0, categories);          

          for(var i = 0; i < categories.length; i++){
               var questions = getQuestions(category_label[i]);
               addValues_in_Sheet(questionnaire, i+1, questions);
          }
          questionnaire.generate(filename);
     }
}

// get categories
function getCategories(){
     categories = ['list of categories'];
     category_label = get_InputValues('category', categories);
     return category_label;
}

// get questions
function getQuestions(category_no){
     var questions = [];
     get_InputValues(category_no, questions);
     
     return questions;
}

// add names of sheets (category)
function addSheetsNames(workbook, SheetNames){
     for(var i = 0; i < SheetNames.length; i++){
          workbook.addSheet(SheetNames[i]);
     }
}

// add values in specified sheet no.
function addValues_in_Sheet(workbook, SheetNo, values){
     for(var i = 0; i < values.length; i++){
          workbook.set(SheetNo, 0, i, values[i]); // column, row
     }
}

// get user's input
function get_InputValues(element_name, variable_name){
     var input = document.getElementsByClassName(element_name);
     var names = [];
     for(var i = 0; i < input.length; i++){
          if(input[i].value != '')
               variable_name.push(input[i].value);
          if(input[i].name != null)
               names.push(input[i].name);
     }
     var check = store_value(element_name, variable_name);
     if(check == true){
          console.log("finished getting inputs");
          console.log(get_value(element_name));
     }
     return names;
}

// stores value of variables to be available in all pages
function store_value(name, value){
     sessionStorage.setItem(name, value);
     if(sessionStorage.getItem(name) != null)
          return true;
     return false;
}

// gets value of the variable
function get_value(name){
     var value = sessionStorage.getItem(name);
     return value.split(",");
}

// prompt user if all inputs are already final
function prompt_final(){
     var note = confirm("Are you sure?");
     if(note==true)
          return true;
     return false;
}