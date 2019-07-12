// functions for execution

// variables used
var questionnaire = $JExcel.new("Arial 10 green");
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
          getCategories();
          categories.splice(categories.length - 1, 1);
          console.log(categories);
          addSheetsNames(questionnaire, categories);

          categories.splice(0, 1);

          var category = 'category1';
          var questions = getQuestions(category);
          addQuestionsPerCateg(questionnaire, 0, categories);
          addQuestionsPerCateg(questionnaire, 1, questions);
          /*for(var i = 0; i < categories.length; i++){
               var j = i++;
               var category = 'category' + j;
               var questions = getQuestions(category);
               addQuestionsPerCateg(questionnaire, i, questions);
          }*/
          questionnaire.generate(filename);
     }
}

// get categories
function getCategories(){
     categories = ['list of categories'];
     get_InputValues('category', categories);
}

// get questions
function getQuestions(category_no){
     var input = document.getElementById(category_no).getElementsByTagName('input');
     var questions = [];
     console.log('Getting questions');
     for(var i = 0; i < input.length; i++){
          questions.push(input[i].value);
     }
     console.log(questions);
     //get_InputValues(category_no, questions);
     return questions;
}

// add names of sheets (category)
function addSheetsNames(workbook, SheetNames){
     for(var i = 0; i < SheetNames.length; i++){
          workbook.addSheet(SheetNames[i]);
     }
}

// add questions per category in its specified sheet no.
function addQuestionsPerCateg(workbook, SheetNo, questions){
     for(var i = 0; i < questions.length; i++){
          workbook.set(SheetNo, 0, i, questions[i]); // column, row
     }
}

// get user's input
function get_InputValues(element_name, variable_name){
     var input = document.getElementsByName(element_name);
     for(var i = 0; i < input.length; i++){
          variable_name.push(input[i].value);
     }
     var check = store_value(element_name, variable_name);
     if(check == true){
          console.log("finished getting inputs");
          console.log(get_value(element_name));
     }
}

// stores value of variables to be avaible in all pages
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