/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

function createText(text){
    let newT = new MarkovMachine(text);
    console.log(newT.makeText());
}

function fileRelated(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        createText(data);
    });
}

async function urlRelated(path){
    try {
        let res = await axios.get(path);
        createText(res.data)
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}



let [method, path] = process.argv.slice(2);

if(method === 'file'){
    fileRelated(path)
} else if(method === 'url'){
    urlRelated(path)
} else {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
}

