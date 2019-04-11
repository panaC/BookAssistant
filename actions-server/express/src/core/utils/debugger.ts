export class Debugger implements Console {
    public Console: any;
    protected console: Console;
    protected isEnabled: boolean;
    protected prefix: string = '';

    public constructor(console: Console, isEnabled: boolean = true, prefix: string = '') {
        this.console = console;
        this.isEnabled = isEnabled;
        this.prefix = prefix;
    }

    public doIfEnabled(action: () => void): any {
        if (this.isEnabled) {
            return action();
        }
    }

    public addPrefix(message: any): any {
        if (this.prefix && (typeof message === 'string' || !message)) {
            return `${new Date(Date.now()).toLocaleString()} ${this.prefix} ${message}`;
        }
        return message;
    }

    public get memory(): any {
        // tslint:disable-next-line
        return this.doIfEnabled(() => console.hasOwnProperty('memory') && (console as any).memory);
    }

    public assert(value: any, message?: string, ...optionalParams: any[]): void;
    public assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    public assert(value?: any, message?: string, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.assert(value, message, ...optionalParams));
    }

    public countReset(label?: string): void {
        return this.doIfEnabled(() => this.console.countReset(label));
    }

    public dir(obj: any, options?: { showHidden?: boolean; depth?: number; colors?: boolean }): void;
    public dir(value?: any, ...optionalParams: any[]): void;
    public dir(obj?: any, ...options: any): void {
        return this.doIfEnabled(() => this.console.dir(obj, ...options));
    }

    public error(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.error(this.addPrefix(message), ...optionalParams));
    }

    public info(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.info(this.addPrefix(message), ...optionalParams));
    }

    public log(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.log(this.addPrefix(message), ...optionalParams));
    }

    public time(label: string): void;
    public time(timerName?: string): void;
    public time(label?: string): void {
        return this.doIfEnabled(() => this.console.time(label));
    }

    public timeEnd(label: string): void;
    public timeEnd(timerName?: string): void;
    public timeEnd(label?: string): void {
        return this.doIfEnabled(() => this.console.timeEnd(label));
    }

    public timeLog(label: string, ...data: any[]): void {
        return this.doIfEnabled(() => this.console.timeLog(label, data));
    }

    public timeStamp(label: string): void;
    public timeStamp(timerName?: string): void;
    public timeStamp(label?: string): void {
        return this.doIfEnabled(() => this.console.timeStamp(label));
    }

    public timeline(label: string): void;
    public timeline(timerName?: string): void;
    public timeline(label?: string): void {
        return this.doIfEnabled(() => this.console.timeline(label));
    }

    public timelineEnd(label: string): void;
    public timelineEnd(timerName?: string): void;
    public timelineEnd(label?: string): void {
        return this.doIfEnabled(() => this.console.timelineEnd(label));
    }

    public trace(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.trace(this.addPrefix(message), ...optionalParams));
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.warn(this.addPrefix(message), ...optionalParams));
    }

    public clear(): void {
        return this.doIfEnabled(() => this.console.clear());
    }

    public count(countTitle?: string): void {
        return this.doIfEnabled(() => this.console.count());
    }

    public debug(message?: any, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => this.console.debug(this.addPrefix(message), ...optionalParams));
    }

    public dirxml(value: any): void {
        return this.doIfEnabled(() => this.console.dirxml(value));
    }

    
    public exception(message?: string, ...optionalParams: any[]): void {
        return this.doIfEnabled(() => (this.console as any).exception(this.addPrefix(message), optionalParams));
    }


    public group(groupTitle?: string): void {
        return this.doIfEnabled(() => this.console.group(groupTitle));
    }

    
    public groupCollapsed(groupTitle?: string): void {
        return this.doIfEnabled(() => this.console.groupCollapsed());
    }
    

    public groupEnd(): void {
        return this.doIfEnabled(() => this.console.groupEnd());
    }

    public markTimeline(label?: string): void {
        return this.doIfEnabled(() => this.console.markTimeline(label));
    }

    public profile(reportName?: string): void {
        return this.doIfEnabled(() => this.console.profile(reportName));
    }

    public profileEnd(): void {
        return this.doIfEnabled(() => this.console.profileEnd());
    }

    
    public table(...data: any[]): void {
        return this.doIfEnabled(() => this.console.table(data));
    }
    

    /**
     * Throws usual error in debug mode and non-blocking otherwise
     * @param {Error} error
     */
    public throw(error: Error) {
        error.message = this.addPrefix(error.message);
        if (this.isEnabled) {
            throw error;
        }
    }
}
