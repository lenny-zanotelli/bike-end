// const createPool = require('@databases/pg');
// const { sql } = require('@databases/pg');

// const db = require('./../app/config/database');

// async () => {
//     await db
//         .query(sql.file('../migrations/deploy/structure.sql'))
//         .catch((ex) => {
//             console.error(ex);
//             process.exitCode = 1;
//         })
//         .then(() => db.dispose());

//     await db
//     .query(sql.file('migrations/deploy/other_tables.sql'))
//     .catch((ex) => {
//         console.error(ex);
//         process.exitCode = 1;
//     })
//     .then(() => db.dispose());
//     await db
//     .query(sql.file('migrations/deploy/user_seeding.sql'))
//     .catch((ex) => {
//         console.error(ex);
//         process.exitCode = 1;
//     })
//     .then(() => db.dispose());
//     await db
//     .query(sql.file('migrations/deploy/favorite_seeding.sql'))
//     .catch((ex) => {
//         console.error(ex);
//         process.exitCode = 1;
//     })
//     .then(() => db.dispose());
// };

const client = require('../app/config/database');
const fs = require('fs');

const sql = fs.readFileSync('../migrations/deploy/structure.sql').toString();
// const sqlFile = require('seed.sql')
// const sql = fs.readFileSync('./seed.sql').toString();

async () => {
    try {
        client.query(sql, function (err, result) {
            done();
            process.exit(0);
        });
    } catch (error) {
        console.log('error: ', error);
        process.exit(1);
    }
};
// pg.connect('postgres://test:test@localhost/test', function(err, client, done){
//     if(err){
//         console.log('error: ', err);
//         process.exit(1);
//     }
//     client.query(sql, function(err, result){
//         done();
//         if(err){
//             console.log('error: ', err);
//             process.exit(1);
//         }
//         process.exit(0);
//     });
// });
