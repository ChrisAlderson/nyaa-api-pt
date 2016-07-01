import cheerio from "cheerio";
import req from "request";

export default class Helper {

  constructor(options) {
    this.request = req.defaults(options);
  };

  get(qs, retry = true) {
    return new Promise((resolve, reject) => {
      const uri = "https://www.nyaa.se/";
      this.request({ uri, qs }, (err, res, body) => {
        if (err && retry) {
          return resolve(this.get(qs, false));
        } else if (err) {
          return reject(err);
        } else if (!body || res.statusCode >= 400) {
          return reject(new Error(`No data found, statuscode: ${res.statusCode}`))
        } else {
          return resolve(cheerio.load(body));
        }
      });
    });
  };

};
