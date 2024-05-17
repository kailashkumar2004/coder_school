const { mongoose } = require("mongoose");
const AddressSchema = new mongoose.Schema({
  country: String,
  line1: String,
  line2: String,
  landmark: String,
  city: String,
  state: String,
  pinCode: Number,
  phoneNo: String,
  address: String,
}, { _id: false });

// {
//     "schoolName": "inter national public school",
//         "phone": "76386576",
//         "address": {
//             "country": "in",
//             "line1": "gurudat road",
//             "line2": "mulsabji mandihera",
//             "landmark": "",
//             "city": "gugram",
//             "state": "haryana",
//             "pinCode": "122015",
//             "phoneNo": "872656874",
//             "address": "mulhera gugram sabji amndi,
//         }
            
// }
const schoolSchema = new mongoose.Schema({
  schoolName: String,
  phone: String,
  contactNumber: String,
  principleName: String,

  regNumber: {
    type: String
  },
  active: {
    type: Boolean,
    default: false
  },
  address: AddressSchema,
  board: Array,
  department: {
    type: Array
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  // website: String,
  // registeredBy: {
  //   type: Number,
  //   ref: 'User'
  // },
  images: Array

},
  {
    timestamps: true,
    versionKey: false
  })

const School = mongoose.model("School", schoolSchema);
module.exports = { School };