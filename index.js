import express from "express";
import axios from "axios";
import fs from "fs";

const app = express();
const port = 3000;
let tempParams = "";
var stuff;
var tempRead = fs.readFileSync("tempdata.json", "utf-8");
if (tempRead) {
  var tempdata = JSON.parse(tempRead);
}
// console.log(tempdata[0].author_name[0]);
// var str = "ahmet ataman"
// console.log(str.includes("ata"));

// let tempdata = JSON.parse(tempRead);
// console.log(tempRead);
// console.log(JSON.parse(tempdata));
// JSON.parse(tempdata)

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  // console.log(req.body.searchParams);
  tempParams = "";
  const searchParamsArray = req.body.searchParams.split(" ");

  // console.log(searchParamsArray);

  for (let i = 0; i < searchParamsArray.length; i++) {
    if (i == searchParamsArray.length - 1) {
      tempParams = tempParams + searchParamsArray[i];
    } else {
      tempParams = tempParams + searchParamsArray[i] + "+";
    }
  }

  const url = "https://openlibrary.org/search.json?q=" + tempParams;
  try {
    const response = await axios.get(url);
    stuff = response.data.docs;
    // var asd="asdasd";
    fs.writeFile("tempdata.json", JSON.stringify(stuff), (err) => {
      err && console.log(err);
    });
  } catch (error) {
    console.log(error.message);
  }
  if (tempRead) {
    console.log("Write Succesful");
  }
  res.locals.stuff = stuff;
 
    res.render("index.ejs", stuff);

});

app.post("/viewCard", (req, res) => {
  console.log(req.body);
  var asd= JSON.stringify(req.body);
  fs.writeFile("yaz.json", asd, (err)=>{
    console.log(err);
  })
  // res.locals.stuff = JSON.parse(req.body);
  console.log(stuff);
  res.render("viewCard.ejs", stuff);
});

app.listen(port, (req, res) => {
  console.log("Listenin on port : " + port);
});
