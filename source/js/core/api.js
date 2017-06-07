import util from "./util";


/**
 *
 * @public
 * @module core.api
 * @description Houses app-wide custom API methods.
 *
 */
const api = {
    /**
     *
     * @public
     * @method fetch
     * @memberof core.api
     * @description A Fetch API wrapper with parameter support.
     * @param {string} url The API URL
     * @param {object} params Merge params to send
     * @returns {Object} The fetched response.
     *
     */
    fetch ( url, params ) {

        const data = util.extendObject(
            {
                nocache: true
            },
            params
        );

        const urlParameters = Object.keys(data)
            .map( (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[ key ])}`)
            .join("&")
            .replace(/%20/g, "+");

        return fetch(`${url}?${urlParameters}`, {
            credentials: "same-origin"
        }).then( ( response ) => {
            console.log( `sync: Fetch to ${url} successful.` );
            return response;
        }).catch( ( error ) => {
            console.log( `sync: Fetch to ${url} failed. ${error}` );
        });
    }
};



/******************************************************************************
 * Export
*******************************************************************************/
export default api;