// generate summary report
/* 
summary for team;

question 1:
person 1 grades > sarili niya, person 2, person 3
*/

var participants = ['Lee Seung Gi', 'Jang Man Weol', 'Gu Chan Seong'];
var rating1 = ['category_rating1 1', 'question 11', 1, 'rating1comment11','category_ 2', 'question 21', 3, 'rating1comment21', 'question 22', 4, 'rating1comment22', 'category_ 3', 'question 31', 3, 'rating1comment31'];
var rating2 = ['category_rating2 1', 'question 11', 2, 'rating2comment11','category_ 2', 'question 21', 1, 'rating2comment21', 'question 22', 4, 'rating2comment22', 'category_ 3', 'question 31', 3, 'rating2comment31'];
var rating3 = ['category_rating3 1', 'question 11', 3, 'rating3comment11', 'category_ 2', 'question 21', 4, 'rating3comment21', 'question 22', 3, 'rating3comment22', 'category_ 3', 'question 31', 3, 'rating3comment31']
                  // seung gi, man weol, chan seong
var seunggi =       [rating1, rating2, rating3];
var manweol =       [rating2, rating2, rating2];
var chanseong =     [rating2, rating3, rating1];
/*

1, 2, 2; (1+2+2)/3 = 1.67
3, 1, 1; (3+1+1)/3 = 1.67
4, 4, 4; (4+4+4)/3 = 4

*/

var answers = [seunggi, manweol, chanseong];
var categories = [], questions = [], rating_per_person, scores, comments = [];

console.log('Opening of peer evals');
console.log(answers);

getCategoriesAndQuestions(answers[0][0], categories, questions);
console.log('Categories');
console.log(categories);

console.log('Questions per Category');
console.log(questions);

console.log('Merging ratings per person');
rating_per_person = ratingForAPerson(answers);
console.log(rating_per_person);

console.log('Generating mean scores per question');
scores = meanScores(rating_per_person);
console.log(scores);

console.log('Merging comments');
comments = commentsPerPerson(rating_per_person);
console.log(comments);

function getCategoriesAndQuestions(answers, categories, questions){

     var question = [];

     categories.push(answers[0].split('_').pop());
     for(var i = 1; i < answers.length; i++){
          if((isNaN(answers[i])) && (answers[i].indexOf('category_') > -1)){               
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

function meanScores(answers){
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
     
     return mean_scores;
}

function commentsPerPerson(answers){
     var comments = [];
     var getComments = [];
     // filter comments of one person
     for(var i = 0; i < answers.length; i++){
          var person_comments = [];
          for(var j = 0; j < answers[i].length; j++){
               for(var k = 0; k < answers[i][j].length; k++){
                    if(isNumber(answers[i][j][k])){
                         k++;
                         person_comments.push(answers[i][j][k]);
                    }
               }
          }
          getComments.push(person_comments);
     }
     //console.log(getComments);

     var all_comments = [];
     for(var i = 0; i < getComments.length; i++){
          var comment = [];
          while(getComments[i].length > 0){
               var size = 4;
               var comments_per_person = getComments[i].splice(0, size);
               comment.push(comments_per_person);
          }
          all_comments.push(comment);
     }
     //console.log(all_comments);

     // gather comments per person
     for(var i = 0; i < all_comments.length; i++){
          var person_comments = [];
          for(var j = 0; j <all_comments[i][0].length; j++){
               var question_comments = [];
               for(var k = 0; k < all_comments[i].length; k++){
                    question_comments.push(all_comments[i][k][j]);
               }
               person_comments.push(question_comments);
          }
          comments.push(person_comments);
     }

     return comments;
}

function isNumber(element){
     if (isNaN(element) == false){
          return element;
     }
}

function meanArray(array){
     var mean = 0;
     for(var i = 0; i < array.length; i++){
          mean += array[i];
     }
     mean = mean/array.length;

     return mean;
}

//generateSummary('lol', answers);

/*

categories = [category 1, category 2];
questions = [[question 11], [questions 21, questions 22]];
comments = [[[comment 11, comment11, comment11]], [[comment21, comment21, comment21], [comment22, comment22, comment22]]];
scores = [[1], [1,2]];
}*/

generateSummary('lol', categories, questions, comments, scores, participants);

function generateSummary(filename, categories, questions, comments, scores, participants){
     var summary_answers = [];
     var summary = $JExcel.new("Arial 10");
     addSheetsNames(summary, participants);

     for(var i = 0; i < participants.length; i++){
          var per_person_data = [];
          per_person_data.push('Name: ' + participants[i]);
          per_person_data.push('');

          /*per_person_data.push(categories[i]);
          for(var j = 0; j < questions[i].length; j++){
               per_person_data.push(questions[i][j]);
               per_person_data.push(scores[i][j]);
          }
          summary_answers.push(per_person_data);*/

          for(var j = 0; j < categories.length; j++){
               per_person_data.push(categories[j]);
               per_person_data.push('');
               for(var k = 0; k < questions[j].length; k++){
                    per_person_data.push(questions[j][k]);
                    per_person_data.push(scores[i][k + j]);
                    for(var l = 0; l < comments.length; l++){
                         per_person_data.push(comments[i][k+j][l]);
                    }
               }
               per_person_data.push('');
          }
          summary_answers.push(per_person_data);
     }

     console.log(summary_answers);
     console.log(summary_answers[0].length);

     for(var i = 0; i < participants.length; i++){
          addValues_in_Sheet(summary, i, summary_answers[i]);
     }     

     if(prompt_final() == true)
          summary.generate(filename + '.xlsx');
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