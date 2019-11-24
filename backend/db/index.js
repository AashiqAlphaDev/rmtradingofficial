const mongoose = require('mongoose');
mongoose.connect('mongodb://db/loop');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectID = ObjectId = Schema.ObjectId;
const _ = require("underscore");
const moment = require("moment");

//User
const userSchema = new Schema({
    email: String,
    password: String,
    email_verified:  {type:Boolean,default:false},
    first_time_login:{type:Boolean,default:true},
    profile: {
        name: String,
        mobile_number: String,
    },
    location:{
        city:String,
        state:String,
        address: String,
        country:String
    },
    following:[ObjectID],
    followers:[ObjectID]
});
userSchema.plugin(mongoosePaginate);
userSchema.pre("save", async function (next) {
    next();
});
mongoose.model('User', userSchema);



const resetRequestSchema = new Schema({
    user:ObjectID,
    status:String
});
mongoose.model('ResetRequest', resetRequestSchema)

const categorySchema = new Schema({
    title: {type:String,default:"No title"},
    description: {type:String,default:"No description"},
    image:{type:String,default:"https://pluralsight.imgix.net/paths/python-7be70baaac.png"},
    topics:[{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    created_at:{type: String, default: moment().format("DD-MM-YYYY")},
    data:{}
});
categorySchema.plugin(mongoosePaginate);
categorySchema.pre("save", async function (next) {
    next();
});
mongoose.model('Category', categorySchema);

const topicSchema = new Schema({
	title: {type:String,default:"No title"},
    description: {type:String,default:"No description"},
    image:{type:String,default:"https://pluralsight.imgix.net/paths/python-7be70baaac.png"},
    is_user_topic:{type:Boolean,default:false},
    created_at:{type: String, default: moment().format("DD-MM-YYYY")},
    collections:[{ type: Schema.Types.ObjectId, ref: 'Collection' }],
    links:[{ type: Schema.Types.ObjectId, ref: 'Link' }],
    category:String,
    data:{}
});
topicSchema.plugin(mongoosePaginate);
topicSchema.pre("save", async function (next) {
	next();
});
mongoose.model('Topic', topicSchema);


const collectionSchema = new Schema({
    title: {type:String,default:"No title"},
    description: {type:String,default:"No description"},
    image:{type:String,default:"https://pluralsight.imgix.net/paths/python-7be70baaac.png"},
    user:ObjectID,
    is_user_collection:{type:Boolean,default:true},
    topics:[{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    links:[{ type: Schema.Types.ObjectId, ref: 'Link' }],
    created_at:{type: String, default: moment().format("DD-MM-YYYY")},
    data:{}
});
collectionSchema.plugin(mongoosePaginate);
collectionSchema.pre("save", async function (next) {
    next();
});
mongoose.model('Collection', collectionSchema);

const linkSchema = new Schema({
    url:String,
    user:ObjectID,
    is_public:{type:Boolean,default:true},
    title: {type:String,default:"No title"},
    description: {type:String,default:"No description"},
    image:{type:String,default:"https://pluralsight.imgix.net/paths/python-7be70baaac.png"},
    topics:[{ type: Schema.Types.ObjectId, ref: 'Topic' }],
    created_at:{type: String, default: moment().format("DD-MM-YYYY")},
    collections:[{ type: Schema.Types.ObjectId, ref: 'Collection' }],
});
linkSchema.plugin(mongoosePaginate);
mongoose.model('Link', linkSchema);

const relationSchema = new Schema({
    source:ObjectID,
    destination:ObjectID,
    source_type:String,
    destination_type:String,
    relation:String
});
linkSchema.plugin(mongoosePaginate);
mongoose.model('Relation', relationSchema);



const bookmarkSchema = new Schema({
    user:ObjectID,
    collections:[{ type: Schema.Types.ObjectId, ref: 'Collection' }],
    links:[{ type: Schema.Types.ObjectId, ref: 'Link' }]
});
mongoose.model('Bookmark',bookmarkSchema)

const noteSchema = new Schema({
    user:ObjectID,
    postEntity:ObjectID,
    notes:[String]
});
mongoose.model('Notes',noteSchema)


const discussionSchema = new Schema({
    user:ObjectID,
    postEntity:ObjectID,
    note:String,
    created_at:{type: String, default: moment().format("DD-MM-YYYY")}
});
mongoose.model('Discussion',discussionSchema)


