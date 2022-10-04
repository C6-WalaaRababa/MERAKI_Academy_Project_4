const nodemailer = require('nodemailer');
const sendEmail=(req,res)=>
{
    const email=req.body.email;
    const firstName=req.body.firstName;
   const date=req.body.date;
   const transport = nodemailer.createTransport({
    service: 'gmail',
    auth:{
    type: "service_account",
    user:'lahlobaservices@gmail.com',
        pass: 'mudorzciireuuwyo',
  client_email: "lahlobaservices@my-project-12263-364518.iam.gserviceaccount.com",
  client_id: "103566074982747079010",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/lahlobaservices%40my-project-12263-364518.iam.gserviceaccount.com"
}
    



    // service: 'gmail',
    // auth: {
    //   type: 'OAuth2',
    //   user: 'lahlobaservices@gmail.com',
    //   pass: 'mudorzciireuuwyo',
     
  });

 const mailOptions = {
    from:`lahlobaservices@gmail.com`,// Sender address
    to: email, // List of recipients
    subject: 'appointment booking from lahloba app', // Subject line
   text:"hello from app"
};

transport.sendMail(mailOptions, function(err, info) {
   if (err) {
     console.log(err)
     res.json(err)
   } else {
     console.log(info);
     res.json('email sent')
   }
});


}
module.exports={sendEmail}
