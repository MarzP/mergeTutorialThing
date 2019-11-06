const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages("otters");
 
 console.dir("parsedData: " + parsedData); //displays content of the object
 
 let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
 let randomIndex2 = Math.floor(Math.random() * parsedData.hits.length);
 let randomIndex3 = Math.floor(Math.random() * parsedData.hits.length);
 let randomIndex4 = Math.floor(Math.random() * parsedData.hits.length);
 res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL, 
            "image2":parsedData.hits[randomIndex2].largeImageURL,
            "image3":parsedData.hits[randomIndex3].largeImageURL,
            "image4":parsedData.hits[randomIndex4].largeImageURL});
 
            
}); //root route


app.get("/results", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    
    let parsedData = await getImages(keyword);

    //res.render("results", {"images":parsedData});
    let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
    let randomIndex2 = Math.floor(Math.random() * parsedData.hits.length);
    let randomIndex3 = Math.floor(Math.random() * parsedData.hits.length);
    let randomIndex4 = Math.floor(Math.random() * parsedData.hits.length);
    res.render("results", {"images":parsedData.hits[randomIndex].largeImageURL, 
            "images2":parsedData.hits[randomIndex2].largeImageURL,
            "images3":parsedData.hits[randomIndex3].largeImageURL,
            "images4":parsedData.hits[randomIndex4].largeImageURL});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});