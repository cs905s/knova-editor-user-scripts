var fs = require('fs');
var stringify = require('csv-stringify');
var parse = require('csv-parse');
var transform = require('stream-transform');

var docmap = {};
function pushDoc(templatename, docid) {
    if (typeof docmap[templatename] === "undefined") {
        docmap[templatename] = [];
        console.error(templatename);
    }
    docmap[templatename].push(docid);
}

function main() {
    var output = [];
    var parser = parse({ delimiter: ',' })
    var input = fs.createReadStream('AllKnovaDocs.csv');

    var transformer = transform(function (record, callback) {
        setTimeout(function () {
            pushDoc(record[1], record[0]);
            callback(null, "");//record[1]+","+record[0]+'\n');
        }, 500);
    }, { parallel: 1000 });
    input.pipe(parser).pipe(transformer).pipe(process.stdout);
    input.on('end', () => {
    console.log("Done. Output starting");
        for (var t in docmap) {
            console.log(t);
            if (docmap.hasOwnProperty(t)) {
                var docs = docmap[t];
                fs.writeFile("worklist/"+ t + ".json", JSON.stringify(docs));
                console.log("\t" + docs.length);
            }
        }
    });


}
main();
