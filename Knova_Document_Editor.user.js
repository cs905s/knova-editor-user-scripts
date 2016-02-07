// ==UserScript==
// @name        Knova Document editor
// @namespace   com.dmahajan.knova
// @description Kanisa Knowledge management add on. In the document editor, add a button to clear out document fields and insert an archiving comment.
// @include     http://*/KanisaSupportCenter/authoring/editDocument.do*
// @include     https://*/KanisaSupportCenter/authoring/editDocument*
// @require     http://code.jquery.com/jquery-2.1.4.js
// @require https://cdn.firebase.com/js/client/2.3.2/firebase.js
// @version     1
// @grant       none
// @noframes
// ==/UserScript==


// Instructions
// Update the doclist_url
//   1. Point to a starting document in your browser.
//   2. The script will load and archive the document and automatically move to the next doc.
//   If the title begins with ARCHIVE - it skips the document.

var archive_comment = 'This Knova solution document and its attachments have been archived. It is no longer available on Knova online.';
var doclist_url = 'https://raw.githubusercontent.com/cs905s/knova-editor-user-scripts/master/knova_hiss_worklist.js';


var externalID = $('input[name=documentID]').val();
var workflowID = $('input[name=workflowID').val();


function SetNoteFields(zEvent) {
  console.log('Set note fields for externalID:'+externalID+ ' workflowID:'+workflowID);
  var noteFrame = document.getElementById('frmEdtNotes');
  var noteDoc = document.getElementById('frmEdtNotes').contentWindow.document;
  $('textarea', noteDoc).val(archive_comment);
  $('form', noteDoc).submit();
  noteFrame.addEventListener('load',function(e) {
    console.log('  Notes finished');
    setTimeout(SetMainDocFields,1500);
    //SetMainDocFields();
  })  
}
function ArchiveDocument(zEvent) {
  SetNoteFields(zEvent);
//  setTimeout(SetMainDocFields,2500);  
}


function resetFormInput(formname,inputname,val)
{
  var element=$('form[name=' + formname+'] input[name='+inputname+']');
  if (element != null)
  {
    var original=element.val();
    element.val(val);
    return original;
  }
}

function resetEditor(editorID,val)
{
  var editor=document.getElementById(editorID);
  if (editor==null) {
    return;
  }
  try {
    editor.contentWindow.document.body.innerHTML=val;
  } catch(err) {
    console.log('    '+editorID+': cannot reset - '+err);
  }   
}
function SetMainDocFields(zEvent) {
  /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
  console.log('Set main doc fields for externalID:'+externalID+ ' workflowID:'+workflowID);
  
  var old_title = $('input[name=title]').val();
  var new_title = 'ARCHIVE - ' + old_title;
  if (old_title.substring(0,7)=='ARCHIVE') 
  {
    // Already archived - so skip adding prefix to title;
  } else {
    $('input[name=title]').val(new_title);
  }
  console.log('Step 2');
  try {
    resetEditor('idContentobj0',archive_comment);
    resetEditor('idContentobj1',archive_comment);
    resetEditor('idContentobj2',"<br>");
    resetEditor('idContentobj3',"<br>");
    resetEditor('idContentobj4',"<br>");
    resetEditor('idContentobj5',"<br>");  // Not in original code
    resetEditor('idContentobj6',"<br>");  // Not in original code
    resetEditor('idContentobj7',"<br>");
    resetEditor('idContentobj8',"<br>");
    resetEditor('idContentobj9',"<br>");
    resetEditor('idContentobj10',"<br>");
    resetEditor('idContentobj11',"<br>");
  } catch(err) {
    console.log('  Step 2:'+err);
  }
  // form[name="editDocForm"] input[name="workflowID"]
  console.log('Step 3');
  try {
    var origAttachIDs=resetFormInput('editDocForm','attachIDs',"");
    resetFormInput('editDocForm','attachIDs',"");
    resetFormInput('editDocForm','attachFilenames',"");
    resetFormInput('editDocForm','attachSizes',"");
    resetFormInput('editDocForm','attachToRemove',origAttachIDs);
    console.log('  Original attachments:'+origAttachIDs);
  } catch(err1) {
    console.log('  Error:'+err1);
  }
  

  /*
  This way caused errors forcing the changes to be discarded.
  $('input[name=act]').val('save');
  $('input[name=XMLProblem_Cause]').val('&nbsp;');
  $('input[name=XMLProblem_Description_Details]').val(archive_comment);
  $('input[name=XMLProblem_Solution]').val('&nbsp;');
  $('input[name=XMLProduct_Information]').val('&nbsp;');
  $('input[name=XMLSource]').val('&nbsp;');
  $('input[name=XMLToolsUsed]').val('&nbsp;');
  $('input[name=XMLPartsUsed').val('&nbsp;');
  */
  //$('form[name=editDocForm]').submit();
  unsafeWindow.contentChanged();
  console.log('Doc is being saved');
  unsafeWindow.saveDoc(); // This is the method called when you click Save draft.
  //unsafeWindow.previewDoc();
  
}
// User interface setup

function setup_button()
{
  // Create a button on top
  var buttons = $('<div id="myContainer">' + 
                  '<button id="myButton1" type="button">Set fields for archiving</button>' + 
                  '</div>');
  $('span.header3').append(buttons);
  //--- Activate the newly added button.
  document.getElementById('myButton1').addEventListener('click', ArchiveDocument, false);
  console.log('New buttons inserted into the document');
}



var base_url = 'http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter';
var documentIDs = [
  'No docs'
];
var externalID = $('input[name=documentID]').val();
var nextDocID = '';
function JumpToNextDocument()
{
  //window.alert(nextDocID);
  window.location = base_url + '/authoring/editDocument.do?externalID=' + nextDocID;
}
function LastDocument()
{
  window.alert('You are on the last document in the worklist.');
}

function LoadDocumentIDs() {
  var section = $('<div id="myContainer2" ><div id="nextDocMessage" class="body"></div></div>');
  $('span.header3').append(section);
  if (unsafeWindow.documentIDs) {
    documentIDs = unsafeWindow.documentIDs;
    console.log(documentIDs.length + ' document IDs loaded from cache ');
    setup_button();
  } else {
    $.ajax({
      dataType: 'json',
      url: doclist_url
    }).done(function (data, textStatus, jqXHR) {
      documentIDs = data;
      unsafeWindow.documentIDs = data;
      console.log(documentIDs.length + ' document IDs loaded from list at '+doclist_url);
      setup_Nextbutton();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log('Could not load document IDs - '+doclist_url + ' : ' + errorThrown);
      document.getElementById('nextDocMessage').innerHTML = 'Next document not available. Could not load document IDs - ' + textStatus;
    });
  }
  
}

function setup_Nextbutton()
{
  var disableNextButton = true;
  var i = documentIDs.indexOf(externalID);
  var message = '';
  if (i < 0) {
    message = 'Editing ' + externalID + '. This is not in the worklist.';
    document.getElementById('nextDocMessage').innerHTML = message;
  } else if (i == (documentIDs.length - 1))
  {
    message = 'Editing ' + externalID + '. Last document';
    document.getElementById('nextDocMessage').innerHTML = message;
  } else {
    i = i + 1;
    message = ' Editing ' + externalID + ', the next document is ' + documentIDs[i] + '. You are on ' + i + ' out of ' + documentIDs.length + '.';
    nextDocID = documentIDs[i];
    document.getElementById('nextDocMessage').innerHTML = message;
    $('div#myContainer2').append('<button id="myNextDocumentButton" type="button">Next document (' + nextDocID + ')</button>');
    document.getElementById('myNextDocumentButton').addEventListener('click', JumpToNextDocument, false);
    JumpToNextDocument();
  }
  //setup_progress(i, documentIDs.length);

}


function localMain() {
  setup_button();
  var old_title = $('input[name=title]').val();
  var new_title = 'ARCHIVE - ' + old_title;
  if (old_title.substring(0,7)!='ARCHIVE') 
  {
    // Auto archive.
    ArchiveDocument();
  } else {
    LoadDocumentIDs();
  }
}

localMain();
