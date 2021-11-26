const request = require('request');
var fs = require('fs');
var url = process.argv[2];
var fileName = process.argv[3];

//check for invalid url
if(url === undefined){
    console.log("Please provide a URL!!!");
    return;
}

//check if fileName was provided
if(fileName === undefined){
    console.log("Please provide a file name!!!");
    return;
}

//get the file size
const getFileSize = function(fileName, callback){
    //check the file stats
    fs.stat(fileName, function(err, stats){
        if(err){
            console.log(err);
            return false;
        }
        //return the file size in callback function
        callback(stats.size);
    });
};

//write the contents to a file
const writeToFile = function(data, callback){
    //write the contents to a file
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            callback(data);
        }
    });
};

//fetch the page contents
const getContent = function(url){          
    //make the request
    request(url, (error, response, body) => {
        //check for errors
        if (error) {
            console.log("Error fetching from provided URL:");
            // Print the error if one occurred
            console.log('error:', error);
            // Print the response status code if a response was received
            console.log('statusCode:', response && response.statusCode);
            // Print the HTML for the Google homepage.
            console.log('body:', body);
        } else {
            //write the contents to a file
            writeToFile(body, function(data){
                getFileSize(fileName, function(fileSize){ 
                    console.log(`Downloaded and saved ${fileSize} bytes to ${fileName}`);
                });
            });
        }
    });
};

//call the getContent function
getContent(url);
