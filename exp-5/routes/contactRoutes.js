const express = require("express");
const c = require("../controllers/contactController");

const router = express.Router();

router.get("/", c.getAllContacts);
router.get("/:id", c.getContact);
router.post("/", c.createContact);
router.put("/:id", c.editContact);
router.delete("/:id", c.deleteContact);

module.exports = router;
