import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    DB_URL,
    SMS_APIKEY,
    SMS_SENDER,
    JWT_SECRET,
    JWT_STAFF_SECRET,
    REFRESH_SECRET
    
} = process.env;