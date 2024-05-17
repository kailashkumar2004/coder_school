// const mongoose = require("mongoose");
// const classSchema = new mongoose.Schema({
//     className: {
//         type: Number
//     },
//     rollNu: {
//         type: Number
//     },
//     roomNu: {
//         type: Number
//     },
//     rollCode: {
//         type: Number
//     },
//     registionNu: {
//         type: String
//     },
//     secation: {
//         type: String
//     },
//     openTime: {
//         type: String
//     },
//     offTime: {
//         type: String
//     },
   
// }, {
//     timestamps: true,
//     versionKey: false
// });
// const Class = mongoose.model("Class", classSchema);
// module.exports = { Class };

const { mongoose } = require("mongoose");
const sectionSchema = new mongoose.Schema({
    name: {
    type: String,
    },
    classTeacher: {
        type: Number,
        ref: 'User'
  },
  roleNo: Number
}, {
    timestamps: true,
    versionKey: false
}, { _id: false });



const classSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "UKG", "LKG", 'Pre-Nursery', 'Nursery', 'KG']
  },
  school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true
  },
  startTime: {
      type: String,
      required: true
  },
  endTime: {
      type: String,
      required: true
  },
  section: {
      type: sectionSchema,
      required: true
  }
}, {
  timestamps: true,
  versionKey: false
});
const Class = mongoose.model("Class", classSchema);
module.exports = { Class };