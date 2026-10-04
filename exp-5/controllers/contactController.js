const Contact = require("../models/contactModel");

exports.getAllContacts = async (req, res) =>
    res.json(await Contact.find());

exports.getContact = async (req, res) =>
    res.json(await Contact.findById(req.params.id));

exports.createContact = async (req, res) =>
    res.status(201).json(await Contact.create(req.body));

exports.editContact = async (req, res) =>
    res.json(await Contact.findByIdAndUpdate(
        req.params.id, req.body, { new: true }
    ));

exports.deleteContact = async (req, res) =>
    res.json(await Contact.findByIdAndDelete(req.params.id));
