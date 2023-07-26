// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const moment = require("moment");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

  try {
    // GET API_KEY and base url from env
    const { API_KEY, POLYGON_BASE_URL } = process.env;
    if (!API_KEY || !POLYGON_BASE_URL) {
      return res.status(500).json({
        status: "error",
        message: "something went wrong, please try again later",
      });
    }

    // Check body parameters
    const { ticker_symbol, date } = req.body;
    if (!ticker_symbol) {
      return res.status(400).json({
        status: "failed",
        message: "please provide stock/enquity ticker symbol",
      });
    }

    const dateValue = moment(date, "YYYY-MM-DD");

    // Validate date YYYY-MM-DD
    const isValidDate = dateValue.isValid();
    if (!isValidDate) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid date, please provide date in YYYY-MM-DD format",
      });
    }
    // Check if date is before today or not
    if (dateValue.isSameOrAfter(moment().startOf("day"))) {
      return res.status(400).json({
        status: "failed",
        message: "Date should be before today's date",
      });
    }

    // Get open-close stats for stock/equity
    const url = `${POLYGON_BASE_URL}/open-close/${ticker_symbol}/${dateValue.format(
      "YYYY-MM-DD"
    )}`;
    const response = await axios.get(url, { params: { apiKey: API_KEY } });

    // check validity of success response
    if (!response?.data || response?.status != 200) {
      return res.status(response?.status ?? 500).json({
        status: "failed",
        message:
          response?.message ?? "Something went wrong, please try again later",
      });
    }

    // Return the response
    const { status, from, symbol, open, high, low, close, volume } =
      response.data;
    const resData = {
      status,
      date: from,
      ticker_symbol: symbol,
      open,
      high,
      low,
      close,
      volume,
    };
    return res.status(200).json(resData);
  } catch (err) {
    // Catch any error and return error response
    const data = err?.response?.data;
    const status = err?.response?.status;
    return res.status(status).json({
      status: data?.status,
      message:
        status === 429
          ? "You've exceeded the maximum requests per minute, please try again after sometime"
          : data?.message ?? "Something went wrong, please try again later",
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
