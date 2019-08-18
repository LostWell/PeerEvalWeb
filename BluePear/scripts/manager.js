// functions for execution

/* MANAGER SIDE FUNCTIONS */

// Generate Questionnaire to excel file
function create_questions(){
     console.log("Generating Questions...");

     // variables used
     var questionnaire = $JExcel.new("Arial 10");
     var categories = [];
     var teams = [];
     var filename = [];


     if(prompt_final() == true){
          get_InputValues('questionnaire', filename);
          var category_label = getCategories();
          var team_label = getTeams();

          categories = get_value('category');
          teams = get_value('team');

          // to entry from remove automatically added textbox
          categories.splice(categories.length - 1, 1);
          teams.splice(teams.length - 1, 1);
          if((no_input(categories) == false) && (no_input(teams) == false) && (filename != '') && (categories.length != 1)){
               addSheetsNames(questionnaire, categories.concat(teams));

               
               categories.splice(0, 1);
               teams.splice(0, 1);
               console.log(teams);
               console.log(category_label);

               addValues_in_Sheet(questionnaire, 0, categories);          
               for(var i = 0; i <= (categories.length + teams.length); i++){
                    console.log(i);
                    if(i < categories.length){
                         var questions = getQuestions(category_label[i]);
                         remove_blank_input(questions);
                         //console.log(questions);
                         addValues_in_Sheet(questionnaire, i+1, questions);
                    }
                    else if(i == categories.length){
                         console.log(categories.length + teams.length);
                         addValues_in_Sheet(questionnaire, i+1, teams);
                    }
                    else{
                         var participants = getParticipants(team_label[i - categories.length - 1]);
                         console.log(participants);
                         remove_blank_input(participants);
                         addValues_in_Sheet(questionnaire, i+1, participants);
                    }
               }
               questionnaire.generate(filename + '.xlsx');
          }
          else if(filename == ''){
               alert('Blank filename!');
               categories = [];
               input_filename = [];
          }
          else{
               alert('Blank category!');
               categories = [];
               input_filename = [];
          }
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

// get team names
function getTeams(){
     teams = ['list of teams'];
     team_label = get_InputValues('team', teams);

     return team_label;
}

// get team participants
function getParticipants(team_no){
     var participants = [];
     get_InputValues(team_no, participants);

     return participants;
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
          variable_name.push(input[i].value);
          names.push(input[i].name);
     }
     var check = store_value(element_name, variable_name);
     /*if(check == true){
          console.log("finished getting inputs");
          console.log(get_value(element_name));
     }*/
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

// if a variable contains a blank element, it will return true
function no_input(variable_name){
     if(!variable_name.length)
          return true;
     for(var i = 0; i < variable_name.length; i++){
          if(variable_name[i] == '')
               return true;
     }

     return false;
}

// removes blank input in the variable
function remove_blank_input(variable_name){
     for(var i = 0; i < variable_name.length; i++){
          if(variable_name[i] == '')
               variable_name.splice(i, 1);
     }
}

// prompt user if all inputs are already final
function prompt_final(){
     var note = confirm("Are you sure?");
     if(note==true)
          return true;
     return false;
}