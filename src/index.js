/**
 * This plugin provides support for fetching GUS data.
 * @param config
 * @param db
 * @param router
 * @param cache
 * @param apiStatus
 * @param apiError
 * @param getRestApiClient
 * @returns {{router: Router, route: string, pluginName: string, domainName: string}}
 */
module.exports = ({ config, db, router, cache, apiStatus, apiError, getRestApiClient }) => {
    const createMage2RestClient = () => {
        const client = getRestApiClient();
        client.addMethods('gus', (restClient) => {
            const module = {};
            module.get = (taxVat) => {
                return restClient.get(`/kmk-gus/getgusdata/${taxVat}`);
            };

            return module;
        });

        return client;
    };

    router.get('/:taxvat', async (req, res) => {
        const { taxvat } = req.params;
        try {
            if (!taxvat) { throw new Error('Tax vat number is required'); }
            const client = createMage2RestClient();
            const response = await client.gus.get(taxvat);
            apiStatus(res, response, 200);
        } catch (e) {
            apiError(res, e);
        }
    });

    return {
        domainName: '@grupakmk',
        pluginName: 'gus-plugin',
        route: 'gus',
        router
    };
};
