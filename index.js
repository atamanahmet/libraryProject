import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let tempParams = "";
var stuff;
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  console.log(req.body.searchParams);
  tempParams = "";
  const searchParamsArray = req.body.searchParams.split(" ");
  console.log(searchParamsArray);
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
  } catch (error) {
    console.log(error.message);
  }
  res.locals.stuff = stuff;
  res.render("index.ejs", stuff);
});

app.listen(port, (req, res) => {
  console.log("Listenin on port : " + port);
});
