// functions for execution

// variables used
var categories = [];

// Generate Questionnaire to excel file
function create_questions(){
     console.log("Generating Questions...");

     if(prompt_final() == true){
          categories = get_value("categories");
          categories.splice(categories.length - 1, 1);
          console.log(categories);
          addSheetsNames(questionnaire, categories);
          //for(var i = 0; i < categories.length; i++)
          //     addQuestionsPerCateg(questionnaire, i, questions[i]);
          questionnaire.generate("questionnare.xlsx");
     }
}

// get categories
function getCategories(){
     categories = ['list of categories'];
     get_InputValues('category', categories);
}

// get questions
function getQuestions(){
     questions = [];
     get_InputValues("questions", questions);
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
          workbook.set(SheetNo, 0, i, questions[i]);
     }
}

// get user's input
function get_InputValues(element_name, variable_name){
     console.log('Here!');
     var input = document.getElementsByClassName(element_name);
     console.log(input);
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