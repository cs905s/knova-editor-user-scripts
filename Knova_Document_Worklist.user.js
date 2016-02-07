// ==UserScript==
// @name        Knova Document editor - next doc
// @namespace   com.dmahajan.knova
// @description Enable next document button in editor
// @include     http://*/KanisaSupportCenter/authoring/editDocument.do*
// @include     https://*/KanisaSupportCenter/authoring/editDocument*
// @require     http://code.jquery.com/jquery-2.1.4.js
// @version     1
// @grant       none
// @noframes
// ==/UserScript==


// Author: Divya Mahajan
// Revision: 02-Dec-2015
// Initial version of worklist.
// Revision: 03-Dec-2015
// Shifted the files to Github
// NoFrames added to avoid reloading 8 times!!!


var base_url = 'http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter';
var doclist_url = 'https://raw.githubusercontent.com/cs905s/knova-editor-user-scripts/master/knova_hiss_worklist.js';
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
function setup_button()
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
  }
  //setup_progress(i, documentIDs.length);

}
/*
function setup_progress(current, total) {
  var circle = new ProgressBar.Circle('#example-percent-container', {
    color: '#FCB03C',
    strokeWidth: 3,
    trailWidth: 1,
    duration: 1500,
    text: {
      value: '0'
    },
    step: function (state, bar) {
      bar.setText((bar.value() * 100).toFixed(0));
    }
  });
  circle.animate((current * 1) / (total * 1), function () {
    circle.setText(current + '/' + total);
  });
}
*/
function LoadDocumentIDs() {
  var section = $('<div id="myContainer2" ><div id="nextDocMessage" class="body"></div></div>');
  $('span.header3').append(section);
  //unsafeWindow.documentIDs=['27372','27163','12123'];
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
      setup_button();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log('Could not load document IDs - '+doclist_url + ' : ' + errorThrown);
      document.getElementById('nextDocMessage').innerHTML = 'Next document not available. Could not load document IDs - ' + textStatus;
    });
  }
  
}

window.addEventListener("load",LocalMain,false);
function LocalMain() 
{
  LoadDocumentIDs();
}
