const express = require("express");
const cors = require("cors");
const app = express();
const Linkedin = require("node-linkedin")("app-id", "secret");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//contact Routes
app.get("/", (req, res) => {
  res.status(200).send("linkedin api is Live ✌️");
});

app.get("/oauth/linkedin", function (req, res) {
  var scope = [
    "r_basicprofile",
    "r_fullprofile",
    "r_emailaddress",
    "r_network",
    "r_contactinfo",
    "rw_nus",
    "rw_groups",
    "w_messages",
  ];

  Linkedin.auth.authorize(res, scope);
  Linkedin.setCallback(
    req.protocol + "://" + req.headers.host + "/oauth/linkedin/callback"
  );
});

app.get("/oauth/linkedin/callback", function (req, res) {
  Linkedin.auth.getAccessToken(
    res,
    req.query.code,
    req.query.state,
    function (err, results) {
      if (err) return console.error(err);

      console.log(results);

      return res.redirect("/");
    }
  );
});

app.get("/link", (req, res) => {
  const linkedin = Linkedin.init(
    "-------------token------------"
  );

  linkedin.people.url(
    "-----------linkedin profile------------",
    function (err, $in) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log($in);
      return res.status(200).send($in);
    }
  );
});

//port
const PORT = process.env.PORT || 8088;

//starting a server
app.listen(PORT, () => {
  console.log(`Server is connecting on port ${PORT}`);
});
