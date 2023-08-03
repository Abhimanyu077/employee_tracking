const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "abhimanyusinghrathore27@gmail.com",
        pass: "jfssvremyauwlwhg",   
    },
});



module.exports = {
    transporter,
};