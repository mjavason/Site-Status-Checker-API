import { mailService, userService } from '../services';
import { APP_NAME, SITE_LINK } from '../constants';
import logger from '../helpers/logger';
const fs = require('fs');
const handlebars = require('handlebars');

async function renderMailTemplate(templatePath: string, data: object) {
  try {
    // Load the email template
    // const templatePath = './email-templates/welcome-email.html';
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Compile the template
    const compiledTemplate = handlebars.compile(emailTemplate);
    return compiledTemplate(data);
  } catch (e) {
    logger.error('Error compiling template');
    console.log(e);
    return false;
  }
}
class Controller {
  async sendWelcomeMail(email: string, firstName: string, lastName: string, token: string) {
    // Load the email template
    const templatePath = 'src/templates/welcome.html';

    const confirmationLink = `${SITE_LINK}/auth/welcome/${token}`;

    // Replace placeholders with actual data
    const data = {
      firstName: firstName,
      lastName: lastName,
      confirmationLink: confirmationLink,
    };
    // Compile the template
    const compiledTemplate = await renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;
    // Send the email
    const info = await mailService.sendMail(
      email,
      compiledTemplate,
      `${APP_NAME} #100DaysOfAPIAwesomeness Welcome`,
    );

    console.log(`#100DaysOfAPIAwesomeness Welcome email sent to: ${email}`);

    return { info };
  }

  // Send the reset email
  async sendPasswordResetEmail(email: string, token: string) {
    let user = await userService.findOne({ email });
    if (!user) {
      console.log(`User with email: ${email} does not exist`);
      return false;
    }

    const resetLink = `${SITE_LINK}auth/reset-password/${token}`;
    const data = {
      email: email,
      passwordResetLink: resetLink,
    };

    const renderedEmail = await renderMailTemplate('src/templates/password_reset.html', data);

    if (!renderedEmail) {
      console.log('Mail template not found');
      return false;
    }

    // Send the email
    const info = await mailService.sendMail(email, renderedEmail, 'Password reset');

    console.log(`Password reset email sent to: ${email}`);

    return { info };
  }

  /**
   * Send an email notification to the site owner when the site is down.
   *
   * @param {string} email - The email address of the site owner.
   * @param {string} siteTitle - The title of the site that is down.
   * @param {string} siteLink - The link to the site that is down.
   * @param {string} firstName - The first name of the site owner.
   */
  async sendSiteDownNotificationMail(
    email: string,
    siteTitle: string,
    siteLink: string,
    firstName: string,
  ) {
    // Load the email template
    const templatePath = 'src/templates/site_down.html';

    // Replace placeholders with actual data
    const data = {
      siteTitle: siteTitle,
      siteLink: siteLink,
      firstName: firstName,
    };

    // Compile the template
    const compiledTemplate = await renderMailTemplate(templatePath, data);

    if (!compiledTemplate) return false;

    // Send the email
    const info = await mailService.sendMail(
      email,
      compiledTemplate,
      `${APP_NAME} Site Down Notification`,
    );

    logger.info(
      `Site: ${siteTitle} (${siteLink}) is down. Site down notification email sent to: ${email}`,
    );

    return { info };
  }
}

export const mailController = new Controller();
