module.exports = {
    'secret': 'supersecret',
    // 1. MongoDB
    REMOTE_MONGO_URI: process.env.REMOTE_MONGO_URI || "mongodb+srv://root:HRYIzBCIdvky4lwb@handmade-happiness-3skya.mongodb.net/test?retryWrites=true&w=majority",

     // 1. Local MongoDB
     LOCAL_MONGO_URI: process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1/spring',

     //Hosting PORT
     HOSTING_PORT :  process.env.port || 8080,
};