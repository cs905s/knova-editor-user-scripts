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
// ==/UserScript==
var archive_comment = 'This Knova solution has been reviewed and its content has been moved to a validated application for Device master record content. It is no longer available on Knova online.';
var externalID = $('input[name=documentID]').val();
var workflowID = $('input[name=workflowID').val();


function SetNoteFields(zEvent) {
  console.log('Set note fields for externalID:'+externalID+ ' workflowID:'+workflowID);
  var noteFrame = document.getElementById('frmEdtNotes').contentWindow.document;
  $('textarea', noteFrame).val(archive_comment);
  $('form', noteFrame).submit();
  
}
function ArchiveDocument(zEvent) {
  SetNoteFields(zEvent);
  setTimeout(SetMainDocFields,1000);  
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
  document.getElementById('idContentobj0').contentWindow.document.body.innerHTML=archive_comment;
  document.getElementById('idContentobj1').contentWindow.document.body.innerHTML=archive_comment;
  document.getElementById('idContentobj2').contentWindow.document.body.innerHTML="<br>";
  document.getElementById('idContentobj3').contentWindow.document.body.innerHTML="<br>";
  document.getElementById('idContentobj4').contentWindow.document.body.innerHTML="<br>";
  document.getElementById('idContentobj7').contentWindow.document.body.innerHTML="<br>";
  document.getElementById('idContentobj8').contentWindow.document.body.innerHTML="<br>";
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
  unsafeWindow.saveDoc(); // This is the method called when you click Save draft.
  unsafeWindow.previewDoc();
  console.log('Doc saved');
  
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

setup_button();

// Rest of this is not really needed but it is cool so I left it here.
function multilineStr(dummyFunc) {
  var str = dummyFunc.toString();
  str = str.replace(/^[^\/]+\/\*!?/, '') // Strip function () { /*!
  .replace(/\s*\*\/\s*\}\s*$/, '') // Strip */ }
  .replace(/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
  ;
  return str;
}

GM_addStyle(multilineStr(function () { /*!
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
  */
}));
