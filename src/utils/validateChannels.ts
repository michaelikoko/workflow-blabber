import { isValidChannel, type NotificationChannel, type ValidateChannelsFunctionOutput } from "../types";

export default function validateChannels(notificationChannels: Array<string>): ValidateChannelsFunctionOutput {
    const validChannels: Array<NotificationChannel> = []; // Store valid channels
    const invalidChannels: Array<string> = [];
    for (const channel of notificationChannels) {
        if (isValidChannel(channel)) {
            validChannels.push(channel);
        } else {
            invalidChannels.push(channel);
        }
    }
    return {
        validChannels,
        invalidChannels
    };
}