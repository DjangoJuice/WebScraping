var mongoose = require("mongoose");
// This will be the constructor that defines the schema for scraping articles
var Schema = mongoose.Schema;

// Use this schema for scraping articles
var ArticleSchema = new Schema({
    
    title: {
      type: String,
      required: true
    },
    
    link: {
      type: String,
      required: true
    },
    
    note: {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  });
  
  // Mongoose will create this model which can be exported
  var Article = mongoose.model("Article", ArticleSchema);
  
  // Import this into server.js where routes will be sending scraped articles
  module.exports = Article;