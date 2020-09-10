//sets the current date and time on top
var date = (moment().format('MMMM Do YYYY, HH:mm:ss'));
$("#currentDay").append(date);

//grabbing the id's and storing them in an array
var hourID = ["#9", "#10","#11","#12","#1","#2","#3","#4","#5"];

//var has to represent HH:mm:ss military time
var realTime = ["09:00:00","10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];

//setting the code for local storage
var plannerParts = [];
var getLocalStorageData = JSON.parse(localStorage.getItem("plannerTasks"));

plannerParts = getLocalStorageData;


for(var i = 0; i<hourID.length; i++){
    var time = $(hourID[i]);
    var idButton = time.parent().parent().find("button"); //finds the button corresponding to loop id


    if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + realTime[i])) { 
        time.attr("class", "future");
        //sets the value for the local variable
        plannerParts.forEach(function(part){
            if (hourID[i] === ("#" + (part["input-id"]))){
                time.val(part["input-value"]);
            }
        })

    } else{
        if ((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY')+ ", " + realTime[i])) {
        time.attr("class", "past"); //gives attibutes associated with the past class in css
        $(".past").attr("disabled", "disabled"); //prevents writting text
        }
    }

 };

//function to set up the local storage
 $("button").on("click", function(event){
    event.preventDefault();
    var contDiv = $(this).parent().parent();  
    var inVal = contDiv.find("input").val();
    var inId = contDiv.find("input").attr("id");
    var textObj = {
        "input-id": inId,
        "input-value": inVal };
  
  if (textObj["input-value"] !== "") {
    plannerParts.push(textObj);
    localStorage.setItem("plannerTasks", JSON.stringify(plannerParts));
  }
 })