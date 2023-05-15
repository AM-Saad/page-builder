const { validationResult } = require("express-validator/check");
const Template = require("../models/Template");
const io = require("../socket");
const fs = require('fs')
const path = require('path')
exports.templates = async (req, res, next) => {
  let files = []
  try {
    fs.readdirSync("views/templates").forEach(file => {
      files.push(file)
    });
    return res.render('templates', {
      path: '/templates',
      title: 'All Templates',
      files: files
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.template = async (req, res, next) => {
  const name = req.params.name
  try {
    return res.render(`templates/${name}`, {
      path: '/templates',
      title: 'All Templates',
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};



exports.edit = async (req, res, next) => {
  const name = req.params.name
  try {
    return res.render(`edit`, {
      path: '/edit',
      title: 'Edit Template',
      name: name
    })
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};



exports.save = (req, res, next) => {
  const searchValue = req.body.searchValue;
};
