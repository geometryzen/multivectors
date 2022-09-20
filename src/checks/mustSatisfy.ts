/**
 * @hidden
 */
export default function mustSatisfy(name: string, condition: boolean, messageBuilder: () => string, contextBuilder?: () => string): void {
    if (!condition) {
        doesNotSatisfy(name, messageBuilder, contextBuilder);
    }
}

/**
 * @hidden
 * @param name 
 * @param messageBuilder 
 * @param contextBuilder 
 */
export function doesNotSatisfy(name: string, messageBuilder: () => string, contextBuilder?: () => string): never {
    const message = messageBuilder ? messageBuilder() : "satisfy some condition";
    const context = contextBuilder ? " in " + contextBuilder() : "";
    throw new Error(name + " must " + message + context + ".");
}
