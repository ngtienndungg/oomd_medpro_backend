const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
//
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Ho_Chi_Minh");

//swagger
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 8888;

//database
dbConnect();

const app = express();
const allowedOrigins = [
  "http://localhost:3000", // Client URL
  process.env.CLIENT_URL, // Admin URL
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "PUT", "GET", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const swaggerDoc = require("./swagger.json");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { customCssUrl: CSS_URL })
);

//image
app.use(express.json({ limit: "300mb" }));
app.use(express.urlencoded({ extended: true, limit: "300mb" }));

//routes
initRoutes(app);

app.listen(port, () => {
  console.log("Server running on the port: " + port);
});


