import "./idb.js"
const dbPromised = idb.open("team-profile", 1, function(upgradeDb) {
    const articlesObjectStore = upgradeDb.createObjectStore("profiles", {keyPath: "id"});
    articlesObjectStore.createIndex("profile", "profile", { unique: false });
});
function saveForLater(teamProfile) {
	return new Promise (function(resolve, reject){
  	dbPromised
		.then(db => {
			const tx = db.transaction("profiles", "readwrite");
			const store = tx.objectStore("profiles");
			store.put(teamProfile);
			return tx;
		})
		.then(tx =>{
			if(tx.complete)
				resolve(true)
			else{
				reject(new Error(tx.onerror))
			}
		})
	})
	
}
function getAll() {
	return new Promise(function(resolve, reject) {
	  dbPromised
		.then(db => {
			const tx = db.transaction("profiles", "readonly");
			const store = tx.objectStore("profiles");
			return store.getAll();
		})
		.then(profiles => {
			if (profiles !== undefined)
				resolve(profiles);
			else
				reject(new Error(tx.onerror))
		});
	});
}
function getById(id) {
	return new Promise(function(resolve, reject) {
	  dbPromised
		.then(db => {
			const tx = db.transaction("profiles", "readonly");
			const store = tx.objectStore("profiles");
			return store.get(parseInt(id));
		})
		.then(profiles => {
			if (profiles !== undefined)
				resolve(profiles);
			else
				reject(false)
	  	});
	});
}
function deleteProfile(id){
	return new Promise (function(resolve, reject){
		dbPromised
		.then(db => {
			const tx = db.transaction('profiles', 'readwrite');
			const store = tx.objectStore('profiles');
			store.delete(id);
			return tx;
		})
		.then(function(tx){
			if(tx.complete){
				resolve(true)
			}
			else{
				reject(new Error(tx.onerror))
			}
		})
	})
}
export {saveForLater, getAll, getById, deleteProfile};