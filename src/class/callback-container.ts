export default class CallbackContainer {
    protected callbacks: Function[] = [];

    addCallback(callback: Function): boolean {
        if (this.callbacks.includes(callback)) {
            return false;
        }

        this.callbacks.push(callback);

        return true;
    }

    removeCallback(callback: Function): boolean {
        let callbackIndex = this.callbacks.indexOf(callback);
        if (callbackIndex === -1) {
            return false;
        }

        this.callbacks.splice(callbackIndex, 1);

        return true;
    }

    callCallbacks(...args: any[]) {
        this.callbacks.forEach(callback => {
            callback.apply(this, args);
        });
    }
}
