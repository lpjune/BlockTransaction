var Block = require("../models/block");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

var async = require("async");

exports.index = function(req, res) {
  async.parallel(
    {
      block_count: function(callback) {
        Block.count(callback);
      }
    },
    function(err, results) {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results
      });
    }
  );
};

// Display list of all blocks.
exports.block_list = function(req, res, next) {
  Block.find({}, "title").exec(function(err, list_blocks) {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("block_list", { title: "Block List", block_list: list_blocks });
  });
};

// Display detail page for a specific block.
exports.block_detail = function(req, res, next) {
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        var err = new Error("Block not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("block_detail", { title: "Title", block: results.block });
    }
  );
};

// Display block create form on GET.
exports.block_create_get = function(req, res, next) {
  async.parallel({}, function(err, results) {
    if (err) {
      return next(err);
    }
    res.render("block_form", { title: "Create Block" });
  });
};

// Handle block create on POST.
exports.block_create_post = [
  // Validate fields.
  body("title", "Title must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("summary", "Summary must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("isbn", "ISBN must not be empty")
    .isLength({ min: 1 })
    .trim(),

  // Sanitize fields.
  sanitizeBody("*").escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Block object with escaped and trimmed data.
    var block = new Block({
      title: req.body.title,
      summary: req.body.summary,
      isbn: req.body.isbn
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      async.parallel({}, function(err, results) {
        if (err) {
          return next(err);
        }

        res.render("block_form", {
          title: "Create Block",
          block: block,
          errors: errors.array()
        });
      });
      return;
    } else {
      // Data from form is valid. Save block.
      block.save(function(err) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new block record.
        res.redirect(block.url);
      });
    }
  }
];

// Display block delete form on GET.
exports.block_delete_get = function(req, res, next) {
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        res.redirect("/catalog/blocks");
      }
      // Successful, so render.
      res.render("block_delete", { title: "Delete Block", block: results.block });
    }
  );
};

// Handle block delete on POST.
exports.block_delete_post = function(req, res, next) {
  // Assume the post has valid id (ie no validation/sanitization).

  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.body.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      // Success
      else {
        Block.findByIdAndRemove(req.body.id, function deleteBlock(err) {
          if (err) {
            return next(err);
          }
          // Success - got to blocks list.
          res.redirect("/catalog/blocks");
        });
      }
    }
  );
};

// Display block update form on GET.
exports.block_update_get = function(req, res, next) {
  // Get block for form
  async.parallel(
    {
      block: function(callback) {
        Block.findById(req.params.id).exec(callback);
      }
    },
    function(err, results) {
      if (err) {
        return next(err);
      }
      if (results.block == null) {
        // No results.
        var err = new Error("Block not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("block_form", { title: "Update Block", block: results.block });
    }
  );
};

// Handle block update on POST.
exports.block_update_post = [
  // Validate fields.
  body("title", "Title must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("summary", "Summary must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  body("isbn", "ISBN must not be empty")
    .isLength({ min: 1 })
    .trim(),

  // Sanitize fields.
  sanitizeBody("title").escape(),
  sanitizeBody("summary").escape(),
  sanitizeBody("isbn").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Block object with escaped/trimmed data and old id.
    var block = new Block({
      title: req.body.title,
      summary: req.body.summary,
      isbn: req.body.isbn
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      async.parallel({}, function(err, results) {
        if (err) {
          return next(err);
        }

        res.render("block_form", {
          title: "Update Block",
          block: block,
          errors: errors.array()
        });
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Block.findByIdAndUpdate(req.params.id, block, {}, function(err, theblock) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to block detail page.
        res.redirect(theblock.url);
      });
    }
  }
];
