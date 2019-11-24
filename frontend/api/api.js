import base_url from "../store/base_url";
import fetch from 'isomorphic-fetch';


let isAdmin = function(sessionId){

	return new Promise(function (resolve, reject) {
		if(!sessionId){
			resolve(false);
			return false;
		}
		fetch(`${base_url}/admin`, {
			method:"GET",
			headers:{
				"X-Session-Id":sessionId
			}
		}).then(function (response) {
			resolve(response.ok);
		}).catch(function (err) {

		});
	});
}









let guardianDetails = function(sessionId, guardianId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/users/${guardianId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let visitsDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/visits`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let guardianSelfDetails = function(sessionId){
    return new Promise(function (resolve, reject) {
        console.log("inside self",sessionId);
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/users/self`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let petsOfGuardian = function(sessionId, guardianId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/of-owner/${guardianId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let petDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let petTypeDetails = function(sessionId, petTypeId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/app-data/pet-types/${petTypeId}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let vaccinationDetails = function(sessionId, petId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/vaccinations`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let visitDetails = function(sessionId, petId,visitId){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/pets/${petId}/visits/${visitId}`, {

            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let vaccinationCenterDetails = function(sessionId,vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        if(!sessionId){
            resolve(false);
            return false;
        }
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}`, {
            method:"GET",
            headers:{
                "X-Session-Id":sessionId
            }
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let vaccinationCenterDetail = function(vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let linksDetail = function(linkID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/links/${linkID}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let collectionsDetail = function(collectionID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/collections/${collectionID}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}



let vaccineDetail = function(vaccineId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccines/${vaccineId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}

let claimCenters = function(vaccineId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/claims`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}



let vaccinationCenterAdmins = function(vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}/admins`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });

}

let vaccinationCenters = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}







let vaccinesList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccines`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}

let petTypeList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/app-data/pet-types`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}


let breedList = function(petId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/app-data/pet-types/${petId}/breeds`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}








let linkList = function () {
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/links`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}


let categoriesList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/categories`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}

let categoriesInfoList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/categories?info=true`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}

let fetchCollectionAndLinksOfATopic = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/topics?info=true`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}



let initialFetchCollectionAndLinksOfATopic = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/topics/5bddac7434c1f20013fa0b9b`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
        });
    });
}





let topicsList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/topics`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
            console.log("inside")
            console.log(err)
        });
    });
}


let userList = function(){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/users`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
            console.log("inside")
            console.log(err)
        });
    });
}


let userCollectionList = function(userId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/collections/user/${userId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

            console.log("inside")
            console.log(err)
        });
    });
}

let collectionsList = function(userId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/collections`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}


let userLibraryList = function(userId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/bookmarks/${userId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

            console.log("inside")
            console.log(err)
        });
    });
}

let userLinkList = function(userId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/links/user/${userId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

            console.log("inside")
            console.log(err)
        });
    });
}


let userInfo = function(userId){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/api/users/${userId}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {
            console.log("inside")
            console.log(err)
        });
    });
}



let linkDetail = function(vaccinationCenterID){
    return new Promise(function (resolve, reject) {
        fetch(`${base_url}/vaccination-centers/${vaccinationCenterID}`, {
            method:"GET",
        }).then(function (response) {
            resolve(response.json());
        }).catch(function (err) {

        });
    });
}













export {categoriesList,linkList,topicsList,collectionsList,userCollectionList,categoriesInfoList,userList,fetchCollectionAndLinksOfATopic,initialFetchCollectionAndLinksOfATopic,linksDetail,collectionsDetail,userInfo,userLinkList,userLibraryList}