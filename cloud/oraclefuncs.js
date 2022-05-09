

  initialized = false

  async function run() {
    const oracledb = require('oracledb')
    const user = "admin";
    const password = "password";
    const connectString = "parsemongo_high";
    const tnsnames = "/wallet"
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    if(initialized === false) {
    oracledb.initOracleClient({configDir: tnsnames});
    initialized = true;
    }
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: user,
            password: password,
            connectString: connectString
        });
        const result = await connection.execute(`select JSON_Serialize(DATA) from "Review"`);
        console.log(result.rows);
        return result.rows
    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.log(err);
            }
        }
    }
}

  Parse.Cloud.define('helloDB', async req => {
    req.log.info(req);
    result = await run()
    return result
  });