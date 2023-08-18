const ip = require("ip");

module.exports = {
  ipAddress: async () => {
    const clockInIp = ip.address();
    return clockInIp;
  },
};
