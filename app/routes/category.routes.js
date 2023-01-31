require("dotenv").config();

const ValidationMiddleware = require("../middlewares/auth.validation.middleware.js");

module.exports = (app) => {
  const category = require("../controllers/category.controller.js");

  let router = require("express").Router();

  // Create a new category
  router.post("/", [
    // ValidationMiddleware.validJWTNeeded,
    // ValidationMiddleware.minimumPermissionLevelRequired(STAFF),
    category.create,
  ]);

  // Retrieve all category
  router.get("/", [
    // ValidationMiddleware.validJWTNeeded,
    // ValidationMiddleware.minimumPermissionLevelRequired(READONLY),
    category.findAll,
  ]);

  // Retrieve single category
  router.get("/:id", [
    // ValidationMiddleware.validJWTNeeded,
    // ValidationMiddleware.minimumPermissionLevelRequired(READONLY),
    category.findOne,
  ]);

  // Update category
  router.put("/:id", [
    // ValidationMiddleware.validJWTNeeded,
    // ValidationMiddleware.minimumPermissionLevelRequired(STAFF),
    category.update,
  ]);

  // Delete single category
  router.delete("/:id", [
    // ValidationMiddleware.validJWTNeeded,
    // ValidationMiddleware.minimumPermissionLevelRequired(ADMIN),
    category.delete,
  ]);

  // // Delete all m_role
  // router.delete("/", [
  //     ValidationMiddleware.validJWTNeeded,
  //     ValidationMiddleware.minimumPermissionLevelRequired(ADMIN),
  //     m_role.deleteAll
  // ]);

  app.use(process.env.PREFIX_API + "/category", router);
};
