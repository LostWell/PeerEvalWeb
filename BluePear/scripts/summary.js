// generate summary report

/*
var participants = ['Lee Seung Gi', 'Jang Man Weol', 'Gu Chan Seong'];
var rating1 = ['Category: cat1', 'question 11', '1', 'rating1comment11','Category: cat2', 'question 21', '3', 'rating1comment21', 'question 22', '4', 'rating1comment22', 'Category: cat3', 'question 31', '4', 'rating1comment31', 'question 32', '3', 'rating1comment32', 'question 33', '3', 'rating1comment33', 'Category: cat4', 'question 41', '2', 'rating1comment41'];

var rating2 = ['Category: cat11', 'question 11', '2', 'rating2comment11','Category: cat2', 'question 21', '1', 'rating2comment21', 'question 22', '4', 'rating2comment22', 'Category: cat3', 'question 31', '4', 'rating2comment31', 'question 32', '3', 'rating2comment32', 'question 33', '3', 'rating2comment33', 'Category: cat4', 'question 41', '3', 'rating2comment41'];

var rating3 = ['Category: cat11', 'question 11', '3', 'rating3comment11', 'Category: cat2', 'question 21', '4', 'rating3comment21', 'question 22', '3', 'rating3comment22', 'Category: cat3', 'question 31', '4', 'rating3comment31', 'question 32', '3', 'rating3comment32', 'question 33', '3', 'rating3comment33', 'Category: cat4', 'question 41', '1', 'rating3comment41']

var seunggi =       [rating1, rating2, rating3];
var manweol =       [rating2, rating2, rating2];
var chanseong =     [rating2, rating3, rating1];

var answers = [seunggi, manweol, chanseong];
*/

var answers = [];

$(document).on('click', '#generateButton', function(){
     //Reference the FileUpload element.
     var fileUpload = $("#fileUpload")[0].files;
     console.log(fileUpload.length);
 
     //Validate whether File is valid Excel file.
     var regex = /^([a-zA-Z0-9\s_\\.\-:()'])+(.xls|.xlsx)$/;
     for(var i = 0; i < fileUpload.length; i++){
          if (regex.test(fileUpload[i].value.toLowerCase())) {
               if (typeof (FileReader) != "undefined") {
                   var reader = new FileReader();
                   var sheet_values = [];
       
                   //For Browsers other than IE.
                   if (reader.readAsBinaryString) {
                       reader.onload = function (e) {
                           sheet_values = ProcessExcel(e.target.result);
                       };
                       reader.readAsBinaryString(fileUpload.files[0]);
                   } else {
                       //For IE Browser.
                       reader.onload = function (e) {
                           var data = "";
                           var bytes = new Uint8Array(e.target.result);
                           for (var i = 0; i < bytes.byteLength; i++) {
                               data += String.fromCharCode(bytes[i]);
                           }
                           sheet_values = ProcessExcel(data);
                       };
                       reader.readAsArrayBuffer(fileUpload.files[0]);
                   }
                   remove_blank_input(sheet_values);
                   answers.push(sheet_values);
               } else {
                   alert("This browser does not support HTML5.");
               }
           } else {
               alert("Please upload a valid Excel file.");
           }
     }

     console.log('Opening of peer evals');
     console.log(answers);
/*
     getCategoriesAndQuestions(answers[0][0], categories, questions);
     console.log('Categories');
     console.log(categories);

     console.log('Questions per Category');
     console.log(questions);

     console.log('Merging ratings per person');
     rating_per_person = ratingForAPerson(answers);
     console.log(rating_per_person);

     console.log('Generating mean scores per question');
     scores = meanScores(rating_per_person, questions);
     console.log(scores);

     console.log('Merging comments');
     comments = commentsPerPerson(rating_per_person, questions);
     console.log(comments);

     generateSummary('lol', categories, questions, comments, scores, participants);
*/
 });

var categories = [], questions = [], rating_per_person, scores, comments = [];

// removes blank input in the variable
function remove_blank_input(variable_name){
     for(var i = 0; i < variable_name.length; i++){
          if(variable_name[i] == '')
               variable_name.splice(i, 1);
     }
}

function ProcessExcel(data){

     var data = [];
    
     //Read the Excel File data.
     var workbook = XLSX.read(data,{type: 'binary'});
     workbook.SheetNames.forEach(function(sheetName){
         // Here is your object
         var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
         var values = [];
         for(var i = 0; i < excelRows.length; i++){
             var value = JSON.stringify(excelRows[i]).replace(/[^\w\s]/gi, ''); // \W = retain only [^0-9a-zA-Z_]
             values.push(value);
         }
         data.push(values);
     });

     return data;
 }

function generateSummary(filename, categories, questions, comments, scores, participants){
     var total_questions = 0;
     var summary_answers = [];
     var summary = $JExcel.new("Times New Roman 10");
     addSheetsNames(summary, participants);

     for(var i = 0; i < questions.length; i++){
          total_questions+=questions[i].length;
     }
     console.log(total_questions);

     for(var i = 0; i < participants.length; i++){
          summary_answers.push([]);
     }

     for(var i = 0; i < participants.length; i++){
          summary_answers[i].push('Name: ' + participants[i]);
          summary_answers[i].push('');
     }
     
     for(var i = 0; i < summary_answers.length; i++){
          for(var j = 0, l = 0; j < categories.length; j++){
               summary_answers[i].push(categories[j]);
               for(var k = 0; k < questions[j].length; k++){
                    summary_answers[i].push(questions[j][k]);
                    summary_answers[i].push(scores[i][j][k]);
                    for(var l = 0; l < comments[i][j][k].length; l++){
                         summary_answers[i].push(comments[i][j][k][l]);
                    }
               }
               summary_answers[i].push('');
          }
     }
     console.log(summary_answers);

     for(var i = 0; i < participants.length; i++){
          addValues_in_Sheet(summary, i, summary_answers[i]);
     }     

     if(prompt_final() == true)
          summary.generate(filename + '.xlsx');
}

function getCategoriesAndQuestions(answers, categories, questions){

     var question = [];

     categories.push(answers[0].split('_').pop());
     for(var i = 1; i < answers.length; i++){
          if((isNaN(answers[i])) && (answers[i].indexOf('Category: ') > -1)){               
               var category = answers[i].split('_').pop();

               categories.push(category);
               questions.push(question);

               question = [];
          } else if(isNaN(answers[i]) == false){
               i++;
               if(i == (answers.length - 1)){
                    questions.push(question);
               }
          } else {
               question.push(answers[i]);
          }
     }
}

function ratingForAPerson(answers){
     var ratingperperson = [];
     for(var i = 0; i < answers.length; i++){
          var ratings = [];
          for(var j = 0; j < answers[i].length; j++){
               ratings.push(answers[j][i]);
          }
          ratingperperson.push(ratings);
     }
     
     return ratingperperson;
}

function meanScores(answers, questions){
     var getScores = [];
     var mean_scores = [];

     // filter ratings per person
     for(var i = 0; i < answers.length; i++){
          var per_person_scores = [];
          for(var j = 0; j < answers[i].length; j++){
               var filteredScores = answers[i][j].filter(isNumber);
               per_person_scores.push(filteredScores);
          }
          getScores.push(per_person_scores);
     }
     //console.log(getScores);

     for(var i = 0; i < getScores.length; i++){
          var question_mean_score = [];
          for(var j = 0; j < getScores[i][0].length; j++){
               var question_scores = [];
               for(var k = 0; k < getScores[i].length; k++){
                    question_scores.push(getScores[i][k][j]);
               }
               question_mean_score.push(question_scores);
          }
          mean_scores.push(question_mean_score);
     }
     getScores = mean_scores;

     // get mean score per question of each person
     mean_scores = [];
     for(var i = 0; i < getScores.length; i++){
          var mean_per_person = [];
          for(var j = 0; j < getScores[i].length; j++){
               var average = meanArray(getScores[i][j]);
               mean_per_person.push(average);
          }
          mean_scores.push(mean_per_person);
     }
     
     getScores = [];
     console.log(questions.length);
     for(var i = 0; i < mean_scores.length; i++){
          console.log(i);
          console.log(mean_scores[i]);
          var per_categ_scores = []
          for(var j = 0; mean_scores[i].length > 0; j++){
               var new_min_score = mean_scores[i].splice(0, questions[j].length);
               per_categ_scores.push(new_min_score);
          }
          getScores.push(per_categ_scores);
     }
     mean_scores = getScores;
     
     return mean_scores;
}

function commentsPerPerson(answers, questions){
     var comments = [];
     var getComments = [];
     var size = answers[0][0].filter(isNumber).length; // for slicing
     // filter comments of one person
     for(var i = 0; i < answers.length; i++){
          var person_comments = [];
          for(var j = 0; j < answers[i].length; j++){
               for(var k = 0; k < answers[i][j].length; k++){
                    if(isNumber(answers[i][j][k])){
                         k++;
                         person_comments.push(answers[i][j][k].replace('Comment: ', ''));
                    }
               }
          }
          getComments.push(person_comments);
     }

     var all_comments = [];
     for(var i = 0; i < getComments.length; i++){
          var comment = [];
          while(getComments[i].length > 0){
               var comments_per_person = getComments[i].splice(0, size);
               comment.push(comments_per_person);
          }
          all_comments.push(comment);
     }

     // gather comments per person
     for(var i = 0; i < all_comments.length; i++){
          var person_comments = [];
          for(var j = 0; j < all_comments[i][0].length; j++){
               var question_comments = [];
               for(var k = 0; k < all_comments[i].length; k++){
                    question_comments.push(all_comments[i][k][j]);
               }
               person_comments.push(question_comments);
          }
          comments.push(person_comments);
     }

     getComments = [];
     console.log(comments[0].length);
     for(var i = 0; i < comments.length; i++){
          var per_categ_comments = []
          for(var j = 0; comments[i].length > 0; j++){
               var new_comment = comments[i].splice(0, questions[j].length);
               per_categ_comments.push(new_comment);
          }
          getComments.push(per_categ_comments);
     }
     console.log('comments segregated:');
     console.log(getComments);
     comments = getComments;
     return comments;
}

function isNumber(element){
     var rating = element.replace('Rating: ', '');
     if (isNaN(rating) == false){
          return rating;
     }
}

function meanArray(array){
     var mean = 0;
     for(var i = 0; i < array.length; i++){
          mean += Number(array[i]);
     }
     mean = mean/array.length;

     return mean;
}

function prompt_final(){
     var note = confirm("Are you sure?");
     if(note==true)
          return true;
     return false;
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
          workbook.set(SheetNo, 0, i+1, values[i]); // column, row
     }
}