const express = require("express");
const cors = require("cors")
const Book = require("./models/book.models");
const {initializeDatabase} = require("./db/db.connect");
const app = express();

app.use(cors())
app.use(express.json());

initializeDatabase();

async function createBookData(newBook) {
    try{
        const book = new Book(newBook);
        const savedBook = await book.save();

        return savedBook;
    }catch(error){
        console.log("Error occured while creating a data",error)
    }
}

app.post("/books",async (req,res) => {
    try{    
        const book = await createBookData(req.body);

        if(!book.title || !book.author || !book.publishedYear || !book.language){
            res.status(400).json({error:"Title, Author, Published Year and language are required"})
        }else{
            res.status(201).json({message:"Book data created successfully",book:book})
        }
    }catch(error){
        res.status(500).json({error:"Failed to create book data"})
    }
})

async function readAllBooks (){
    try{
        const book = await Book.find()
        
        return book;
    }catch(error){
        console.log("Error while read all book data",error);
    }
}

app.get("/books",async (req,res)=>{
    try{
        const bookData = await readAllBooks();

        if(bookData.length !== 0){
            res.status(200).json(bookData);
        }else{
            res.status(404).json({error:"Book data does not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch Book data"})
    }
})

async function readBookByTitle (bookTitle) {
    try{
        const bookByTitle = await Book.findOne({title:bookTitle})

        return bookByTitle;
    }catch(error){
        console.log(error)
    }
}

app.get("/books/title/:bookTitle", async (req,res) => {
    try{
        const bookData = await readBookByTitle(req.params.bookTitle);

        if(bookData){
            res.status(200).json(bookData)
        }else{
            res.status(404).json({error:"Book data does not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the data"})
    }
})

async function readBookByAuthor (bookAuthor) {
    try{
        const bookByAuthor = await Book.find({author:bookAuthor})

        return bookByAuthor;
    }catch(error){
        console.log(error);
    }
}

app.get("/books/author/:bookAuthor", async (req,res) => {
    try{
        const bookData = await readBookByAuthor(req.params.bookAuthor)

        if(bookData.length !== 0){
            res.status(200).json(bookData)
        }else{
            res.status(404).json({error:"Book data does not found."})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the book data."})
    }
})

async function readBookByGenre (bookGenre) {
    try{
        const bookByGenre = await Book.find({genre:bookGenre})

        return bookByGenre;
    }catch(error){
        console.log("Error occurred while fetch data",error)
    }
}

app.get("/books/genre/:bookGenre",async (req,res) => {
    try{
        const bookData = await readBookByGenre(req.params.bookGenre);

        if(bookData.length !== 0){
            res.status(200).json(bookData)
        }else{
            res.status(404).json({error:"Book data does not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch book data"})
    }
})

async function readBookByReleaseYear (bookReleaseYear){
    try{
        const bookByReleaseYear = await Book.find({publishedYear:bookReleaseYear})

        return bookByReleaseYear;
    }catch(error){
        console.log("Error occurred while fetch the book data",error)
    }
}

app.get("/books/releaseYear/:bookReleaseYear", async (req,res) => {
    try{
        const bookData = await readBookByReleaseYear(req.params.bookReleaseYear);

        if(bookData.length !== 0){
            res.status(200).json(bookData);
        }else{
            res.status(404).json({error:"Book data does not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch book data"})
    }
})

async function updateBookRating (bookId,dataToUpdate) {
    try{
        const updateRating = await Book.findByIdAndUpdate(bookId,dataToUpdate,{new:true});

        return updateRating;
    }catch(error){
        console.log("Error occured while fetch the book data",error)
    }
}

app.post("/books/id/:bookId",async (req,res)=>{
    try{
        const bookData =  await updateBookRating(req.params.bookId,req.body);

        if(bookData){
            res.status(200).json({message:"Book data updated successfully",book:bookData});
        }else{
            res.status(404).json({error:"Book does not exist"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch data"})
    }
})

async function updateBookData (bookTitle,dataToUpdate){
    try{
        const updateBookData = await Book.findOneAndUpdate({title:bookTitle},dataToUpdate,{new:true});

        return updateBookData;
    }catch(error){
        console.log("Error while fetching the book data",error);
    }
}

app.post("/books/title/:bookTitle", async (req,res)=>{
    try{
        const bookData = await updateBookData(req.params.bookTitle,req.body);

        if(bookData){
            res.status(200).json({message:"Book is updated successfully", book:bookData});
        }else{
            res.status(404).json({error:"Book data does not found"});
        }
    }catch(error){
        res.status(500).json({error:"Failed to update book data"});
    }
})

async function deleteBookData (bookId) {
    try{
        const deleteBook = await Book.findByIdAndDelete(bookId);

        return deleteBook;
    }catch(error){
        console.log("Error occurred while delete book data")
    }
}

app.delete("/books/:bookId",async (req,res) =>{
    try{
        const bookData = await deleteBookData(req.params.bookId);

        if(bookData){
            res.status(200).json({message:"Book data deleted successfully.",book:bookData})
        }else{
            res.status(404).json({error:"Book data does not found"})
        }
    }catch(error){
        res.status(500).json({error:"Failed to fetch the data"});
    }
})

const PORT = 3000;

app.listen(PORT,() => {
    console.log("Server is running on port",PORT);
})