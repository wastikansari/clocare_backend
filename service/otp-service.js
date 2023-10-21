const crypto = require("crypto");

const OtpService = {
  async generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  },
};

export default OtpService;
