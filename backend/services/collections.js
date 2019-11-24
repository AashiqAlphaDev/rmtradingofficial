const mongoose = require("mongoose");
const Collection = mongoose.model('Collection');
const Relation = mongoose.model('Relation');
const elastic_search = require("./elastic_search");
const Topics = mongoose.model('Topic');

const _ = require("underscore")

module.exports.createCollection = function* (collectionData) {
        console.log("in the backend collection data",collectionData);
    let createdCollection = yield Collection.create(collectionData);
    if(collectionData.topics.length !=0){
    for (var i = 0, len = collectionData.topics.length; i < len; i++) {
        yield Topics.update({_id: collectionData.topics[i]},{ $push: { collections: createdCollection._id}});
        // let fetchCategory = yield Topics.findOne({_id:collectionData.topics[i]})
        // yield elastic_search.addRecord("category", fetchCategory);
    }
    }
    // yield elastic_search.addRecord("collection", createdCollection);
    return createdCollection;
};

module.exports.updateCollection = function* (collectionId, collectionData) {
    console.log("this",collectionData)
    console.log("this",collectionId)
	yield Collection.update({_id: collectionId}, collectionData);
    let updatedCollection = Collection.findOne({_id:collectionId});
    //yield elastic_search.addRecord("collection", updatedCollection);
    return updatedCollection;
};

module.exports.collectionWithId = function* (collectionId) {
    return yield Collection.findOne({_id: collectionId});
};

module.exports.addLink = function*(collectionId, linkId) {
    return yield Relation.create({source:collectionId, destination:linkId, source_type:"collection", destination_type:"link", relation:"contains"})
}

module.exports.addTopic = function*(collectionId, topicId) {
    return yield Relation.create({source:collectionId, destination:topicId, source_type:"collection", destination_type:"topic", relation:"belongs_to"})
}

module.exports.deleteCollection = function* (collectionId) {
    let result = yield Collection.remove({_id: collectionId});
    yield elastic_search.deleteRecord("collection", collectionId);
    return result;
};

module.exports.collections = function*(page){

    return yield Collection.paginate({}, page);
    // return yield elastic_search.search("topic", query, page);
}

module.exports.collectionsOfUser = function*(userId){
    // return yield Collection.find({user: userId,is_user_collection:true});
    return yield Collection.find({user: userId});
    // return yield elastic_search.search("topic", query, page);
}

module.exports.collectionsOfAdmin = function*(){
    return yield Collection.find({is_user_collection:false});
    // return yield elastic_search.search("topic", query, page);
}

module.exports.deleteAll = function*(){
    return yield Collection.remove({});
}

module.exports.collectionDetail = function*(collectionId){
    return yield Collection.findOne({_id:collectionId}).populate('links')
}


