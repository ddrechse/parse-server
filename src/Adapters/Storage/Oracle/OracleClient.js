const parser = require('./OracleConfigParser');
const oracledb = require('oracledb');

export function createClient(uri, databaseOptions) {
  let dbOptions = {};
  databaseOptions = databaseOptions || {};

  if (uri) {
    dbOptions = parser.getDatabaseOptionsFromURI(uri);
  }

  for (const key in databaseOptions) {
    dbOptions[key] = databaseOptions[key];
  }

  const initOptions = dbOptions.initOptions || {};
  initOptions.noWarnings = process && process.env.TESTING;

  console.log('MARK: initOracleClient()');
  let pgp;
  oracledb.initOracleClient({});
  const client = oracledb;

  return { client, pgp };
}
