import axios from "axios";
const BASE_URL = "https://api.abuseipdb.com/api/v2";
const API_KEY =
  "f2c3afb716768f8682440d39bb5e6ab3b9a6325949a53de4c24b47a9a983c1c5577fb722fc785499";

export const checkIP = async (req, res, next) => {
  const { ip } = req.params;
  axios
    .get(`${BASE_URL}/check`, {
      headers: {
        Key: API_KEY,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        ipAddress: ip,
        maxAgeInDays: 365,
      },
    })
    .then((data) => {
      req.handleResponse.successRespond(res)(data.data);
      next();
    })
    .catch((err) => {
      req.handleResponse.errorRespond(res)(err);
      next();
    });
};

export const getReports = async (req, res, next) => {
  const { ip } = req.params;
  axios
    .get(`${BASE_URL}/reports`, {
      headers: {
        Key: API_KEY,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        ipAddress: ip,
        maxAgeInDays: 365,
        page: 1,
        perPage: 100,
      },
    })
    .then((data) => {
      req.handleResponse.successRespond(res)(data.data);
      next();
    })
    .catch((err) => {
      req.handleResponse.errorRespond(res)(err);
      next();
    });
};

module.exports = {
  checkIP,
  getReports,
};
