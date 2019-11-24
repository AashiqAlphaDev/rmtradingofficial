const mongoose = require("mongoose");
const Collection = mongoose.model('Collection');
const Link = mongoose.model('Link');
const elastic_search = require("./elastic_search");
const Bookmark = mongoose.model('Bookmark');
const _ = require("underscore")

module.exports.addBookmarkLink = function* (bookmarkData,userId) {
    let existingBookmark = yield Bookmark.findOne({user:userId})
    if(existingBookmark){
        if(existingBookmark.links.indexOf(bookmarkData)==-1){
            yield Bookmark.update({user:userId},{ $push: { links: bookmarkData}});
        }
        else{
            yield Bookmark.update({user:userId},{ $pull: { links: bookmarkData}});
        }
    }
    else{
        let array = []
        array.push(bookmarkData)
        yield Bookmark.create({user:userId,links:array})
    }
    let updatedBookmark = yield Bookmark.findOne({user:userId})
    return updatedBookmark;
};

module.exports.addBookmarkCollection = function* (bookmarkData,userId) {
    let existingBookmark = yield Bookmark.findOne({user:userId})
    if(existingBookmark){
        if(existingBookmark.collections.indexOf(bookmarkData)==-1){
            yield Bookmark.update({user:userId},{ $push: { collections: bookmarkData}});
        }
        else{
            yield Bookmark.update({user:userId},{ $pull: { collections: bookmarkData}});
        }
    }
    else{
        let array = []
        array.push(bookmarkData)
        yield Bookmark.create({user:userId,collections:array})
    }
    let updatedBookmark = yield Bookmark.findOne({user:userId})
    return updatedBookmark;
};


module.exports.userBookMarks = function* (userId) {

    console.log(userId);
    return yield Bookmark.findOne({user:userId}).populate(["links","collections"]);
};


module.exports.bookMarks = function* () {
    return yield Bookmark.find({})
};

module.exports.deleteAll = function*(){
    return yield Bookmark.remove({});
}

















