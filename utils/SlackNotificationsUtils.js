import dotenv from 'dotenv';
const axios = require('axios');
class SlackNotificationUtils {

    static async sendSlackNotification(message) {
        dotenv.config();
        const slackWebhookUrl = process.env.webhook;
        try {
            await axios.post(slackWebhookUrl, {
            text: message,
              // The message you want to send
         });
        console.log('Slack message sent!');
        } catch (error) {
        console.error('Error sending Slack message:', error);
        }
    }
}

module.exports = {SlackNotificationUtils};
