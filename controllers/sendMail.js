const { createTransport } = require("nodemailer");

exports.sendMail = async (req, res) => {
    try {
        const {  emailTo, subject  , text , cc  , bcc , } = req.body;
      

    // create reusable transporter object using the default SMTP transport
    const transporter = createTransport({
        service : 'gmail',
        auth: {
            user : process.env.senderEmail,
            pass : process.env.senderPass
        }
    })
    //All Message in mail
    const mailData = {
        from : "bipin@nimapinfotech.com",
        to : emailTo,
        cc : cc,
        bcc : bcc,
        subject : subject,
        text : text,
        // attachments: [
        //     {   // utf-8 string as an attachment
        //         filename:  ,
        //         content: ,
        //     }]
    }
    //Sending Mail
       await transporter.sendMail(mailData, function(err,info) {
        if(err){
            console.log('not working ')
            return res.status(400).json(err)
        }
        else {
            console.log('email sent succes')
            return res.status(200).json({
                message : `Email Sent Successfully to ${mailData.to}`
            })
        }
    })
    } catch (error) {
        return error
    }

}

