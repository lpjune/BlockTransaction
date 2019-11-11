var express = require("express");
var router = express.Router();

// Require our controllers.
var block_controller = require("../controllers/blockController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", block_controller.index);

// GET request for creating a Block. NOTE This must come before routes that display Block (uses id).
router.get("/block/create", block_controller.block_create_get);

// POST request for creating Block.
router.post("/block/create", block_controller.block_create_post);

// GET request to delete Block.
router.get("/block/:id/delete", block_controller.block_delete_get);

// POST request to delete Block.
router.post("/block/:id/delete", block_controller.block_delete_post);

// GET request to update Block.
router.get("/block/:id/update", block_controller.block_update_get);

// POST request to update Block.
router.post("/block/:id/update", block_controller.block_update_post);

// GET request for one Block.
router.get("/block/:id", block_controller.block_detail);

// GET request for list of all Block.
router.get("/blocks", block_controller.block_list);

module.exports = router;
