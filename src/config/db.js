const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Optional: Prevent re-connection if already connected
        if (mongoose.connection.readyState === 1) {
            console.log('DB already connected');
            return;
        }

        await mongoose.connect(process.env.MONGO_URI, {
            appName: 'my-app-name-prod' // MongoDB Atlas monitoring
        });

        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Error in DB Connection:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;   