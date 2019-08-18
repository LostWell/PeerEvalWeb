
console.log('Program started!');
var s = 'keep%8$this_part 3£$@plz £$% @£';
var r = s.replace(/[^a-z\d\s_]+/gi, "");
console.log(s);
console.log('Filtered:');
console.log(r);
 
 $(document).on('click', '#upload', function(){
     //Reference the FileUpload element.
     var fileUpload = $("#fileUpload")[0];
 
     //Validate whether File is valid Excel file.
     var regex = /^([a-zA-Z0-9\s_\\.\-:()])+(.xls|.xlsx)$/;
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
 
 function current_category(selection){
     console.log(selection);
     
 }
 
 $(document).on('change', '.categories', function(){
     $('.categories').val(this.value); // this.value = current category
 
     var current_category = all_data[0].indexOf(this.value);
     var participants = all_data[all_data[0].length + 1];
     console.log(current_category);
 
     setupCategoryQuestions(this.value, all_data[current_category + 1], participants);
     
 
 });
 
 var all_data = [];
 
 function setupCategoryQuestions(category, questions, participants){
     
 }
 
 function ProcessExcel(data){
     
     //Read the Excel File data.
     var workbook = XLSX.read(data,{type: 'binary'});
 
     //Read all rows from all sheets into an JSON array.
     var data = [];
     workbook.SheetNames.forEach(function(sheetName){
          console.log('Here!');
         // Here is your object
         var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
         var values = [];
         for(var i = 0; i < excelRows.length; i++){
             var value = JSON.stringify(excelRows[i]).replace(/[^a-z\d\s_]+/gi, ''); // \W = retain only [^0-9a-zA-Z_]
             console.log(value);
             values.push(value);
         }
         data.push(values);
     });
     all_data = data;
     console.log(data);
 
     var teams = data[data[0].length];
     
     var scoring = [1,2,3,4,5];
     //var score = scoringLabel(scoring);
     
     // add categories to the dropdown list
     $('.categories').append(appendCategories(data[0]));
 
     //$('#questions').append(appendQuestions(all_data[1], all_data[all_data[0].length + 1], scoring));
 }
 
 function appendQuestions(questions, participants, scoring){
     var participants = appendParticipants(participants, scoring);
     var appendData = '';
     for(var i = 0; i < questions.length; i++){
         appendData += '<li class="questionItem">\
                             <h4 class="question">'+ questions[i] +'</h4>' + participants + '\
                         </li>';
     }
     console.log('Here!\n' + appendData);
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
                                 <textarea rows="1" cols="50" placeholder="Enter your comments here"></textarea>\
                             </td>\
                         </tr>';
     
     return appendData;
 }
 
 function appendCategories(categories){
     var appendData = '';
     for(var i = 0; i < categories.length; i++){
         appendData += '<option value='+ categories[i] +'>'+ categories[i] +'</option>';
     }
     return appendData;
 }
 
 function scoringLabel(score_legend){
     var appendScoring = '<td class=ratings>';
     for(var i = 0; i < score_legend.length; i++){
         appendScoring += '<label class="rating"><input type="radio" name="rating01">' + score_legend[i] + '</label>';
     }
     appendScoring += '</td>';
     console.log(appendScoring);
 
     return appendScoring;
 }