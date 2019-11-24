var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'elastic_search:9200',
    log: 'trace'
});

client.indices.create({
    index: 'looped'
}, function(err, resp) {
    if (err) {
        console.log(err);
    } else {
        console.log("create", resp);
    }
});

module.exports.addRecord = function*(type,record){
    return new Promise((resolve, reject) => {
        client.index({
            index: 'looped',
            id: record._id.toString(),
            type: type,
            body: JSON.parse(JSON.stringify(record).replace("_id", "id"))
        }, function(err, resp, status) {
            if(!err){
                resolve(resp)
            }
            else{
                reject(err)
            }
        });
    });
}

module.exports.deleteRecord = function*(type, id){
    return yield client.delete({index:"looped", id, type})
}

module.exports.search = function*(type, query, page={size:3, offset:10}){
    if(Object.keys(query).length != 0){
        query = {match: query}
    }
    return yield client.search({index:"looped", type:type, body:{query:query}, size:page.size, from:page.offset});
}
