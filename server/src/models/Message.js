import {Schema, model} from "mongoose";
import {v4 as uuid} from "uuid";

const messageSchema = new Schema({
    messageId: {
        type: String,
        default: uuid,
    },
    senderId: {
        type: String,
        required: [true, "SenderId is required"],
    },
    senderUsername: {
        type: String,
        required: [true, "SenderUsername is required"],
        minLength: [1, "Sender Username should be at least 1 character long"],
    },
    receiverId: {
        type: String,
        required: [true, "ReceiverId is required"],
    },
    receiverUsername: {
        type: String,
        required: [true, "ReceiverUsername is required"],
        minLength: [1, "Receiver Username should be at least 1 character long"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        minLength: [1, "Message should be at least 1 character long"],
    },
}, {timestamps: true});

export default model("Message", messageSchema);