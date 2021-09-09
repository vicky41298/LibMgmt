const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    firstname:String,
    lastName: String,
    email: String,
    mobile: String,
    authorized: Boolean,
    transactions:[{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }]
});

const Student = mongoose.model('Student', studentSchema);

const addNewstudent = function(data, callback){
    const student = new Student({
        ...data
    });
    student.save(function(error, result){
        if(error){
            console.error("Error Occured while Saving student", error.message);
            return callback(error);
        }
        return callback(null, result);
    });
}
const getAllBooksTakenBystudent=function(studentId, callback){
    Student.findById(studentId).populate('books').exec(function(error, result){
        if(error){
            console.error("Error Occured while Fetching student's Book", error.message);
            return callback(error);
        }
        return callback(null, result);
    });
};
const addNewBookTostudent = function(bookId, studentId, callback){
    Student.findByIdAndUpdate(studentId, { books: bookId }, function(error, data){
        if(error){ 
            return callback(error);
        }
        return callback(null, data);
    });
}

module.exports = {
    addNewstudent,
    getAllBooksTakenBystudent,
    addNewBookTostudent
};