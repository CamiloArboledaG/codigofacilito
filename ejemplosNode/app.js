const express = require("express");
const bodyParser = require("body-parser");
const app = express();
{
  /**app.use(express.static("public"));**/
}
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));
const places = [
  {
    title: "Oficina de la empresa",
    description: "Lorem ipsum",
    address: "Calle de la empresa, 123",
  },
  {
    title: "Oficina de la empresa",
    description: "Lorem ipsum",
    address: "Calle de la empresa, 123",
  },
  {
    title: "Oficina de la empresa",
    description: "Lorem ipsum",
    address: "Calle de la empresa, 123",
  },
];

app.get("/", (req, res) => {
  res.json(places);
});

app.post("/", (req, res) => {
  res.json(req.body);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
