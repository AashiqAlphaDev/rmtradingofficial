const mongoose = require("mongoose");
const Category = mongoose.model('Category');
const Relation = mongoose.model('Relation');

const elastic_search = require("./elastic_search");

module.exports.createCategory = function* (categoryData) {
    let newCategory = yield Category.create(categoryData);
    yield elastic_search.addRecord("category", newCategory)
    return newCategory;
};

module.exports.updateCategory = function* (categoryId, categoryData) {
    console.log("id",categoryId)
    console.log("data",categoryData)
	yield Category.update({_id: categoryId}, categoryData);
    let updatedCategory = Category.findOne({_id:categoryId});
	yield elastic_search.addRecord("category",updatedCategory)
    return updatedCategory;
};

module.exports.categoryWithId = function* (categoryId) {
    return yield Category.findOne({_id: categoryId});
};

module.exports.deleteCategory = function* (categoryId) {
    console.log("inside delete",categoryId)
    let result = yield Category.remove({_id: categoryId});
    yield elastic_search.deleteRecord("category", categoryId)
    return result;
};

module.exports.addTopic = function*(categoryId, topicId) {
    yield Relation.create({source:categoryId, destination:topicId, source_type:"category", destination_type:"topic", relation:"contains"})
}

module.exports.deleteTopic = function*(categoryId, topicId){
    yield Relation.remove({source:categoryId, destination:topicId, source_type:"category", destination_type:"topic", relation:"contains"})
}

module.exports.getTopics = function*(categoryId){
    let relations = yield Relation.find({source:categoryId, source_type:"category", relation:"contains"});
    return yield elastic_search.search("type", {ids:{type:"topic", values:_.map(relations, function (item) {
        return item.topicId;
    })}});
}


module.exports.getCategories = function*(page){
    return yield Category.paginate({}, page);
}





module.exports.deleteAll = function*(){
    return yield Category.remove({});
}

