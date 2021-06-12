const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
})

const development = {
    name: "development",
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'socialize_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pandey.himanshu1772',
            pass: 'himanshu767861707'
        }
    },
    google_client_id: '213897699133-msefd52tijucq1pmdokeiicjvhdb7i4u.apps.googleusercontent.com',
    google_client_secret: '-plmRZ1ihxSZOO1fu24qeznK',
    google_callback_url: 'http://localhost:8000/user/auth/google/callback',
    jwt_secret: 'socialize',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}

const production = {
    name: "production",
    asset_path: process.env.SOCIALIZE_ASSETS_PATH,
    session_cookie_key: process.env.SOCIALIZE_SESSION_COOKIE_KEY,
    db: process.env.SOCIALIZE_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALIZE_EMAIL_USERNAME,
            pass: process.env.SOCIALIZE_EMAIL_PASSWORD
        }
    },
    google_client_id: process.env.SOCIALIZE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALIZE_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.SOCIALIZE_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALIZE_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

// console.log("secret", process.env);

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);

