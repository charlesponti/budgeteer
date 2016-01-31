const util = require('util');
const sendgrid = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);

exports.sendMail = function sendMail(options, callback) {
  var email = new sendgrid.Email();

  email.addTo(options.to);
  email.setFrom(options.from || process.env.SENDGRID_DEFAULT_EMAIL);
  email.setSubject(options.subject);
  email.setHtml(options.body);

  return sendgrid.send(email, {
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  }, function(error, info) {
    if (error) {
      return util.log(error);
    }

    util.log('Message sent: ' + info.response);

    return callback();
  });
};
