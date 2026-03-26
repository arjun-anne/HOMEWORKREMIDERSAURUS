const nodemailer = require("nodemailer");
const sendmail = async(to,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASS
            }
        });
        await transporter.sendmail({
            from:process.env.EMAIL,
            totwo,subject,text,
        });
        console.log("mail send2",to);
    }
catch(error)
{console.log("nodemailerrorr",error)}
};
module.exports = sendmail;