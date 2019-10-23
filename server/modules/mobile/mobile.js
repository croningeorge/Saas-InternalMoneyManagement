/**
 * This file holds all the mobile api request handling related functionality
 */
var moment = require("moment-timezone");
var path = require("path");
// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const settings = require("../settings/index");
const user_module = require("../user/index");
//kyc status
const kyc_status = {
  0: "Kyc document expired, Please upload valid kyc documents",
  1: "Approved",
  2: "Kyc documents waiting for approval",
  3: "Kyc document(s) are rejected, Please upload valid kyc documents",
  4: "Please upload required kyc documents"
};

const kyc_document_type_table = "kyc_document_types";
const kyc_document_table = "kyc_documents";
const kyc_table = "kycs";
const user_table = "users";

/**
 * to get the Dashboard details
 *
 * @param {any} req
 * @param {any} res
 */
async function getDashboardDetails(req, res) {
  try {
    const userId = req.decoded.id;
    let status = 0;
    let message = ``;

    // fetching base url data from database
    const base_url_config = await settings.checkSettingExist("base_url");
    // if base url config is not in db check for app settings
    const base_url = base_url_config
      ? base_url_config.config_value
      : res.app.get("baseURL");

    // fetching the terms and conditions data from database
    const checkTermsAndConditions = await settings.checkSettingExist(
      "terms_and_condition"
    );

    const termsAndConditions = checkTermsAndConditions
      ? checkTermsAndConditions.config_value
      : "";

    //  TODO
    //  Change hard coded image and fetch it from database
    const banners = [
      {
        title: "Title 1",
        image: "/banners/remittance1.png"
      },
      {
        title: "Title 2",
        image: "/banners/remittance2.png"
      },
      {
        title: "Title 3",
        image: "/banners/remittance3.png"
      }
    ];
    const kyc_status = await getKycStatus(userId);
    if (kyc_status) {
      const return_data = {
        kyc_status: kyc_status,
        terms_and_conditions: termsAndConditions,
        banners: banners,
        file_base_url: base_url + "/uploads"
      };
      return response.success(res, return_data, "success");
    }
    return response.error(res, {}, "Something went wrong!", 500);
  } catch (err) {
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * get kyc status
 * @param {*int} user_id
 * @return JSON
 */
async function getKycStatus(user_id) {
  try {
    let sql = `SELECT cu.id AS user_id, cu.status AS user_status
    FROM users AS cu
    WHERE cu.id = $/user_id/`;
    const param = {
      user_id: user_id
    };
    const kyc_details_rec = await db.any(sql, param);
    return {
      status: kyc_details_rec[0].user_status,
      message: kyc_status[kyc_details_rec[0].user_status]
    };
  } catch (err) {
    return false;
  }
}

/**
 * List active kyc details for a user
 * @param {*request} req
 * @param {*response} res
 */
async function getKycDetails(req, res) {
  try {
    // fetching base url data from database
    const base_url_config = await settings.checkSettingExist("base_url");
    // if base url config is not in db check for app settings
    const base_url = base_url_config
      ? base_url_config.config_value
      : res.app.get("baseURL");
    let kyc_details = [];
    let sql = `SELECT cu.id AS user_id, cu.status AS user_status,
                k.id AS kyc_id, k.issued_date, k.expiry_date, k.path, k.status AS document_status, k.created_at,
                kd.id as document_id, kd.name as document_name, kd.is_primary,
                kdt.id as document_type_id, kdt.name as document_type_name, kdt.required_sec_doc
                FROM users AS cu
                LEFT JOIN kycs AS k ON cu.id = k.customer_id 
                LEFT JOIN kyc_documents AS kd ON  k.kyc_document_id = kd.id
                LEFT JOIN kyc_document_types AS kdt ON kd.kyc_document_type_id = kdt.id
                WHERE cu.id = $/user_id/ AND k.deleted_at IS NULL AND k.active = true`;
    const param = {
      user_id: req.decoded.id
    };

    const kyc_details_rec = await db.any(sql, param);

    for (let i = 0, len = kyc_details_rec.length; i < len; i++) {
      kyc_details[i] = {
        kyc_id: kyc_details_rec[i].kyc_id,
        document_id: kyc_details_rec[i].document_id,
        document_name: kyc_details_rec[i].document_name,
        document_type_id: kyc_details_rec[i].document_type_id,
        document_type_name: kyc_details_rec[i].document_type_name,
        is_primary: kyc_details_rec[i].is_primary ? 1 : 0,
        required_sec_doc: kyc_details_rec[i].required_sec_doc,
        issued_date: kyc_details_rec[i].issued_date
          ? utilities.dislayTime(
              res,
              kyc_details_rec[i].issued_date,
              req.decoded.timezone
            )
          : "",
        expiry_date: kyc_details_rec[i].expiry_date
          ? utilities.dislayTime(
              res,
              kyc_details_rec[i].expiry_date,
              req.decoded.timezone
            )
          : "",
        created_date: kyc_details_rec[i].created_at
          ? utilities.dislayTime(
              res,
              kyc_details_rec[i].created_at,
              req.decoded.timezone
            )
          : "",
        path: kyc_details_rec[i].path ? "/kyc/" + kyc_details_rec[i].path : "",
        document_status: kyc_details_rec[i].document_status
      };
    }
    const result = {
      kyc: kyc_details,
      file_base_url: base_url + "/uploads"
    };
    return response.success(res, result, "success");
  } catch (err) {
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Insert kyc details to database
 * @param {*response} res
 * @param {*int} user_id
 * @param {*int} kyc_document_id
 * @param {*String} file_name
 */
async function insertKyc(res, user_id, kyc_document_id, file_name) {
  try {
    const created_at = await utilities.createUpdateDate(res);
    let sql = `INSERT INTO ${kyc_table} 
    (customer_id, kyc_document_id, path, status, created_at) 
    VALUES($/customer_id/, $/kyc_document_id/, $/path/, $/status/, $/created_at/) 
    RETURNING id`;
    const param = {
      customer_id: user_id,
      kyc_document_id: kyc_document_id,
      path: file_name,
      status: 2,
      active: true,
      created_at: created_at
    };
    const insert_id = await db.one(sql, param); // return insert id
    return insert_id;
  } catch (err) {
    return false;
  }
}

/**
 * Save a new kyc doc
 * @param {*request} req
 * @param {*response} res
 */
async function saveKycDocs(req, res) {
  try {
    if (!req.files) {
      return response.error(res, {}, "No files were uploaded.", 400);
    }
    const kyc_document_id = req.body.document_type_id;
    const document = await response.getModelById(
      kyc_document_table,
      kyc_document_id
    );
    if (document.length < 0) {
      return response.error(res, {}, "Invalid request.", 400);
    }
    const user_id = req.decoded.id;
    let kyc_doc = req.files.kyc_doc;
    let created_at = await utilities.createUpdateDate(res);
    const old_doc_id = req.body.prev_id ? req.body.prev_id : false;

    // upload kyc doc
    const upload_file = await utilities.uploadFiles(res, "kyc", kyc_doc);

    if (upload_file.status) {
      // upload success
      if (old_doc_id) {
        // if doc is a replacemet of exp or rejected doc remove it
        const old_doc_status = await deactiveOldDoc(res, old_doc_id);
      }

      // insert new kyc details to database
      const insert_id = await insertKyc(
        res,
        user_id,
        kyc_document_id,
        upload_file.file_name
      );

      if (insert_id) {
        //get user status after new kyc
        const user_status = await getUserKycDocStatus(res, user_id);

        //update user status
        const user_update_stauts = user_module.updateUserStatus(
          user_id,
          user_status
        );

        // return data
        return response.success(
          res,
          { kyc_id: insert_id, user_status: user_status },
          "Kyc uploaded."
        );
      } else {
        return response.error(
          res,
          {},
          "File upload failed. Please try after sometime",
          500
        );
      }
    } else {
      return response.error(
        res,
        {},
        "File upload failed. Please try after sometime",
        500
      );
    }
  } catch (err) {
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Change active status of a kyc doc
 * @param {*response} res
 * @param {*int} doc_id
 */
async function deactiveOldDoc(res, doc_id) {
  try {
    let sql = `UPDATE ${kyc_table} SET active = false WHERE id = $/id/`;
    const param = {
      id: doc_id
    };
    return await db.one(sql, param);
  } catch (err) {
    return false;
  }
}

/**
 * Get the staus of user after uploading a kyc doc
 * @param {*response} res
 * @param {*int} user_id
 */
async function getUserKycDocStatus(res, user_id) {
  try {
    const status_array = [0, 3];
    let secondary_docs_found = 0;
    let secondary_docs_needed = 0;
    let is_reject_exp = 0;
    let rej_exp_status = 0;
    let rejected_secondary = 0;
    let valid_sec = 0;
    let sec_status = 0;
    let sql = `SELECT cu.id AS user_id, cu.status AS user_status,
    k.id AS document_id, k.issued_date, k.expiry_date, k.path, k.status AS document_status,
    kd.name as document_name, kd.is_primary,
    kdt.name as document_type_name, kdt.required_sec_doc
    FROM ${user_table} AS cu
    LEFT JOIN ${kyc_table} AS k ON cu.id = k.customer_id 
    LEFT JOIN ${kyc_document_table} AS kd ON  k.kyc_document_id = kd.id
    LEFT JOIN ${kyc_document_type_table} AS kdt ON kd.kyc_document_type_id = kdt.id
    WHERE cu.id = $/user_id/ AND k.deleted_at IS NULL AND k.active = true`;
    const param = {
      user_id: user_id
    };
    const kyc_details_rec = await db.any(sql, param);
    for (let i = 0, len = kyc_details_rec.length; i < len; i++) {
      if (kyc_details_rec[i].is_primary) {
        secondary_docs_needed = kyc_details_rec[i].required_sec_doc;
        if (status_array.includes(kyc_details_rec[i].document_status)) {
          is_reject_exp = 1;
          rej_exp_status = kyc_details_rec[i].document_status;
        }
      } else {
        secondary_docs_found += 1;
        if (status_array.includes(kyc_details_rec[i].document_status)) {
          rejected_secondary += 1;
          sec_status = kyc_details_rec[i].document_status;
        }
      }
    }
    valid_sec = secondary_docs_found - rejected_secondary;
    if (is_reject_exp) {
      return rej_exp_status;
    }
    if (valid_sec <= 0) {
      return sec_status;
    }
    if (secondary_docs_needed <= secondary_docs_found) {
      return 2;
    }
    return 4;
  } catch (err) {
    return false;
  }
}

/**
 * Get primary kyc details of a user
 * @param {*int} user_id
 * @return JSON
 */
async function getPrimaryDoc(user_id) {
  try {
    let sql = `SELECT k.id AS kyc_id, k.issued_date, k.expiry_date, k.path, k.status AS kyc_status,
      kd.name as document_name, kd.is_primary,
      kdt.name as document_type_name, kdt.required_sec_doc
      FROM ${kyc_table} AS k  
      LEFT JOIN ${kyc_document_table} AS kd ON  k.kyc_document_id = kd.id
      LEFT JOIN ${kyc_document_type_table} AS kdt ON kd.kyc_document_type_id = kdt.id
      WHERE k.customer_id = $/user_id/ AND kd.is_primary = true AND k.deleted_at IS NULL AND k.active = true`;
    const param = {
      user_id: user_id
    };
    const primary_kyc = await db.one(sql, param);
    return primary_kyc;
  } catch (err) {
    return false;
  }
}

/**
 * To check whether the uploaded documents are valid
 * ie check whether anyof the documents are expired or admin rejected/approval pending etc
 *
 * @param {any} kycs
 * @returns status 1 success 0 failed , message : description of failure
 */
async function checkKycStatus(kycs) {
  let message = "";
  let status = 1;
  let secondary_docs_found = 0; // sum of secondary docs found
  let secondary_docs_needed = 0; // sum of secondary docs required from the primary doc

  // iterate throgh the kyc documents and finding the status
  Object.keys(kycs).forEach(function(key) {
    let kyc = kycs[key];

    // 0 - expired
    // 1 - approved
    // 2 - pending
    // 3 - rejected
    // 4 - docs mismatch
    switch (kyc.status) {
      case 0:
        message = `Kyc document expired, Please upload valid kyc documents`;
        status = kyc.status;
        break;

      case 2:
        message = `Kyc documents waiting for approval`;
        status = kyc.status;
        break;
      case 3:
        message = `Kyc document(s) are rejected, Please upload valid kyc documents`;
        status = kyc.status;
        break;
    }

    if (kyc.is_primary) {
      secondary_docs_needed += kyc.required_sec_doc;
    } else {
      secondary_docs_found += 1;
    }
  });

  if (status == 1) {
    if (secondary_docs_needed != secondary_docs_found) {
      message = `Please upload required kyc documents`;
      status = 4;
    } else {
      message = `Kyc documents are verified`;
    }
  }

  return { message, status };
}

/**
 * check if posted phone numbers are registered.
 * @param {*request} req
 * @param {*response} res
 * @return JSON
 */
async function getContacts(req, res) {
  try {
    let numbers = req.body.numbers;
    let sql = `SELECT t1.id, t1.phone_number, t1.name FROM ${user_table} AS t1 WHERE phone_number IN ($1:csv)`;
    const param = [numbers];
    const contacts = await db.any(sql, param);
    return response.success(res, contacts, "Success");
  } catch (err) {
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * check if posted phone numbers are registered.
 * @param {*request} req
 * @param {*response} res
 * @return JSON
 */
async function updateUser(req, res) {
  try {
    let user_id = req.body.id;
    let sql = `UPDATE ${user_table} SET status = 4 WHERE id = $1`;
    const param = [user_id];
    await db.any(sql, param);
    sql = `UPDATE ${kyc_table} SET active = false WHERE customer_id = $1`;
    await db.any(sql, param);
    return response.success(res, {}, "Success");
  } catch (err) {
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

// exports all mobile related callbacks
module.exports = {
  dashboardDetails: getDashboardDetails,
  getKycDetails: getKycDetails,
  kycStatus: getKycStatus,
  saveKycDocs: saveKycDocs,
  getContacts: getContacts,
  updateUser: updateUser
};
