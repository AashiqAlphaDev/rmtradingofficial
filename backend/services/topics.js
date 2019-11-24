const mongoose = require("mongoose");
const Topic = mongoose.model('Topic');
const Category = mongoose.model('Category');
const elastic_search = require("./elastic_search");



module.exports.createTopic = function* (topicData) {
    let fetchCategory = yield Category.findOne({_id:topicData.category})
    let categoryId = topicData.category
    topicData.category =fetchCategory.title;
    console.log("inside topic data",topicData);
    let new_topic = yield Topic.create(topicData);
    yield Category.update({_id: categoryId},{ $push: { topics: new_topic._id}});
    return new_topic;
    // It adds a topic Fetches the category and then Adds the title As a string to the Topic . and adds the topic under a category

};

module.exports.updateTopic = function* (topicId, topicData) {
	yield Topic.update({_id: topicId}, topicData);
    let updatedTopic = yield Topic.findOne({_id:topicId});
    yield elastic_search.addRecord("topic", updatedTopic)
    return updatedTopic;
};

module.exports.topicWithId = function* (topicId) {
    return yield Topic.findOne({_id: topicId});
};

module.exports.topics = function*(page){

    return yield Topic.paginate({}, page);
    // return yield elastic_search.search("topic", query, page);
}



module.exports.fetchTopic = function*(topicId){
    let topic = yield Topic.findOne({_id:topicId}).populate(['links','collections']);
    return topic;

}



module.exports.deleteAll = function*(){
    return yield Topic.remove({});
}

module.exports.deleteTopic = function* (topicId) {
    let fetchTopic = yield Topic.findOne({_id:topicId});
    let fetchCategory = yield Category.findOne({title:fetchTopic.category})
    yield Category.update({_id: fetchCategory._id},{ $pull: { topics: topicId}});
    let response = yield Topic.remove({_id: topicId});
    yield elastic_search.deleteRecord("topic", topicId);
    return response;
};


module.exports.trendingTopics = function*(topicId){
    let topic = yield Topic.findOne({_id:topicId}).populate(['links','collections']);
    return topic;

}

module.exports.latestTopics = function*(topicId){
    let topic = yield Topic.findOne({_id:topicId}).populate(['links','collections']);
    return topic;

}


