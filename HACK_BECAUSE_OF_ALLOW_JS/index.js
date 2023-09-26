import { $query, $update, StableBTreeMap, match, Result, ic, Opt } from 'azle';
import { v4 as uuidv4 } from 'uuid';
const messageStorage = new StableBTreeMap(0, 44, 1024);
$query;
export function getMessages() {
    return Result.Ok(messageStorage.values());
}
$query;
export function getMessage(id) {
    return match(messageStorage.get(id), {
        Some: (message) => Result.Ok(message),
        None: () => Result.Err(`a message with id=${id} not found`)
    });
}
$update;
export function addMessage(payload) {
    const message = { id: uuidv4(), createdAt: ic.time(), updatedAt: Opt.None, ...payload };
    messageStorage.insert(message.id, message);
    return Result.Ok(message);
}
$update;
export function updateMessage(id, payload) {
    return match(messageStorage.get(id), {
        Some: (message) => {
            const updatedMessage = { ...message, ...payload, updatedAt: Opt.Some(ic.time()) };
            messageStorage.insert(message.id, updatedMessage);
            return Result.Ok(updatedMessage);
        },
        None: () => Result.Err(`couldn't update a message with id=${id}. message not found`)
    });
}
$update;
export function deleteMessage(id) {
    return match(messageStorage.remove(id), {
        Some: (deletedMessage) => Result.Ok(deletedMessage),
        None: () => Result.Err(`couldn't delete a message with id=${id}. message not found.`)
    });
}
// a workaround to make uuid package work with Azle
globalThis.crypto = {
    // @ts-ignore
    getRandomValues: () => {
        let array = new Uint8Array(32);
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
        return array;
    }
};
