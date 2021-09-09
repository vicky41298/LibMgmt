const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    issueDate: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        default: Date.now() + 24 * 60 * 60 * 1000 * 7
    },
    isRenewed: {
        type: Boolean,
        default: false
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const addTransaction = function(data, callback){
    const transaction = new Transaction(data);
    Transaction.save(function(error, result){
        if(error){
            return callback(error);
        }
        return callback(null, result);
    })
};

const isTranactionAvalible = function(transactionId, callback){
    Transaction.findOne(transactionId).select("stock").exec(function(error, result){
        if(error){
            return callback(error);
        }
        const availability = result.stock > 0 ? true: false;
        return callback(null, availability);
    });
}

module.exports = {
    isTranactionAvalible,
    addTransaction
};