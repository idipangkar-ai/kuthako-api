/*
    User Model:
    1: Phone Number;
    2: Phone Suffix;
    3: User Name;
    4: Email (With validator);
    5: Email OTP;
    6: Email OPT Expire;
    7: Profile Picture;
    8: About;
    9: Last Seen;
    10: Is Online;
    11: Is Verified;
    12 Is Agreed;

    Time Stamps

*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true, // Automatically indexed
            trim: true,
        },
        phoneSuffix: {
            type: String,
            trim: true,
            select: false, // Hide from default queries
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            // lowercase: true, // Recommended if usernames are case-insensitive
        },
        email: {
            type: String,
            unique: true, // Automatically indexed
            sparse: true, // Allows multiple users with no email
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        emailOTP: {
            type: String,
            default: null,
            select: false, // CRITICAL: Hide OTP from API responses
        },
        emailOTPExpire: {
            type: Date,
            default: null,
            select: false, // Hide expiration logic from client
        },
        profilePicture: {
            type: String,
            default: '',
        },
        about: {
            type: String,
            maxlength: 250,
            default: '',
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isAgreed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        // Ensure virtuals (if added later) appear in JSON responses
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// --- Indexes for Performance ---
// Index for finding users by username quickly
userSchema.index({ username: 1 }); 
// Index for sorting users by lastSeen (e.g., "Active Users" list)
userSchema.index({ lastSeen: -1 }); 
// Compound index if you often search by verified status and lastSeen
userSchema.index({ isVerified: 1, lastSeen: -1 });

// --- Security Helper ---
// Method to safely return user data without sensitive fields
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        username: this.username,
        profilePicture: this.profilePicture,
        about: this.about,
        lastSeen: this.lastSeen,
        isOnline: this.isOnline,
        isVerified: this.isVerified,
        createdAt: this.createdAt,
    };
};

module.exports = mongoose.model('User', userSchema);   