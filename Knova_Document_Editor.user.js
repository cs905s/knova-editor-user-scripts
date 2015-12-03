// ==UserScript==
// @name        Knova Document editor - next doc
// @namespace   com.dmahajan.knova
// @description Enable next document button in editor
// @include     http://*/KanisaSupportCenter/authoring/editDocument.do*
// @include     https://*/KanisaSupportCenter/authoring/editDocument*
// @require     http://code.jquery.com/jquery-2.1.4.js
// @version     1
// @grant       none
// ==/UserScript==


// Author: Divya Mahajan
// Revision: 02-Dec-2015
//

var base_url = 'http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter';
var doclist_url = 'https://rv52ig.dm2301.livefilestore.com/y3mJYmDC3OHzULYFT6CNyev_7h93nweGXs_kPHa_0EtfRbZkmccnRyoxTvNBtweFwbonR5fjHZ3lQgmme76PLazpIu2OISf6efCE-BXbgQOmFyap_djOgUqZbMgvaleKk2AcfQ1BOnEWEtr6ieYyZjDDQ/knova_list.json?download&psid=1';//http://localhost/~usd05813/knova_list.json';
var documentIDs = [
  'No docs'
];
//     https://github.com/kimmobrunfeldt/progressbar.js/blob/master/dist/progressbar.min.js


var externalID = $('input[name=documentID]').val();
var nextDocID = '';
function JumpToNextDocument()
{
  window.alert(nextDocID);
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
    return;
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
    console.log('Loading IDs');
    $.ajax({
      dataType: 'jsonp',
      jsonpCallback: 'data_callback',
      url: doclist_url
    }).done(function (data, textStatus, jqXHR) {
      documentIDs = data;
      unsafeWindow.documentIDs = data;
      console.log(documentIDs.length + ' document IDs loaded. ');
      setup_button();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      window.alert('Could not load document IDs - ' + textStatus);
      document.getElementById('nextDocMessage').innerHTML = 'Next document not available. Could not load document IDs - ' + textStatus;
    });
  }
  
}
LoadDocumentIDs();
console.log("Loading");