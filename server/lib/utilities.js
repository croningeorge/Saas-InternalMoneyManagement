var moment = require("moment-timezone");
var path = require("path");

function isExist(check_array, key, value) {
  let flag = false;
  for (let i = 0, len = check_array.length; i < len; i++) {
    if (check_array[i][key] == value) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
 * Date time for create_at,updated_at,deleted_at,now
 * @param {*response} res
 * @return UTC time
 */
function createUpdateDate(res) {
  return moment
    .utc(new Date().toUTCString())
    .format(res.app.get("dbTimeFormat"));
}

/**
 *
 * @param {*response} res
 * @param {*String} date_time : Date time string
 * @param {*String} tz : timezone
 * @return Date time in tz
 */
function dislayTime(res, date_time, tz) {
  var fmt = res.app.get("dbTimeFormat");
  var zone = tz;
  var utc = moment.tz(date_time, fmt, "UTC");
  var time_zone = utc
    .clone()
    .tz(zone)
    .format(res.app.get("viewTimeFormat"));
  return time_zone;
}

/**
 *
 * @param {*response} res
 * @param {*String} date_time : Date time string
 * @param {*String} tz : timezone
 * @return utc time
 */
function saveTime(res, date_time, tz) {
  var date_time = "05/30/2014 11:21:37 AM";
  var fmt = res.app.get("viewTimeFormat"); // must match the input
  var zone = tz;
  var time_zone = moment.tz(date_time, fmt, zone);
  var utc = utc
    .clone()
    .tz("UTC")
    .format(res.app.get("dbTimeFormat"));
  return utc;
}

async function uploadFiles(res, upload_type, file) {
  try {
    const publicPath = res.app.get("publicPath");
    let upload_path = "";
    const file_name = `${Math.floor(new Date() / 100000)}${path.extname(
      file.name
    )}`;
    switch (upload_type) {
      case "kyc":
        upload_path = publicPath + res.app.get("kycFilePath");
        break;
    }
    const full_path = `${upload_path}/${file_name}`;
    const uploaded = await file.mv(full_path);
    return {
      status: true,
      message: "File uploaded",
      file_name: file_name
    };
  } catch (err) {
    return {
      status: false,
      message: "File upload failed",
      file_name: null
    };
  }
}

module.exports = {
  isExist: isExist,
  createUpdateDate: createUpdateDate,
  dislayTime: dislayTime,
  saveTime: saveTime,
  uploadFiles: uploadFiles
};
