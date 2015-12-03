# knova-editor-user-scripts

This is simple set of user scripts to automate editing of documents in the Kanissa knowledge management product (now owned by Knova). It will create two buttons "Set fields for archiving" and "Next Document" in the Knova document editor page. 

The "Set fields for archiving" button clears fields and inserts text in the fields to indicate the document is archived. You can edit the GreaseMonkey user script "Knova Document editor" if you want to change the text. It also inserts a note about the archival. After changing the fields, it pops up a preview window and saves the changes as draft. 

The "Next Document" button in the editor, lets you quickly go through a list of documents. The list of documents is stored as a JSON file (See - https://raw.githubusercontent.com/cs905s/knova-editor-user-scripts/master/knova_hiss_worklist.js). Edit the GreaseMonkey user script "Knova Document Editor - next doc" and insert the url in the line:
```javascript
var doclist_url = 'your_url_here';
```


##Installation
1. Download Firefox (https://firefox.com)
2. Install Greasemonkey addon/extension in Firefox (http://www.wikihow.com/Use-Greasemonkey). Use method 1 to install the add on.
If you already installed GreaseMonkey – click the dropdown next to the monkey icon, “Manage user scripts”. From the page delete the scripts “Knova Document Editor” and “Knova Document editor – next doc”.
3. Restart Firefox
4. Download two files 
	* https://raw.githubusercontent.com/cs905s/knova-editor-user-scripts/master/Knova_Document_Editor.user.js
	* https://raw.githubusercontent.com/cs905s/knova-editor-user-scripts/master/Knova_Document_Worklist.user.js
5. *(**Optionally**) Edit the files if you want to change the message or the worklist.*
5. Open the downloaded files in Firefox (Ctrl+O in Windows)
	(They have the filenames Knova*.user.js and should be in the downloads directory.)
	This will prompt you to install the script, click the Install button.


##Verify installation
1. Login to Knova (http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter/loginSubmit.do)
2. Find a document that you can edit and open the document editor.
3. You should see a button “Set Fields for archiving” on the top of the page. 
4. Click the button; it will clear the fields and pop up a preview window of your changes. Your changes are automatically saved as a draft.
5. For people working on the HISS document list, you will see another button “Next document” on the top of the page. Click this to quickly go to the next document.
6. To quickly go to a document when you have the external ID – type in the following URL (in this example, I’ve used 27163, change it to your document’s ID) http://pww.eureka.aai.ms.philips.com/KanisaSupportCenter/authoring/editDocument.do?externalID=27163
7. Lastly, go back to Knova homepage and check that your authoring inbox has the documents that you just edited..

Congrats, the plug in is working

