const nodemailer = require("nodemailer")
const {google} = require("googleapis")

// Create a transporter using Gmail SMTP

const CLIENT_ID = "804132829876-jqdm4j68idkao61ek07u9ut4356jhpf5.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04Kx4vk9j0y80CgYIARAAGAQSNwF-L9IrTJqM5bySmrSXnO8QQW-Az_aYo7KKdYnx_7RHUMnrE6NTKAu7bjZuAKW0Wi1q6D6lun4"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"


const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


async function sendEmail(email, subject, body) {
    try {
        
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "verifyatsocialbridge@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'socialbridge <verifyatsocialbridge@gmail.com>',
            to: `${email}`,
            subject: `${subject}`,
            text: `${body}`,
            html: `<h1>${body}</h1>`
          };

          const result = await transport.sendMail(mailOptions)
          return result

    } catch (error) {
        return error
    }
}

module.exports =  sendEmail;

// sendEmail()
// .then(
//     (result) => {
//         res.status(200).json({
//             success: true,
//             message: "Mail sendt Successfully",
//             result: result
//         })
//     }
//     )
//     .catch(
//         (error) => {
//             res.status(500).json({
//                 success: false,
//                 message: "Mail could not be sent...try again later...",
//                 error: error.message
//             })
//         }
//         )


  