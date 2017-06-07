/**
 *
 * @public
 * @module util
 * @memberof sqs
 * @description Houses app-wide Squarespace-specific utility methods.
 *
 */



/**
 *
 * @public
 * @method sqsLifecycle
 * @memberof util
 * @description Handles initialization and destruction of Squarespace blocks.
 *
 */
const sqsLifecycle = {
    /**
     *
     * @public
     * @method init
     * @memberof sqsLifecycle
     * @description Squarespace.afterBodyLoad() trigger loads scripts
     *              and calls onInitialize, which individual modules'
     *              init functions are bound to.
     *
     */
    init () {
        window.Squarespace.AFTER_BODY_LOADED = false;
        window.Squarespace.afterBodyLoad();
    },


    /**
     *
     * @public
     * @method destroy
     * @memberof sqsLifecycle
     * @description Calls onDestroy for each Squarespace destructor.
     *
     */
    destroy () {
        window.Squarespace.globalDestroy( Y );
    }
};



/******************************************************************************
 * Export
*******************************************************************************/
export default {
    sqsLifecycle
};