
let Disclaimer = "Description of the above is subject to change on karthik's judgement"

let contentsOfCategory = "1.Should have title , image, topics"

let useCasesOfCategory = "1.List of categories - /category" +      
    "2.Should fetch topics of a category /:categoryId/Topics" +
    "3.Should fetch topics of a categories /[:categoryId]/Topics" +  "Dont know if this will be possible" +
    "4.Super Admin - Add a new category /category" +
    "5.Super Admin - Edit a Category /category/:categoryId" +
    "6.Super Admin - Delete a Category - /category/:categoryId" +

let categories = {
    title:"",
    image:"",
    topics:[ObjectId]
}


let contentsOfTopics = "1.Should have title , image, description, category it belongs to , " +
    "if the topics is a user topic or a moderator's topic,list of collections and links belonging to topic" +
    "when was the topic created"


let useCasesOfTopics = "1.List of topics (user & moderator)- /topics" +q
    "2.Fetch a category of a Topic  - /:topicId/category" +
    "3.Super Admin - Add a new topic - /topics" +
    "4.Super Admin - Edit a Topic /topics/:topicId" +
    "5.Super Admin - Delete a Topic - /topics/:topicId" +
    "6.Fetch Newest topics Based on Date -/topics/:date" +
    "6.Fetch Featured topics /topics/featured " +
    "6.Make a  Topic As Featured /topics/featured " +
    "7.Fetch topics with highest no of subscriptions As trending -/topics/trending" +
    "8.Fetch User Topics -/topics/user" +
    "9.Fetch Moderator Topics -/topics/moderator" +
    "10.Fetch Collection & link information of a given topic  {data can be only title description and image,if collection(noOfLinks),if link (url)} /topics/collections   && /topics/link || /topics/all"


let topics = {
    title: "",
    description: "",
    category:"ObjectID",
    is_user_topic:"",
    created_at:"",
    noOfSubscriptions:"",
    is_featured:""
}


let contentsOfCollections = "1.Should have title , image, description, topic it belongs to(mandatory)  " +
    "It should have list of Links Pertaining to that collection"



let useCasesOfCollections = "1.List of Collections ordered by date- /collections" +
    "2.Fetch topics of a collection - /:collectionId/topics" +
    "3.Super Admin - Add a new collection - /collections" +
    "4.Super Admin - Edit a collection /collections/:collectionId" +
    "5.Super Admin - Delete a collection - /collections/:collectionId" +
    "6.Fetch Collections created by a given user /collections/:userid " +
    "7.Fetch Collections Created on a Certain date /collections/:date",
    "8.Fetch Link Information in A Collection (information of link should have name , url , description, image) "





let notesForCollections = "1.Created Collection without a image and Without link will have default image..(frontend), Created Collections without a image and has one link should update the collection image as the link image itself"



let collections = {
    title:"",
    description:"",
    created_at:"",
    created_by:"Dont need object id just a name/username/email would be fine",
    topics:[ObjectId](Mandatory),
    links:[]
}



let contentsOfLinks = "Type of link, name, url description, added on , is_public,image"



let useCasesOfLinks = "1.List of Links ordered by date - /links" +
    "2.Super Admin - Add a new link - /links" +
    "3.Super Admin - Edit a link /links/:linkId" +
    "4.Super Admin - Delete a link - /links/:linkId" +
    "5.Fetch Links created by a given user /links/:userid" +
    "6.Fetch Links created on a Certain date /links/:date" +




let links = {
    url:String,
    added_on:"",
    user:ObjectID,
    is_public:String,
    title:String,
    description:String,
    image:String,
    type:""
}


