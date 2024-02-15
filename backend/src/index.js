import {} from 'dotenv/config'
import db from './database/db.js';
import {app} from './app.js'

console.log(`${process.env.DB_NAME}`);


db()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(" mongodb connection failed !!! ", err);
})