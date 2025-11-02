import { isValidChannel } from "../types.js";
export default function validateChannels(notificationChannels) {
    const validChannels = []; // Store valid channels
    const invalidChannels = [];
    for (const channel of notificationChannels) {
        if (isValidChannel(channel)) {
            validChannels.push(channel);
        }
        else {
            invalidChannels.push(channel);
        }
    }
    return {
        validChannels,
        invalidChannels
    };
}
//# sourceMappingURL=validateChannels.js.map