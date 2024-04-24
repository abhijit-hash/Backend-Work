const app = require('./app');


const dotenv = require('dotenv');
const connectdb = require('./config/database');

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectdb();

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Errror: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})