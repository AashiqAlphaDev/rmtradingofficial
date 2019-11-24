const mongoose = require("mongoose");
const User = mongoose.model('User');

module.exports.followUser = function*(userId,userData){
    return yield User.update({_id:userID},)
}
module.exports.unfollowUser = function*(userId,userData){
    return yield User.update({_id:userID})
}

