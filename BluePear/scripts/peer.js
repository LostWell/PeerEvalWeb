
function show_hide_icons(){
    var checkbox =  $('input:checkbox').is(':checked');
    console.log(checkbox[0]);
    var icon = document.getElementById('edit');

    if(checkbox > 0){
        console.log("Item is Checked!");
        icon.style.display = 'block';
    }
    else{
        console.log("No item is checked :<");
        icon.style.display = 'none';
    }
}

console.log('Program started!');

$(document).on('click', '#upload', function(){
    //Reference the FileUpload element.
    var fileUpload = $("#fileUpload")[0];

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:()'])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
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
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
});

// global variables
var all_data = [];
var scoring = [1,2,3,4,5];
var previous_category_index;
var inputs = [];

function ProcessExcel(data){
    
    //Read the Excel File data.
    var workbook = XLSX.read(data,{type: 'binary'});

    //Read all rows from all sheets into an JSON array.
    // data format = [[categories], [questions in category 1], [questions in category 2],....., [questions in category n], [team names], [team 1 participants], [team 2 participants],....., [team n participants]];
    var data = [];
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
    all_data = data;
    console.log(data);

    var participants = all_data[all_data[0].length + 2];
    
    // add categories to the dropdown list
    $('.categories').append(appendCategories(data[0]));
    setupCategoryQuestions(0, all_data[1], participants, scoring);
    for(var i = 0; i < data[0].length; i++){
        var input = [];
        for(var j = 0; j < 2; j++)
            input.push([]);
        inputs.push(input);
    }
    
    previous_category_index = 0;
}

$(document).on('change', '.categories', function(){
    $('.categories').val(this.value); // this.value = current category

    var current_category = all_data[0].indexOf(this.value);
    var participants = all_data[all_data[0].length + 2];
    //console.log('index of current category = ' + current_category);
    console.log('Current category: ' + this.value);
    console.log(all_data[0][previous_category_index]);

    inputs[previous_category_index] = store_inputs();
    setupCategoryQuestions(current_category, all_data[current_category + 1], participants, scoring);
    appendAnswers(current_category, inputs);
});

function appendCategories(categories){
    var appendData = '';
    for(var i = 0; i < categories.length; i++){
        appendData += '<option value="'+ categories[i] +'">'+ categories[i] +'</option>';
    }
    return appendData;
}

function setupCategoryQuestions(category_index, questions, participants, scoring){
    previous_category_index = category_index;
    $('.evaluation').html('');
    $('.evaluation').append(appendQuestions(questions, participants, scoring));
}

function appendQuestions(questions, participants, scoring){
    var appendData = '';
    var name = [];
    for(var i = 0; i < questions.length; i++){
        name.push(i);
        name.push(i + questions.length);
        var participant = appendParticipants(participants, scoring, name);
        appendData += '<li class="questionItem">\
                            <h4 class="question">'+ questions[i] +'</h4>' + participant + '\
                        </li>';
        name = [];
    }
    //console.log('Here!\n' + appendData);
    return appendData;
}

function appendParticipants(participants, scoring, name){
    var commentbox = addCommentTextbox();
    var appendData = '';
    for(var i = 0; i < participants.length; i++){
        var scores = scoringLabel(scoring, name[i]);
        appendData +=   '<table class="input">\
                            <tr>\
                                <th rowspan="2">' + participants[i] + '</th>' + scores +'\
                            </tr>'
                            + commentbox + '\
                        </table>';
    }

    return appendData;
}

function scoringLabel(score_legend, name){
    var appendScoring = '<td class=ratings>';
    for(var i = 0; i < score_legend.length; i++){
        appendScoring += '<label class="rating"><input type="radio" name="'+ name +'" value= "' + score_legend[i] +'">' + score_legend[i] + '</label>';
    }
    appendScoring += '</td>';
    //console.log(appendScoring);

    return appendScoring;
}

function addCommentTextbox(){
    var appendData =    '<tr>\
                            <td>\
                                <textarea class="comments" rows="1" cols="50" placeholder="Enter your comments here"></textarea>\
                            </td>\
                        </tr>';
    
    return appendData;
}

function appendAnswers(category_number, answers){
    console.log(category_number);
    var comments = $('.comments');
    if(answers[category_number][1].length != 0){
        for(var i = 0; i < comments.length; i++){
            comments[i].value = answers[category_number][1][i];
        }
    }

    var ratings = $('.ratings');
    if(answers[category_number][0].length != 0){
        for(var i = 0; i < ratings.length; i++){
            var labels = ratings[i].children;
            for(var j = 0; j < labels.length; j++){
                if (labels[j].firstElementChild.value == answers[category_number][0][i]){
                    labels[j].firstElementChild.checked = true;
                    break;
                }
            }
        }
    }
}

function store_inputs(){
    var ratings, comments= [], rating = [];

    ratings = $('.ratings');
    console.log('Radios:');
    for(var i = 0; i < ratings.length; i++){
        var labels = ratings[i].children;
        //console.log('Here!');
        for(var j = 0; j <= labels.length; j++){
            if(j == labels.length){
                rating.push('');
            }
            else if (labels[j].firstElementChild.checked == true){
                rating.push(labels[j].firstElementChild.value);
                break;
            }
        }
    }

    get_InputValues('comments', comments);
    current_inputs = [rating, comments];

    return current_inputs;
}
// filename, categories, questions, comments, scores, participants
function create_answer(){
    inputs[previous_category_index] = store_inputs();
    // 1 2 3 4 5 6
    // 1 3 5 2 4 6
    console.log("Generating Answers...");

    var filename = 'lol';
    var scores = [], comments = [];
    var categories = all_data[0];
    var participants = all_data[all_data[0].length + 2];

    for(var i = 0; i < inputs.length; i++){
        for(var j = 0; j < inputs[i].length; j++){ // inputs[i].length = 2
            if(j == 0){
                for(var k = 0; k < participants.length; k++){
                    for(var l = k; l < inputs[i][j].length; l+=participants.length){
                        //console.log(l + k);
                        scores.push(inputs[i][j][l]);
                    }
                }
            } else if(j == 1){
                for(var k = 0; k < participants.length; k++){
                    for(var l = k; l < inputs[i][j].length; l+=participants.length){
                        //console.log(l + k);
                        comments.push(inputs[i][j][l]);
                    }
                }
            }
        }
    }
    console.log('scores:')
    console.log(scores);
    console.log('comments:')
    console.log(comments);

    var summary_answers = [];
    var summary = $JExcel.new("Times New Roman 10");
    addSheetsNames(summary, participants);

    for(var i = 0; i < participants.length; i++){
         summary_answers.push([]);
    }

    for(var i = 0; i < participants.length; i++){
         summary_answers[i].push('Name: ' + participants[i]);
         summary_answers[i].push('');
    }
    
    for(var i = 0, current_question = 0, participants_left = (participants.length - 1); i < summary_answers.length; i++, participants_left--){
        //console.log('i = ' + i);
        current_question = i*(all_data[1].length);
         for(var j = 0; j < categories.length; j++){   
            summary_answers[i].push('Category: ' + categories[j]);
            var questions = all_data[j + 1];
            console.log('j = '+ j);
            for(var k = 0; k < questions.length; k++, current_question++){

                summary_answers[i].push(questions[k]);
                summary_answers[i].push('Rating: ' + scores[current_question]);
                summary_answers[i].push('Comment: ' + comments[current_question]);
                console.log('current question = ' + current_question);
            }
            
            current_question+=((questions.length*participants_left) + (all_data[j + 2].length*i));

            console.log('-current question = ' + current_question);
         }
    }

    for(var i = 0; i < participants.length; i++){
         addValues_in_Sheet(summary, i, summary_answers[i]);
    }

    console.log(summary_answers);

    if(prompt_final() == true)
         summary.generate(filename + '.xlsx');
}

function scoresPerCategory(scores){
    var score = [];
    for(var i = 0; i < scores.length; i++){
        var question_score = [];
        for(var j = 0; j < scores[i].length; j++){
             var question_scores = [];
             for(var k = 0; k < scores[i].length; k++){
                  question_scores.push(scores[i][k][j]);
             }
             question_score.push(question_scores);
        }
        score.push(question_score);
   }
   
   return score;
}

function commentsPerCategory(comments){

}

// add names of sheets (category)
function addSheetsNames(workbook, SheetNames){
    for(var i = 0; i < SheetNames.length; i++){
         workbook.addSheet(SheetNames[i]);
    }
}

// add values in specified sheet no.
function addValues_in_Sheet(workbook, SheetNo, values){
    workbook.set(SheetNo, 0, 0, '.'); // added this for easier parsing of data to peer side
    for(var i = 0; i < values.length; i++){
         workbook.set(SheetNo, 0, i+1, values[i]); // column, row
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
    if(check == true){
         console.log("finished getting inputs");
         //console.log(get_value(element_name));
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