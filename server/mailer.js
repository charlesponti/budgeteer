const util = require('util');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

module.exports = function Mailer() {
  var mailer = {};

  // Set transporter to mailer used for sending mail
  mailer.transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  }));

  /**
   * Callback to be executed if error occurs
   * @param {function} callback Callback to be executed after mail is sent
   * @param {Error} error
   * @param {Object} info
   * @returns {*}
   */
   mailer.sendMailCallback = function(callback, error, info) {
    if (error) {
      return util.log(error);
    }
    util.log('Message sent: ' + info.response);
    return callback();
  };

  /**
   * Send mail with defined transport object
   * @param {object} options Configuration of email
   *     @param {Array}  options.to List of receivers
   *     @param {String} options.subject Subject line
   *     @param {String} options.text Plain text body
   *     @param {String} options.html HTML body
   * @param {function} callback Callback to be executed after mail is sent
   */
   mailer.sendMail = function sendMail(options, callback) {
    return mailer.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    }, mailer.sendMailCallback.bind(mailer, callback));
  };

  return mailer;
};
