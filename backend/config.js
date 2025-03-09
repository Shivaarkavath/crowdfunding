var PaytmConfig = {
  mid: process.env.mid,
  key: process.env.key,
  website: process.env.website,
};
module.exports.PaytmConfig = PaytmConfig;
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
// module.exports = connectDB;