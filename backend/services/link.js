const mongoose = require("mongoose");
const Link = mongoose.model('Link');
const Relation = mongoose.model('Relation');
const elastic_search = require('./elastic_search');
const Topics = mongoose.model('Topic');
const Collections = mongoose.model('Collection');

module.exports.createLink = function* (linkData) {

    if(linkData.url.startsWith("https://www.youtube.com/watch?v=")){
        linkData.url = linkData.url.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
    }
    let newLink = yield Link.create(linkData);AS
    if(linkData.topics.length !=0){
        for (var i = 0, len = linkData.topics.length; i < len; i++) {
            yield Topics.update({_id: linkData.topics[i]},{ $push: { links: newLink._id}});
            let fetchCategory = yield Topics.findOne({_id:linkData.topics[i]})
            yield elastic_search.addRecord("category", fetchCategory);
        }
    }

    if(linkData.collections.length !=0){
        for (var j = 0, lent = linkData.collections.length; j < lent; j++) {
            yield Collections.update({_id: linkData.collections[j]},{ $push: { links: newLink._id}});
            let fetchCollections = yield Collections.findOne({_id:linkData.collections[j]})
            yield elastic_search.addRecord("category", fetchCollections);
        }
    }
    yield elastic_search.addRecord("link", newLink)
    return newLink;
};

module.exports.updateLink = function* (linkId, linkData) {
	yield Link.update({_id: linkId}, linkData);
    let link = yield Link.findOne({_id:linkId});
    yield elastic_search.addRecord("link", link)
    return link;
};

module.exports.linkWithId = function* (linkId) {
	return yield Link.findOne({_id: linkId});
};

module.exports.deleteLink = function* (linkId) {
    let response = yield Link.remove({_id: linkId});
    yield elastic_search.deleteRecord("link", linkId)
    return response;
};
module.exports.addTopic = function*(linkId, topicId) {
    return yield Relation.create({source:linkId, destination:topicId, source_type:"collection", destination_type:"topic", relation:"belongs_to"})
}

module.exports.deleteAll = function*(){
    return yield Link.remove({});

}


module.exports.links = function*(page){

    return yield Link.paginate({}, page);
}

module.exports.getLink = function*(linkId){
    return yield Link.findOne({_id:linkId});

}

module.exports.linksOfUser = function*(userId){
    // return yield Collection.find({user: userId,is_user_collection:true});
    return yield Link.find({user: userId});
    // return yield elastic_search.search("topic", query, page);
}





