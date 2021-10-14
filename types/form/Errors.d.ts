export default Errors;
declare class Errors {
    /**
     * Create a new Errors instance.
     */
    constructor(errors?: {});
    /**
     * Get all the errors.
     *
     * @return {object}
     */
    all(): object;
    /**
     * Determine if any errors exists for the given field or object.
     *
     * @param {string} field
     */
    has(field: string): any;
    first(field: any): any;
    get(field: any): any;
    /**
     * Determine if we have any errors.
     * Or return errors for the given keys.
     *
     * @param {array} keys
     */
    any(keys?: any[]): {};
    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
    record(errors?: object): void;
    errors: any;
    /**
     * Clear a specific field, object or all error fields.
     *
     * @param {string|null} field
     */
    clear(field: string | null): void;
}
