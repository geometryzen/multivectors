import mustBeString from '../checks/mustBeString';
import { LocalizableMessage } from './LocalizableMessage';

/**
 * @hidden
 * @param name 
 * @returns 
 */
export default function (name: string): LocalizableMessage {
    mustBeString('name', name);
    const message: LocalizableMessage = {
        get message(): string {
            return "Method `" + name + "` is not supported.";
        }
    };
    return message;
}
