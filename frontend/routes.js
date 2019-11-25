const routes = module.exports = require('next-routes')()
routes.add('/','/Rmtrading/home');
routes.add('/content-page/:link_id/link','/content-page');
routes.add('/content-page/:collection_id/collection','/content-page');
routes.add('/content-page/:collection_id/collections','/collections');

















