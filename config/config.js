var CONFIG = {};

CONFIG.PORT = (process.env.VCAP_APP_PORT || 3001);
CONFIG.DB_URL = 'mongodb://localhost/admin_panel';

module.exports = CONFIG;
