/**
 *
 * @public
 * @module util
 * @memberof core
 * @description Houses app-wide utility methods.
 *
 */



/**
 *
 * @public
 * @method extendObject
 * @memberof util
 * @description Merge or clone objects and arrays.
 * @param {object} target The target object/array
 * @param {object} arrow The incoming object/array
 * @returns {object}
 *
 */
const extendObject = function (target, arrow) {
    let i = null;
    const ret = target;

    // Merge Arrays
    if (Array.isArray(arrow)) {
        i = arrow.length;

        for (i; i--;) {
            ret[ i ] = arrow[ i ];
        }

        // Merge Objects
    } else {
        for (i in arrow) {
            if (arrow.hasOwnProperty(i)) {
                ret[ i ] = arrow[ i ];
            }
        }
    }

    return ret;
};



/******************************************************************************
 * Export
*******************************************************************************/
export default {
    extendObject
};