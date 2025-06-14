const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishedYear:{
        type:Number,
        required:true,
        default:0,
        min:0,
    },
    genre:[{
        type:String,
        required:true,
        enum:["Fiction","Autobiography","Historical","Romance","Fantasy","Mystery","Thriller","Non-Fiction","Self-help","Business"]
    }],
    language:{
        type:String,
    },
    country:{
        type:String,
    },
    rating:{
        type:String,
        default:0,
        min:0,
        max:10
    },
    summary:{
        type:String,
    },
    coverImageUrl:{
        type:String,
        required:true,
    }
},{
  timestamps:true,
});

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;