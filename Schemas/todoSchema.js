const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// instance Method
todoSchema.methods = {
    findActive: () => mongoose.model('Todo').find({ status: 'active' }),

    findInactive: (cb) => mongoose.model('Todo').find({ status: 'inactive' }, cb),
};

// Static Method
todoSchema.statics = {
    findByJS() {
        return this.find({ title: /js/i });
    },
};
// Query helpers
todoSchema.query = {
    byLanguage(language) {
        return this.find({ title: new RegExp(language, 'i') });
    },
};

module.exports = todoSchema;
