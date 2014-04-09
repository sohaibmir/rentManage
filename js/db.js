//TO DELETE DATA ========> settings\applications\manage Applications\'select your application'\clear data.
//This is the page where all the database related transaction will take place.
       

function createTable(tx) {
        
        var sql = "CREATE TABLE IF NOT EXISTS tbl_rent ("+"fld_id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                                                          "fld_type VARCHAR(25) NOT NULL, " + 
                                                          "fld_number INTEGER," +
                                                          "fld_keeperName TEXT NOT NULL," +
                                                          "fld_contractDate DATE NOT NULL, "+
                                                          "fld_contractEndDate DATE NOT NULL, "+ 
                                                          "fld_advanceAmount INTEGER NOT NULL, "+
                                                          "fld_advancePaid INTEGER NOT NULL, "+ 
                                                          "fld_keeperIDcardNo VARCHAR(100) NOT NULL, "+
                                                          "fld_keeprPhoneNo VARCHAR(100) NOT NULL, "+
                                                          "fld_otherComments TEXT)";
        
       tx.executeSql(sql);

     // tx.executeSql('DROP TABLE tbl_rent');

       var sql = "CREATE TABLE IF NOT EXISTS tbl_rentPayment ("+"fld_id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                                                              "fld_rentID INTEGER NOT NULL, "+
                                                              "fld_rentMonth VARCHAR(100) NOT NULL, "+
                                                              "fld_rentYear INTEGER(100) NOT NULL, "+
                                                              "fld_rentAmount INTEGER NOT NULL, "+
                                                              "fld_rentPaid INTEGER NOT NULL)";
                                                             
                                                             
      
      tx.executeSql(sql);

     // tx.executeSql('DROP TABLE tbl_rentPayment');

      
      //THE CONTROL OF THE PROGRAM GOES TO successCB function, SO listAllKeepers function IS NOT NEEDED TO BE CALLED HERE.    
      //listAllKeepers(tx);
         
 }
 

 

//GET ALL KEEPERS
function listAllKeepers()
{
//  alert("Called from onload body function listAllKeepers");
 // if(db != null){
    db.transaction(function(transaction){
    var sql = "SELECT * FROM tbl_rent";
    console.log(sql);
    transaction.executeSql(sql, [], renderKeeperList, errorCB);  
  });
   // }
}


//LIST ALL KEEPERS
function renderKeeperList(tx, result)
{
    if (result != null && result.rows != null && result.rows.length > 0) {
      for (var i = 0; i < result.rows.length; i++) { 
          var row = result.rows.item(i); 
          //I HAD TO COPY ALL THE CSS SINCE, IT WAS NOT WORKING DYNAMICALLY
          $("#keeperList").append("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='false' data-iconpos='right' data-theme='b' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child ui-last-child ui-btn-up-b'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#viewKeeperDetailedInfo?id="+row.fld_id+"' data-rel='popup' data-position-to='window' data-role='button' data-icon='external-link' data-transition='pop' data-inline='true' class='ui-link-inherit' data-ajax='false'><i class='icon-align-left'></i> "+row.fld_keeperName+"<br/>"+row.fld_type+":"+row.fld_number +" - Phone: "+row.fld_keeprPhoneNo+"</a></div></div></li>");
        }
      } 

      else{
        $("#keeperList").append("<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='false' data-iconpos='right' data-theme='b' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-first-child ui-last-child ui-btn-up-b'><div class='ui-btn-inner ui-li'><div class='ui-btn-text'><a href='#' class='ui-link-inherit' data-ajax='false'><i class='icon-align-left'></i> No Result Found</a></div></div></li>");
    }
}

$(document).bind( "pagebeforechange", function( e, data ) {

  if ( typeof data.toPage === "string" ) {

    // We are being asked to load a page by URL, but we only
    // want to handle URLs that request the data for a specific
    // category.
      var u = $.mobile.path.parseUrl( data.toPage ),
      re = /^#vi/;
//
    if ( u.hash.search(re) !== -1 ) {
//
//      // We're being asked to display the items for a specific category.
//      // Call our internal method that builds the content for the category
//      // on the fly based on our in-memory category data structure.
      showUserOption( u, data.options );
//
//      // Make sure to tell changePage() we've handled this call so it doesn't
//      // have to do anything.
      e.preventDefault();
    }
  }
});

//THIS FUNCTION IS USED TO DYNAMICALL CREATE THE POP page, WHICH WILL GIVE USERS THE OPTION AGAINST RECORD
function showUserOption(urlObj, options)
{
  
  var userId = urlObj.hash.replace( /.*id=/, "" ),

// // content into is specified in the hash before the '?'.
      pageSelector = urlObj.hash.replace( /\?.*$/, "" );
      if ( userId !="" ) {
        var sql = "SELECT * FROM tbl_rent WHERE fld_id = "+userId;
       //PHONEGAP SQLLITE EXECUTION FUNCTION CALLED HERE, PAGE WILL BE CREATED IN THE SUCCESS FUNCTION      
        db.transaction(function(transaction){
        transaction.executeSql(sql, [], viewKeeperDetailedInfo, errorCB);
       });

       
      //PAGE OPTIONS AND THE URL OBJECT CONVERTED INTO GLOBAL VARIABLE.
        optionOption = options;
        urlOBJ = urlObj;

      }
  
}




//THIS IS WHEN YOU CANNOT ACCESS db.transacetion.executeSql
function submitForm()
 {


 var keeperName;
 var typenumber;
 var IDCard;
 var advance;
 var advancePaid;
 var contractEndDate;
 var phoneNo;
 var comments;
 var contractDate;
 var type;

if($("#name").val() == ""){
  alert("Name is not given");
  return false;
}else{
   keeperName = $("#name").val();
}


if($("#phoneNumber").val() == ""){
  alert("Phone Number not given");
  return false;
}else{
   phoneNo = $("#phoneNumber").val();
}

if($("#IDnumber").val() == ""){
   alert("ID not given");
   return false;
}else{
 IDCard = $("#IDnumber").val();
}


if($("#advaAmount").val() == ""){
  alert("Advance amount not given");
  return false
}else{
  advance = $("#advaAmount").val();
}

if($("#advaPaid").val() == ""){
  alert("Advance Paid not given");
  return false;
}else{
   advancePaid = $("#advaPaid").val();
}


if($("#typeNumber").val() == ""){
  alert("Accomodation no. empty");
  return false;
}else{
  typenumber = $("#typeNumber").val();
}



if($("#contractDate").val() == ""){
  alert("Contract Date not given");
  return false;
}else{
   contractDate = $("#contractDate").val();
}

if($("#contractEndDate").val() == ""){
  alert("Contract End Date not given");
  return false;
}else{
   contractEndDate = $("#contractEndDate").val();
}


if($("#comments").val() != ""){
 comments = $("#comments").val();
}else{
  comments = "No comments";
}
  
  if($('#radio-choice-ab').is(':checked')){ 
    type = $('#radio-choice-ab').val();
  }
  if($('#radio-choice-bb').is(':checked')){ 
    type = $('#radio-choice-bb').val();
  }
  if($('#radio-choice-cb').is(':checked')){ 
    type = $('#radio-choice-cb').val();
  } 

  
  db.transaction(function(transaction){
  console.log(type, typenumber, keeperName, contractDate, contractEndDate, advance, advancePaid, IDCard, phoneNo, comments);
  var sql = 'INSERT INTO tbl_rent (fld_type, fld_number, fld_keeperName, fld_contractDate, fld_contractEndDate, fld_advanceAmount, fld_advancePaid, fld_keeperIDcardNo, fld_keeprPhoneNo, fld_otherComments) VALUES (?,?,?,?,?,?,?,?,?,?)';
  console.log(sql);
  transaction.executeSql(sql, [type, typenumber, keeperName, contractDate, contractEndDate, advance, advancePaid, IDCard, phoneNo, comments], successOnFormSubmission, errorCB);
});

$("#name").val("");
$("#phoneNumber").val("");
$("#IDnumber").val("");
$("#advaAmount").val("");
$("#advaPaid").val("");
$("#typeNumber").val("");
$("#contractDate").val("");
$("#contractEndDate").val("");
$("#comments").val("");


}

 function monthlyPayments(userId){
  var sql = "SELECT * FROM tbl_rentPayment WHERE fld_rentID = "+userId;  
  db.transaction(function(transaction){
  transaction.executeSql(sql, [], viewKeeperMonthlyPayment, errorCB);
  });
}   

function deleteRentPayment(paymentId, userID){
  if(confirm('Payment record will be removed')){
     var sql = "DELETE FROM tbl_rentPayment WHERE fld_id = '"+paymentId+"'";
     uID = userID;
     db.transaction(function(transaction){
      transaction.executeSql(sql, [], successMonthlyPayment, errorCB);
     });
  }
}


function viewKeeperMonthlyPayment(tx, result){

  $("#monthlyPayments").html('<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b ui-first-child">Monthly Payments</li>');
  if (result != null && result.rows != null && result.rows.length > 0) {
      for (var i = 0; i < result.rows.length; i++) { 
          var monthly = result.rows.item(i);
          rent = monthly.fld_rentAmount;
          paid = monthly.fld_rentPaid;
          month = monthly.fld_rentMonth;
          year = monthly.fld_rentYear;
          rentID = monthly.fld_id;
          userID = monthly.fld_rentID;
          $("#monthlyPayments").append('<li data-icon="dollar" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="b" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-b"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#" style="font-size: 22px;" class="ui-link-inherit" onclick="deleteRentPayment('+rentID+','+userID+')">'+rent+' - '+paid+'<br/>'+month+' '+year+'</a></div><span class="ui-icon ui-icon-coffee ui-icon-shadow">&nbsp;</span></div></li>');

        }
  }
  else{
        $("#monthlyPayments").append('<li data-icon="dollar" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-iconpos="right" data-theme="b" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-b"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="#" style="font-size: 22px;" class="ui-link-inherit">No Record Found</a></div><span class="ui-icon ui-icon-coffee ui-icon-shadow">&nbsp;</span></div></li>');
   }
}

function savePayment(userId){

var rentAmount;
var rentPaid;
var rentMonth;
var rentYear;

  if($("#rentAmount").val() == ""){
    alert("Rent Amount is empty");
    return false;
  }else{
     rentAmount = $("#rentAmount").val();
  }

   if($("#rentPaid").val() == ""){
    alert("Rent paid is empty");
    return false;
  }else{
     rentPaid = $("#rentPaid").val();
  }


  if($("#rentMonth").val() == ""){
    alert("Rent Month is empty");
    return false;
  }else{
     rentMonth = $("#rentMonth").val();
  }


 if($("#year").val() == ""){
  alert("Year is empty");
  return false;
 }else{
  rentYear = $("#year").val();
  }

  uID = userId;

  var sql = "INSERT INTO tbl_rentPayment (fld_rentID, fld_rentPaid, fld_rentAmount, fld_rentMonth, fld_rentYear) VALUES (?, ?, ?, ?, ?) ";
  db.transaction(function(transaction){
  transaction.executeSql(sql, [userId, rentPaid, rentAmount, rentMonth, rentYear], successMonthlyPayment, errorCB);
  });

$("#rentAmount").val("") ;
$("#rentPaid").val("");
$("#rentMonth").val("");
$("#year").val("");

}

function successMonthlyPayment(){
 // alert(uID);
  monthlyPayments(uID);
}


//IN THIS FUNCTION WE HAVE BOTH THE QUERY RESULT AS WELL AS THE PAGE OPTIONS
function viewKeeperDetailedInfo(tx, result)
{

 var keeperData = result.rows.item(0);
 var $page;
 spanStyle = "style=float:right"; 
 hStyle = "style=height:3em";

 //page
 //dataPage = '<div id="slidemenu">Sohaib </div>';
 dataPage = '<div id="viewKeeperDetailedInfo" class="ui-page ui-body-b ui-page-header-fixed ui-page-active" data-role="page" tabindex="0" style="padding-top: 2px; min-height: 306px;">';
 slideMenue = dataPage+"<div data-role='panel' id='mypanel' data-theme='b'>";
 slideMenue = slideMenue+'<ul data-role="listview" id="monthlyPayments">';
//HERE THE RECORD WILL SHOW UP
 slideMenue = slideMenue+'</ul>';
//Montly Payment Form 
 slideMenue = slideMenue+'<ul data-role="listview" style="margin-top:20px;"><li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-b ui-first-child">Add Payment</li></ul>';
 slideMenue = slideMenue+'<form action="javascript:savePayment('+keeperData.fld_id+')" data-ajax="false">';
 slideMenue = slideMenue+'<input type="number" name="rentAmount" id="rentAmount"  data-clear-btn="true" placeholder="Rent Amount">';
 slideMenue = slideMenue+'<input type="number" name="rentPaid" id="rentPaid"  data-clear-btn="true" placeholder="Paid Amount">';
// slideMenue = slideMenue+'<input type="text" name="rentMonth" id="rentMonth"  data-clear-btn="true" placeholder=" Rent Month">';
 slideMenue = slideMenue+'<select name="rentMonth" id="rentMonth">';
   slideMenue = slideMenue+'<option value="">Month</option>';   
   slideMenue = slideMenue+'<option value="Jan">January</option>';
   slideMenue = slideMenue+'<option value="Feb">Feburary</option>';
   slideMenue = slideMenue+'<option value="March">March</option>';
   slideMenue = slideMenue+'<option value="April">April</option>';
   slideMenue = slideMenue+'<option value="May">May</option>';
   slideMenue = slideMenue+'<option value="June">June</option>';
   slideMenue = slideMenue+'<option value="July">July</option>';
   slideMenue = slideMenue+'<option value="Aug">August</option>';
   slideMenue = slideMenue+'<option value="Sep">September</option>';
   slideMenue = slideMenue+'<option value="Oct">October</option>';
   slideMenue = slideMenue+'<option value="Nov">November</option>';
   slideMenue = slideMenue+'<option value="Dec">December</option>';
 slideMenue = slideMenue+'</select>';
 slideMenue = slideMenue+'<input type="number" name="year" id="year"  data-clear-btn="true" placeholder="Year">';
 slideMenue = slideMenue+'<fieldset class="ui-grid-a"><div class="ui-block-a"><input type="submit" id="save" value="Save"></div>';
 slideMenue = slideMenue+'<div class="ui-block-b"><input type="reset" value="Clear"></div></fieldset></form>'; 
 slideMenue = slideMenue+'</div>';
 //header style
 header = slideMenue+'<div class="ui-header ui-bar-b ui-header-fixed slidedown" style="z-index: 0;" data-theme="b" data-tap-toggle="false" data-position="fixed" data-role="header" role="banner">';
 header = header+"<a href='#mypanel' data-role='button' onclick='monthlyPayments("+keeperData.fld_id+")' data-icon='tasks' data-inline='true'><i class='icon-align-left' style='float:left;'></i>";
//header = header+'<a href="#" data-slidemenu="#slidemenu" data-slideopen="false" data-icon="smico" data-corners="false" data-iconpos="notext">';
 //header = header+'<a class="ui-btn-left ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all" data-ajax="false" href="index.html" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="b"></a>';
 header = header+'<h1 class="ui-title" role="heading" style="margin-top:3px;">'+keeperData.fld_keeperName+'</h1></a></div>';

//content style
 content = header+'<div class="ui-content" data-role="content"  role="main">';
 content = content+'<ul class="nativeDroidCards" data-nativedroid-plugin="cards">';
 content = content+'<li data-cards-type="sports"> <div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
 content = content+'<a href="tel:'+keeperData.fld_keeprPhoneNo+'" style="color:#99cc00;" class="ui-link-inherit"><h2 '+hStyle+'>Phone No. : <span '+spanStyle+'>'+keeperData.fld_keeprPhoneNo+'</span> </h2></a></div></div>';
 content = content+'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><h2 '+hStyle+'>ID Card : <span '+spanStyle+'>'+keeperData.fld_keeperIDcardNo+'</span></h2></div></div>';
 content = content+'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><h2 '+hStyle+'>'+keeperData.fld_type+' - <span '+spanStyle+'>'+keeperData.fld_number+'</span></h2></div></div>';
 content = content+'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><h2 '+hStyle+'>Contract : <span '+spanStyle+'>'+keeperData.fld_contractDate+' - til - '+keeperData.fld_contractEndDate+'</span></h2></div></div>';
 content = content+'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><h2 '+hStyle+'>Advance : <span '+spanStyle+'>'+keeperData.fld_advanceAmount+'</span></h2></div></div>';
 content = content+'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><h2 '+hStyle+'>Advance Paid : <span '+spanStyle+'>'+keeperData.fld_advancePaid+'</span></h2></div></div>';
 content = content+'<p>'+keeperData.fld_otherComments+'</p>';
 content = content+ '</li>';

 //ATTACHING THE HTML WHICH WILL HAVE OPTIONS AGAINST RECORD
 content = content+'<li data-cards-type="weather">';
 content = content+'<h1>Options</h1>';
// content = content+'<p style="margin-left:13px;">Please choose one option</p>';
 content = content+'<div class="showastabs center nobg">';
 content = content+'<a data-rel="back" data-icon="edit" data-iconpos="left" data-role="button" data-inline="true" onclick="editKeeperRecord('+keeperData.fld_id+');">';
 content = content+'<h2>Edit Record</h2></a>';
 content = content+'<a href="" data-rel="back" data-icon="fire" data-iconpos="left" data-role="button" data-inline="true" onclick="deleteRecordKeeper('+keeperData.fld_id+');">'; 
 content = content+'<h2>Delete Record</h2></a>';
 content = content+'<a href="#keeperListPage" data-rel="back" data-icon="delete" data-iconpos="left" data-role="button" data-inline="true">'; 
 content = content+'<h2>Back</h2></a></div></li>';
 content = content+'</ul></div></div>';

 //$('#simple-menu').sidr();

 //THIS IS JUST FOR TESTING
 //content = '<div data-role="page" data-theme="b" id="editKeeper"> hahaha </div>';
  
//GETTIN ALL THE HTML IN ONE VARIABLE, AVOID CONFUSION AND KEEP A TRACK
 keeperInfo = content;

//ASSINGING THE HTML VARIABLE TO PAGE VARIABLE
 $page = $(keeperInfo);
//APPENEDING THE PREPARED PAGE TO THE MOBILE CONTAINER
 $page.appendTo($.mobile.pageContainer);
//GETTING THE PAGE TO CREATE
 $page.page();

 optionOption.dataUrl = urlOBJ.href;

//NOW CALLING THE PAGE WHICH IS JUST MADE
 $.mobile.changePage($page, optionOption);

//DATE PICKER TO ATTACH WITH THE ID OF TEXT FIELD
// $( "#rentMonth" ).datepicker();

 $("input[type='number']").each(function(i, el) {
    el.type = "text";
    el.onfocus = function(){this.type="number";};
    el.onblur = function(){this.type="text";};
});

$(document).on('pagehide', '#viewKeeperDetailedInfo', function(){ 
    $("#mypanel").remove();
});

 document.addEventListener("backbutton", onBackKey, false);

}

function onBackKey(){
  $.mobile.changePage('#keeperListPage');  
}





//UPDATING KEEPERS RECORD
function editKeeperRecord(id){
var sql = "SELECT * FROM tbl_rent WHERE fld_id = "+id;
console.log(sql);

db.transaction(function(transaction){
  transaction.executeSql(sql, [], editFormWithRecord, errorCB);
});  

event.stopPropagation();
event.preventDefault();

}

function editFormWithRecord(tx, result){
  if (result.rows.length > 0) {
    keeperRecord = result.rows.item(0);

console.log(keeperRecord.fld_keeperName);
    //TESTING TO KNOW IF DYNAMIC COTENT GETS THE PROPER CSS
   dataPage =  '<div data-role="page" data-theme="b" id="editKeeperForm">';
    
   header =  dataPage+  '<div data-role="header" data-position="fixed" data-tap-toggle="false" class="ui-header ui-bar-b ui-header-fixed" data-theme="b">';
   header =  header+   '<a href="index.html" ><i class="icon-ellipsis-vertical" style="float:left;"></i></a>';
   header =  header+   '<h1>Edit Keeper </h1></div>';

   content = header+  '<div data-role="content">';
   content = content+   '<form method="POST" action="javascript:editForm('+keeperRecord.fld_id+')" id="editKeeperKeeper"  data-ajax="false" >'
   content = content+    '<ul data-role="listview" data-inset="true">';
   content = content+       '<li data-role="fieldcontain">';
   content = content+         '<input type="text" name="keepername" id="keepername"  data-clear-btn="true" placeholder="Name" value="'+keeperRecord.fld_keeperName+'">';
   content = content+        '</li>';
   content = content+        '<li data-role="fieldcontain">';
   content = content+           '<input type="number" name="keeperNumber" id="keeperNumber"  data-clear-btn="true" placeholder="Phone Number" value="'+keeperRecord.fld_keeprPhoneNo+'">';
   content = content+         '</li>';
   content = content+           '<li data-role="fieldcontain">';
   content = content+            ' <input type="number" name="ID_card" id="ID_card" data-clear-btn="true" placeholder="ID Card Number" value="'+keeperRecord.fld_keeperIDcardNo+'">';
   content = content+            '</li>';
   content = content+            '<li data-role="fieldcontain">';
   content = content+             '<input type="number" name="adva_Amount" id="adva_Amount" data-clear-btn="true" placeholder="Advance amount" value="'+keeperRecord.fld_advanceAmount+'">';
   content = content+            '</li>';
   content = content+            '<li data-role="fieldcontain">'
   content = content+              '<input type="number" name="adva_Paid" id="adva_Paid" data-clear-btn="true" placeholder="Advance Amount Paid" value="'+keeperRecord.fld_advancePaid+'">';
   content = content+             '</li>';
   content = content+              '<li data-role="fieldcontain" style="z-index:0;">';
   content = content+                '<fieldset data-role="controlgroup" data-type="horizontal" data-mini="true">';

   if(keeperRecord.fld_type == 'Flat'){
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-ab" value="Flat"  checked="checked">';
   content = content+   '<label for="radio-choice-ab">Flat</label>';
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-bb" value="Shop" >';
   content = content+   '<label for="radio-choice-bb">Shop</label>';
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-cb" value="Basement">';
   content = content+   '<label for="radio-choice-cb">Basement</label>';
    }

    if(keeperRecord.fld_type == 'Shop'){
   content = content+    '<input type="radio" name="radio-choice-b" id="radio-choice-ab" value="Flat" >';
   content = content+    '<label for="radio-choice-ab">Flat</label>';
   content = content+    '<input type="radio" name="radio-choice-b" id="radio-choice-bb" value="Shop" checked="checked">';
   content = content+    '<label for="radio-choice-bb">Shop</label>';
   content = content+    '<input type="radio" name="radio-choice-b" id="radio-choice-cb" value="Basement">';
   content = content+    '<label for="radio-choice-cb">Basement</label>'; 
    }

    if(keeperRecord.fld_type == 'Basement'){
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-ab" value="Flat" >';
   content = content+   '<label for="radio-choice-ab">Flat</label>';
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-bb" value="Shop" >';
   content = content+   '<label for="radio-choice-bb">Shop</label>';
   content = content+   '<input type="radio" name="radio-choice-b" id="radio-choice-cb" value="Basement" checked="checked">';
   content = content+   '<label for="radio-choice-cb">Basement</label>';
    }

   content = content+                   '</fieldset>';
   content = content+                '</li>';
   content = content+                '<li data-role="fieldcontain">';
   content = content+                    '<input type="number" name="type_Number" id="type_Number" data-clear-btn="true" placeholder="Flat No. / Basement No. / Shop No" value="'+keeperRecord.fld_number+'"">';
   content = content+                '</li>';
   content = content+                   '<li data-role="fieldcontain">';
   content = content+                       '<input type="text" name="contract_Date" id="contract_Date" data-clear-btn="true" placeholder="Contract Signed Date" value="'+keeperRecord.fld_contractDate+'">';
   content = content+                   '</li>';
   content = content+                    '<li data-role="fieldcontain">';
   content = content+                       '<input type="text" name="contract_EndDate" id="contract_EndDate" data-clear-btn="true" placeholder="Contract End Date" value="'+keeperRecord.fld_contractEndDate+'">';
   content = content+                  '</li>';
   content = content+                   '<li data-role="fieldcontain">';
   content = content+                   '<textarea cols="40" rows="8" name="other_comments" id="other_comments" placeholder="Add Comments">'+keeperRecord.fld_otherComments+'</textarea>';
   content = content+                   '</li>';
   content = content+                    '<li style="z-index: 0;">';
   content = content+                     '<fieldset class="ui-grid-a">';
   content = content+                         '<div class="ui-block-a"><input type="submit" id="save" value="Save" style="width:95%"></div>';
   content = content+                         '<div class="ui-block-b"><input type="reset" value="Clear" style="width:95%"></div>';
   content = content+                     '</fieldset>';
   content = content+                   '</li>';
   content = content+               '</ul>';
   content = content+           '</form>';
   content = content+       '</div>';
   content = content+  '</div>';
   

var $page = $(content);
$page.appendTo($.mobile.pageContainer);
//$page.trigger("create");
$page.page();

$.mobile.changePage( $page );

//ATTACHING THE DATEPICKER WITH THE DATE FIELD
$( "#contract_Date" ).datepicker();
$( "#contract_EndDate" ).datepicker();

$("input[type='number']").each(function(i, el) {
    el.type = "text";
    el.onfocus = function(){this.type="number";};
    el.onblur = function(){this.type="text";};
});


  }
}

//EDIT KEEPER FUNCTION HERE THE EDIT QUERY WILL EXECUTE
//ALL THE FORMS FIELD SHAL BE COLLECTED IN HERE
function editForm(id){

var type;

//console.log($("#editKeeperKeeper"));

//This is ID OF THE DIV
console.log($("#keepername").val());

console.log($.mobile.activePage.find("#keepername").val());

//This is ID OF THE FORM
//console.log($("#editKeeperKeeper").find("#keepername").val());

var  name = $("#editKeeperKeeper").find("#keepername").val();

var phone = $("#editKeeperKeeper").find("#keeperNumber").val();

var cardID = $("#editKeeperKeeper").find("#ID_card").val();

  //Radion Button Checks
 if($("#editKeeperKeeper").find('#radio-choice-ab').is(':checked')){
  type = 'Flat';
 }
 if($("#editKeeperKeeper").find('#radio-choice-bb').is(':checked')){
  type = 'Shop';
 }
 if($("#editKeeperKeeper").find('#radio-choice-cb').is(':checked')){
  type = 'Basement';
 }

var number = $("#editKeeperKeeper").find("#type_Number").val();

var contrDate = $("#editKeeperKeeper").find("#contract_Date").val();

var contrEnd = $("#editKeeperKeeper").find("#contract_EndDate").val();

var advaAmnt = $("#editKeeperKeeper").find("#adva_Amount").val();

var advaPaid = $("#editKeeperKeeper").find("#adva_Paid").val();

var comment;
if($("#editKeeperKeeper").find("#other_comments").val() != "")
 comment = $("#editKeeperKeeper").find("#other_comments").val();
else
  comment = "No comments";

var formFields = new Array();
formFields = [name, phone, cardID, number, contrDate, contrEnd, advaAmnt, advaPaid];
var validationAlert = new Array();
validationAlert = ["Name not given", "Phone number not given", "ID not given", "Accomodation no. not given", "Contract Date not given", "Contract End Date not given", "Advance Amount not given", "Advance Paid not given"];
var a = 0;
var execute = false;

for(i=0; i<formFields.length; i++){
  if(formFields[i] == ""){
    alert(validationAlert[a]);
    return false;
  }else{
    execute = true;
  }
  a++;
}


var sql = 'UPDATE tbl_rent SET fld_keeperName = ?, fld_type = ?, fld_number = ?, fld_keeperIDcardNo = ?, fld_keeprPhoneNo = ?, fld_contractDate = ?, fld_contractEndDate = ?, fld_advanceAmount = ?, fld_advancePaid = ?, fld_otherComments = ? WHERE fld_id = ?';


if(execute){
  db.transaction(function(transaction){
  transaction.executeSql(sql, [name,type,number,cardID,phone,contrDate,contrEnd,advaAmnt,advaPaid,comment,id], successOnEditForm, errorCB);
  });
}

$("#editKeeperKeeper").find("#keepername").val("");
$("#editKeeperKeeper").find("#keeperNumber").val("");
$("#editKeeperKeeper").find("#ID_card").val("");
$("#editKeeperKeeper").find("#type_Number").val("");
$("#editKeeperKeeper").find("#contract_Date").val();
$("#editKeeperKeeper").find("#contract_EndDate").val("");
$("#editKeeperKeeper").find("#adva_Amount").val("");
$("#editKeeperKeeper").find("#adva_Paid").val("");
$("#editKeeperKeeper").find("#other_comments").val();



}



//DELETE KEEPERS RECORD
function deleteRecordKeeper(id){
  if(confirm("Payment record will also be removed?")){
     var sql = "DELETE FROM tbl_rentPayment WHERE fld_rentID = '"+id+"'";
     db.transaction(function(transaction){
      transaction.executeSql(sql);
     });

     sql = "DELETE FROM tbl_rent WHERE fld_id = '"+id+"'";
     console.log(db);

     db.transaction(function(transaction){
      transaction.executeSql(sql,[], successOnFormSubmission,errorCB);
     });
  }
}

/**************************************************************************************************************************************************/
/*************************************************** METHODS RELATED TO PAYMENT START FROM HERE****************************************************/
/**************************************************************************************************************************************************/
 

        // Transaction error callback
        //
        function errorCB(tx, err) {
          console.log(err.code);
            alert("Error processing SQL: "+err);
        }

        // Transaction success callback
        //
        function successCB() {
        //  alert("this is from success");
          listAllKeepers();

        }

        function successCBPayment(tx){
        alert("success!");
       // ListPaymentRecord(tx);
        }
        function successOnFormSubmission(){
         // alert("Success form submission");
          //I shall remove the old content present in the UL and replace it.
         $('#keeperList').empty();
         $.mobile.changePage('#keeperListPage', { transition: "none" });
         listAllKeepers();
        }
        function successOnEditForm(){
          $('#keeperList').empty();
         $('#editKeeperKeeper').remove();
         $.mobile.changePage('#keeperListPage', { transition: "none" });
         listAllKeepers();
        }

        

