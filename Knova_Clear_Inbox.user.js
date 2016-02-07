// ==UserScript==
// @name        Knova Clear Inbox
// @namespace   com.dmahajan.knova.inbox
// @description Clear all workflows from inbox
// @include     http://*/KanisaSupportCenter/authoring/inbox.do*
// @include     https://*/KanisaSupportCenter/authoring/inbox.do*
// @require     http://code.jquery.com/jquery-2.1.4.js
// @version     1
// @grant       none
// @noframes
// ==/UserScript==

// This clears the workflow entries on the page.

var workflows=[];
function scanButton(index, element)
{
  try {
    //console.log(index+":"+this['onclick']);  
    var onclick = this['onclick'].toString();
    var i = onclick.indexOf('workflowID=');
    if (i > 0) {
      var workflow = onclick.substring(i + 11, i + 16);
      console.log(workflow);
      workflows.push(workflow);
      var url = "http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter/authoring/inbox.do?workflowID="+workflow+"&act=delete";
      $.ajax(url).then(
        function(data,textStatus,jqXHR) { console.log(workflow+": "+textStatus);},
        function(jqXHR,textStatus,errorThrown) {console.error(workflow+": "+textStatus+" : "+errorThrown);});
    }
  } catch (err) {
    console.log(err);
  }
}
function scanForWorkflows()
{
  console.log('Scanning');
  $('td[valign=middle] input.css_btn.css_btn').each(scanButton);
  
}
scanForWorkflows();
