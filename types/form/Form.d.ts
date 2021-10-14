export default Form;
declare class Form {
    static create(data?: {}): Form;
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     * @param {object} options
     */
    constructor(data?: object, options?: object);
    processing: boolean;
    successful: boolean;
    withData(data: any): Form;
    errors: Errors;
    withErrors(errors: any): Form;
    withOptions(options: any): Form;
    __options: {
        resetOnSuccess: boolean;
    };
    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
    onSuccess(data: object): void;
    /**
     * Handle a failed form submission.
     *
     * @param {object} data
     */
    onFail(error: any): void;
    __http: any;
    /**
     * Fetch all relevant data for the form.
     */
    data(): {};
    /**
     * Fetch specific data for the form.
     *
     * @param {array} fields
     * @return {object}
     */
    only(fields: any[]): object;
    /**
     * Reset the form fields.
     */
    reset(): void;
    setInitialValues(values: any): void;
    initial: {};
    populate(data: any): Form;
    /**
     * Clear the form fields.
     */
    clear(): void;
    /**
     * Send a POST request to the given URL.
     *
     * @param {string} url
     */
    post(url: string): Promise<any>;
    /**
     * Send a PUT request to the given URL.
     *
     * @param {string} url
     */
    put(url: string): Promise<any>;
    /**
     * Send a PATCH request to the given URL.
     *
     * @param {string} url
     */
    patch(url: string): Promise<any>;
    /**
     * Send a DELETE request to the given URL.
     *
     * @param {string} url
     */
    delete(url: string): Promise<any>;
    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
    submit(requestType: string, url: string): Promise<any>;
    /**
     * @returns {boolean}
     */
    hasFiles(): boolean;
    /**
     * @param {Object|Array} object
     * @returns {boolean}
     */
    hasFilesDeep(object: any | any[]): boolean;
    /**
     * Get the error message(s) for the given field.
     *
     * @param field
     */
    hasError(field: any): any;
    /**
     * Get the first error message for the given field.
     *
     * @param {string} field
     * @return {string}
     */
    getError(field: string): string;
    /**
     * Get the error messages for the given field.
     *
     * @param {string} field
     * @return {array}
     */
    getErrors(field: string): any[];
    __validateRequestType(requestType: any): void;
}
import Errors from "./Errors";
