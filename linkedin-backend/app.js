const express = require("express");
const cors = require("cors");
const app = express();
const Linkedin = require("node-linkedin")("7781i62dh4zy7u", "IHMqzpWTL5viELt2");

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
    "AQVGOfRnGVMxI-9vyNkXhPyqURlwu8tjqINS9DsBJyi5sUYBaa92MVG99Ei6X6hvSdWNFr2pDlBKiesauzUReMdhcxioJ5NwxMEfgrjXSPU4EqRi6-7XwTwozOXJYOnNp8kWAbnHg9kMoiap3Cum2jD8yVQ6K5nOEWt5CuLEkVHZpV0d6mYTN57mdnxV-zs0ziBYGQnh-uWUU8ZX0FGa3hxOAN73ochZSaANlZuu6aO59ze89wA50VVbz39TqVQkcXaTwRNybIilyvZOENxEvJqh6laoLS23tKWNxk_7uBbFjDhBhLFUzgKPlRBucWS6EfKPoB8lYTxecu75jYpZj0RUAKjsqw"
  );

  linkedin.people.url(
    "https://www.linkedin.com/in/somnathdudhat",
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
