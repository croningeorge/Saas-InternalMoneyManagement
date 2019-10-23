/**
 * This file holds all the KYC Document related functionality
 */

// Include Common functions(Send Response)
const response = require("../../lib/common");
const utilities = require("../../lib/utilities");

const kyc_document_type_table = "kyc_document_types";
const kyc_document_table = "kyc_documents";
const kyc_table = "kycs";
const user_table = "users";

/**
 * List / Detail view of kyc doc types
 * @param {*request} req
 * @param {*response} res
 * @return array of kyc doc types
 */

async function kycDocTypes(req, res) {
  try {
    const user_id = req.decoded ? req.decoded.id : false;
    let user_kyc_doc_types = [];
    if (user_id) {
      user_kyc_doc_types = await getUsersValidKycDocIds(user_id);
    }
    let kyc_docs = [];
    const param = {
      id: req.params.id
    };
    let id_filter = req.params.id ? "AND kdt.id = ${id}" : "";
    let sql = `SELECT kdt.id as document_type_id, kdt.name as document_type_name, kdt.required_sec_doc, kdt.description as desc,
        kd.id as document_id, kd.name as document_name, kd.is_primary 
        FROM ${kyc_document_type_table} as kdt
        LEFT JOIN ${kyc_document_table} as kd ON kdt.id = kd.kyc_document_type_id
         WHERE kdt.deleted_at IS NULL AND kd.deleted_at IS NULL ${id_filter}`;

    const kyc_doc_types = await db.any(sql, param);
    for (let i = 0, len = kyc_doc_types.length; i < len; i++) {
      if (
        !utilities.isExist(kyc_docs, "id", kyc_doc_types[i].document_type_id)
      ) {
        let kyc_docs_type = {
          id: kyc_doc_types[i].document_type_id,
          name: kyc_doc_types[i].document_type_name,
          message: kyc_doc_types[i].desc,
          required_sec_doc: kyc_doc_types[i].required_sec_doc,
          kyc_docs: []
        };
        kyc_docs.push(kyc_docs_type);
      }
    }

    for (let i = 0, len = kyc_doc_types.length; i < len; i++) {
      for (let j = 0, inlen = kyc_docs.length; j < inlen; j++) {
        if (kyc_docs[j].id == kyc_doc_types[i].document_type_id) {
          if (kyc_doc_types[i].document_id) {
            let valid_doc_exist = await utilities.isExist(
              user_kyc_doc_types,
              "kyc_document_id",
              kyc_doc_types[i].document_id
            );
            let kyc_doc = {
              id: kyc_doc_types[i].document_id,
              name: kyc_doc_types[i].document_name,
              is_primary: kyc_doc_types[i].is_primary ? 1 : 0,
              if_exists: valid_doc_exist ? 1 : 0
            };
            kyc_docs[j].kyc_docs.push(kyc_doc);
          }
        }
      }
    }

    return response.success(res, kyc_docs, `success`);
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * get valid doc_type arry of a user
 * @param {*int} user_id
 */
async function getUsersValidKycDocIds(user_id) {
  try {
    // user_table
    let sql = `SELECT t1.kyc_document_id 
    FROM ${kyc_table} as t1 
    WHERE t1.status IN (1,2) 
    AND t1.active = true 
    AND t1.customer_id = $/user_id/ 
    AND t1.deleted_at IS NULL`;
    const doc_types = await db.any(sql, { user_id: user_id });
    return doc_types;
  } catch (err) {
    return false;
  }
}

/**
 * Create kyc doc type
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createKycDocTypes(req, res) {
  const name = req.body.name;
  const required_sec_doc = req.body.required_sec_doc;
  const description = req.body.description;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT kdt.name FROM ${kyc_document_type_table} as kdt WHERE kdt.name = $1 AND kdt.deleted_at IS NULL`;
      const doc_types = await db.any(sql, [name]);
      if (doc_types.length < 1) {
        // if no add
        sql = `INSERT INTO ${kyc_document_type_table}(name, required_sec_doc, description, created_at) VALUES($/name/, $/required_sec_doc/, $/description/, $/created_at/) RETURNING id`;
        const param = {
          name: name,
          required_sec_doc: required_sec_doc,
          description: description,
          created_at: created_at
        };
        return await db.one(sql, param); // return insert id
      } else {
        // else return 0
        return false;
      }
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Kyc Doc Type created"
        );
      } else {
        response.error(res, {}, "Kyc Doc Type already exist!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Update kyc doc type
 * @param {*request} req
 * @param {*response} res
 * @return json
 */
async function updateKycDocTypes(req, res) {
  const name = req.body.name;
  const id = req.body.id;
  const required_sec_doc = req.body.required_sec_doc;
  const description = req.body.description;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT kdt.name,kdt.id FROM ${kyc_document_type_table} as kdt WHERE kdt.name = $1 AND kdt.deleted_at IS NULL`;
      const doc_type = await db.any(sql, [name]);
      if (doc_type.length < 1 || doc_type[0].id == id) {
        // if no add
        sql = `UPDATE ${kyc_document_type_table} SET name = $/name/, required_sec_doc = $/required_sec_doc/, description = $/description/, updated_at = $/updated_at/ WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
        const param = {
          name: name,
          required_sec_doc: required_sec_doc,
          description: description,
          updated_at: updated_at,
          id: id
        };
        return await db.one(sql, param); // return id
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "kyc doc type updated"
        );
      } else {
        response.error(res, {}, "kyc doc type name already exist!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a kyc doc type(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeKycDocType(req, res) {
  const id = req.body.id;
  const deleted_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `UPDATE ${kyc_document_type_table} SET deleted_at = $/deleted_at/ WHERE id = $/id/ RETURNING id`;
      const param = {
        deleted_at: deleted_at,
        id: id
      };
      return await db.one(sql, param);
    })
    .then(data => {
      return response.success(res, { id: data.id }, "Kyc Doc Type removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * List / Detail view of kyc docs
 * @param {*request} req
 * @param {*response} res
 * @return array of kyc docs
 */

async function kycDocs(req, res) {
  try {
    let id_filter = req.params.id ? "AND kd.id = $/id/" : "";
    let sql = `SELECT kd.id AS id, kd.name AS name, kd.is_primary,
    kdt.name AS document_type, kdt.required_sec_doc 
    FROM ${kyc_document_table} AS kd
    LEFT JOIN ${kyc_document_type_table} AS kdt ON kd.kyc_document_type_id = kdt.id
    WHERE kd.deleted_at IS NULL ${id_filter}`;
    const param = {
      id: req.params.id
    };
    const kyc_docs = await db.any(sql, param);
    // success
    return response.success(res, kyc_docs, "success");
  } catch (err) {
    // error
    return response.error(res, {}, "Something went wrong!", 500);
  }
}

/**
 * Create kyc doc
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function createKycDoc(req, res) {
  const name = req.body.name;
  const kyc_document_type_id = req.body.kyc_document_type_id;
  const is_primary = req.body.is_primary;
  const created_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT kd.name FROM ${kyc_document_table} as kd WHERE kd.name = $1 AND kd.deleted_at IS NULL`;
      const doc = await db.any(sql, [name]);
      if (doc.length < 1) {
        // check kyc doc type exist
        const kyc_doc_type = await getKycDocTypeById(kyc_document_type_id);
        if (kyc_doc_type.length > 0) {
          sql = `INSERT INTO ${kyc_document_table}(name, kyc_document_type_id, is_primary, created_at) VALUES($/name/, $/kyc_document_type_id/, $/is_primary/, $/created_at/) RETURNING id`;
          const param = {
            name: name,
            kyc_document_type_id: kyc_document_type_id,
            is_primary: is_primary,
            created_at: created_at
          };
          return await db.one(sql, param); // return insert id
        }
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "Kyc Doc created"
        );
      } else {
        response.error(res, {}, "Kyc Doc creation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, err, "Something went wrong!", 500);
    });
}

/**
 * Get KYC Document type details by id
 * @param {*int} id
 */
async function getKycDocTypeById(id) {
  try {
    const param = {
      id: id
    };
    let sql = `SELECT kdt.name FROM ${kyc_document_type_table} as kdt WHERE kdt.id = $/id/ AND kdt.deleted_at IS NULL`;
    return await db.any(sql, param);
  } catch (err) {
    return [];
  }
}

/**
 * Update kyc doc
 * @param {*request} req
 * @param {*response} res
 * @return json
 */

async function updateKycDocs(req, res) {
  const id = req.body.id;
  const name = req.body.name;
  const kyc_document_type_id = req.body.kyc_document_type_id;
  const is_primary = req.body.is_primary;
  const updated_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      // Check for same name exist exist
      let sql = `SELECT kd.name,kd.id FROM ${kyc_document_table} as kd WHERE kd.name = $1 AND kd.deleted_at IS NULL`;
      const doc = await db.any(sql, [name]);
      if (doc.length < 1 || doc[0].id == id) {
        // check kyc doc type exist
        const kyc_doc_type = await getKycDocTypeById(kyc_document_type_id);
        if (kyc_doc_type.length > 0) {
          sql = `UPDATE ${kyc_document_table} 
          SET name = $/name/, kyc_document_type_id = $/kyc_document_type_id/, is_primary = $/is_primary/, updated_at = $/updated_at/ 
          WHERE id = $/id/ AND deleted_at IS NULL RETURNING id`;
          const param = {
            name: name,
            kyc_document_type_id: kyc_document_type_id,
            is_primary: is_primary,
            updated_at: updated_at,
            id: id
          };
          return await db.one(sql, param); // return id
        }
      }
      return false;
    })
    .then(data => {
      if (data) {
        return response.success(
          res,
          { id: data.id, name: name },
          "kyc doc updated"
        );
      } else {
        response.error(res, {}, "kyc doc updation failed!", 500);
      }
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

/**
 * Remove a kyc doc(soft delete)
 * @param {*request} req
 * @param {*response} res
 */
async function removeKycDoc(req, res) {
  const id = req.body.id;
  const deleted_at = await utilities.createUpdateDate(res);
  db
    .task(async t => {
      let sql = `UPDATE ${kyc_document_table} SET deleted_at = $/deleted_at/ WHERE id = $/id/ RETURNING id`;
      const param = {
        deleted_at: deleted_at,
        id: id
      };
      return await db.one(sql, param);
    })
    .then(data => {
      return response.success(res, { id: data.id }, "Kyc Doc removed");
    })
    .catch(err => {
      // return with exception
      return response.error(res, {}, "Something went wrong!", 500);
    });
}

// exports all kyc related callbacks
module.exports = {
  kycDocTypes: kycDocTypes,
  createKycDocTypes: createKycDocTypes,
  updateKycDocTypes: updateKycDocTypes,
  removeKycDocType: removeKycDocType,
  // kycDocs
  kycDocs: kycDocs,
  createKycDoc: createKycDoc,
  updateKycDocs: updateKycDocs,
  removeKycDoc: removeKycDoc
};
