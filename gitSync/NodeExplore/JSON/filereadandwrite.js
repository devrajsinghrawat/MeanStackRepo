const fs = require('fs');

var dataStoreObj = {
    signature: []
};

dataStoreObj.signature.push({ id: 'S', message: 'This is sender Proof', Sig: '0xasj1u3173187jhjhjh' });

let jsonString = JSON.stringify(dataStoreObj, null, 4);

fs.writeFile('./data.json', jsonString, 'utf8', (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log("data Added to Json")
    }
})

jsonString = JSON.stringify(dataStoreObj);

fs.readFile('./data.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        dataStoreObj = JSON.parse(data); //now it an object
        dataStoreObj.signature.push({ id: 'R', message: 'This is receiver Proof', Sig: '0xasewewewewe3187jhjhjh' });
        //add some data
        jsonString = JSON.stringify(dataStoreObj, null, 4); //convert it back to json
        fs.writeFile('./data.json', jsonString, 'utf8', (error, result) => {
            if (error) {
                console.error(error);
            } else {
                console.log("data Added to Json")
            }
        }); // write it back 
    }
});
//this.localStorage.setItem('data', JSON.stringify(obj));