const mongoose=require("mongoose");

const bookSchema= mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    flight : { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' }
})
const BookModel=mongoose.model("book",bookSchema);

module.exports={
    BookModel
}