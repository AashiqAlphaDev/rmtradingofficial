var path = require('path');


module.exports = {
    webpack: function (config) {
        config.resolve.alias = {
            '@components': path.resolve('./components'),
            '@config': path.resolve('./config'),
        };
        return config
    },
    exportPathMap:async function (defaultPathMap){
        return {
            '/':{page:'/Rmtrading/home'},
            '/content-page/:link_id/link': {page: '/content-page'},
            '/content-page/:collection_id/collections' :{page:'/collections'},
            '/content-page/:collection_id/collection' :{page:'/content-page'}
        }
    }
}
