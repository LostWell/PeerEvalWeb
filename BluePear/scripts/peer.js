
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
    //console.log('inputs');
    //console.log(inputs);
    setupCategoryQuestions(current_category, all_data[current_category + 1], participants, scoring);
    appendAnswers(current_category, inputs);

});

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
            ratings[i] = answers[category_number][0][i];
            //ratings[i].append(.html());
        }
    }
    
}

function setupCategoryQuestions(category_index, questions, participants, scoring){
    previous_category_index = category_index;
    $('.evaluation').html('');
    $('.evaluation').append(appendQuestions(questions, participants, scoring));
}

function appendQuestions(questions, participants, scoring){
    var participants = appendParticipants(participants, scoring);
    var appendData = '';
    for(var i = 0; i < questions.length; i++){
        appendData += '<li class="questionItem">\
                            <h4 class="question">'+ questions[i] +'</h4>' + participants + '\
                        </li>';
    }
    //console.log('Here!\n' + appendData);
    return appendData;
}

function appendParticipants(participants, scoring){
    var commentbox = addCommentTextbox();
    var scores = scoringLabel(scoring);
    var appendData = '';
    for(var i = 0; i < participants.length; i++){
        appendData +=   '<table class="input">\
                            <tr>\
                                <th rowspan="2">' + participants[i] + '</th>' + scores +'\
                            </tr>'
                            + commentbox + '\
                        </table>';
    }

    return appendData;
}

function addCommentTextbox(){
    var appendData =    '<tr>\
                            <td>\
                                <textarea class="comments" rows="1" cols="50" placeholder="Enter your comments here"></textarea>\
                            </td>\
                        </tr>';
    
    return appendData;
}

function appendCategories(categories){
    var appendData = '';
    for(var i = 0; i < categories.length; i++){
        appendData += '<option value="'+ categories[i] +'">'+ categories[i] +'</option>';
    }
    return appendData;
}

function scoringLabel(score_legend){
    var appendScoring = '<td class=ratings>';
    for(var i = 0; i < score_legend.length; i++){
        appendScoring += '<label class="rating"><input type="radio" name="rating01" value= "' + score_legend[i] +'">' + score_legend[i] + '</label>';
    }
    appendScoring += '</td>';
    //console.log(appendScoring);

    return appendScoring;
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

function store_inputs(){
    var ratings = [], comments= [];

    ratings = $('.ratings');
    console.log('Radios:')

    get_InputValues('comments', comments);
    current_inputs = [ratings, comments];

    console.log(comments);

    /*for(var i = 0; i < current_inputs.length; i++){
        for(var j = 0; j < current_inputs[i].length; j++)
            console.log(current_inputs[i][j].value);
    }*/

    return current_inputs;
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