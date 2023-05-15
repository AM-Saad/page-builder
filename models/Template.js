const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  files: {
    pages: [
      {
        name: String,
        path: String,
        title: String
      }
    ],
    css: [{ path: String }],
    js: [{ path: String }]
  },
  elements: [
    {
      id: String,
      edited: Boolean,
      type: String,
      tag: String,
      css: {
        dimensions: {
          position: String,
          top: String,
          bottom: String,
          left: String,
          right: String,
          height: String,
          width: String,
        },
        styles: {
          color: String,
          backgroundColor: String,
          backgroundImage: String,
          fontSize: String,
          display: String,
          margin: String,
          padding: String,
        }
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Template", TemplateSchema);
