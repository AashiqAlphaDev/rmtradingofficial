let mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectId;
const co = require("co");
const elastic_search = require("./elastic_search")



const categorySchema = new Schema({
	index:Number,
    title: String,
    description: String,
    data:{}
});
mongoose.model('Category', categorySchema);

const topicSchema = new Schema({
    index:Number,
	title: String,
	description: String,
    category:ObjectID,
	data:{}
});
mongoose.model('Topic', topicSchema);

const collectionSchema = new Schema({
    index:Number,
    title: String,
    description: String,
    topics:[ObjectID],
    links:[ObjectID],
    data:{}
});
mongoose.model('LinkCollection', collectionSchema);

const linkSchema = new Schema({
    url: String,
	title: String,
    description: String,
	topics:[ObjectID],
    collectionIndex:Number,
    data:{}
});
mongoose.model('Link', linkSchema);


const categories = require("./categories");
const topics = require("./topics");
const collections = require("./collections");
const links = require("./links");


const Category = mongoose.model('Category');
const Topic = mongoose.model('Topic');
const LinkCollection = mongoose.model('LinkCollection');
const Link = mongoose.model('Link');


const createCategory = function*(data){
    return yield Category.create(data);
}

const categoryIdByIndex = function*(index) {
    return (yield Category.findOne({index}))._id
}

const topicByIndex = function*(index) {
    return yield Topic.find({index})
}

const linkCollectionByIndex = function*(index) {
    return yield LinkCollection.findOne({index})
}


const topicIdsByIndexs = function*(indexs) {
    let ids = []
    let topics = (yield Category.find({index:{$in:indexs}}));
    for(let topic of topics){
        ids.push(topic._id)
    }
    return ids;
}

const createTopic = function*(data){
    return yield Topic.create(data);
}

const createLinkCollection = function*(data){
    return yield LinkCollection.create(data);
}

const updateLinkCollection = function*(){
    let collections = yield LinkCollection.find();
    for(let collection of collections){
        let links = yield Link.find({collectionIndex: collection.index});
        let linkIds = []
        for(let link of links){
            linkIds.push(link._id);
        }
        yield LinkCollection.updateOne({index:collection.index}, {links:linkIds});
    }
}

const createLink = function*(data){
    return yield Link.create(data);
}

mongoose.connect("mongodb://db/loop", function(){
	// console.log("connected");

	// for(let category of categories){
	//     co.wrap(function*() {
    //         yield createCategory(category);
    //     })()
    // }

    // for(let topic of topics){
    //     co.wrap(function*() {
    //         let categoryId = yield categoryIdByIndex(topic.category)
    //         yield createTopic({...topic, category: categoryId})
    //     })()
    // }

    // for (let collection of collections) {
    //     co.wrap(function*() {
    //         let ids = yield topicIdsByIndexs(collection.topics);
    //         yield createLinkCollection({...collection, topics:ids})
    //     })()
    // }

    // for (let link of links) {
    //     co.wrap(function*() {
    //         let collection = yield linkCollectionByIndex(link.collection);
    //         yield createLink({...link, topics:collection.topics, collectionIndex:link.collection})
    //     })()
    // }

    // co.wrap(function*() {
    //     yield updateLinkCollection();
    // })()

    setTimeout(function () {
        co.wrap(function*() {
            let categories = yield Category.find();
            for(let category of categories){
                yield elastic_search.addRecord("category", category);
            }
        })();

        co.wrap(function*() {
            let topics = yield Topic.find();
            for(let topic of topics){
                yield elastic_search.addRecord("topic", topic);
            }
        })();


        co.wrap(function*() {
            let links = yield Link.find();
            for(let link of links){
                yield elastic_search.addRecord("link", link);
            }
        })();

        co.wrap(function*() {
            let collections = yield LinkCollection.find();
            for(let collection of collections){
                yield elastic_search.addRecord("collection", collection);
            }
        })();
    }, 5000)



});