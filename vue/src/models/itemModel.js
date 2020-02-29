let sampleData = [];

var auth, database, userInfo,
isLoaded = false;

// Initialize Firebase
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyDB7DfkT8x14TsOGQoIeTsQcz6DgOqNMD0",
    authDomain: "diary-a6651.firebaseapp.com",
    databaseURL: "https://diary-a6651.firebaseio.com",
    projectId: "diary-a6651",
    storageBucket: "diary-a6651.appspot.com",
    messagingSenderId: "808268749029"
};
firebase.initializeApp(config);
auth = firebase.auth();
database = firebase.database();
var authProvider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(function(user) {
    //아이폰에서 user를 못받는 상황
    if ( user ) {
        //인증 성공
        console.log("success");
        userInfo = user;
        getList();
    } else {
        //인증 실패
        auth.signInWithPopup(authProvider);
    }
});

function getList() {
    var diaryRef = database.ref('MyDiary/' + userInfo.uid);
    diaryRef.once('value', on_database_loaded)
    diaryRef.on('child_added', on_child_added);
    diaryRef.on('child_removed', on_child_removed);
};

function on_database_loaded(data) {
    isLoaded = true;
}

function on_child_added(data) {
    var temp = {},
    dVal = data.val();
    temp = {
        time : {
            date : dVal.time.date,
            week : dVal.time.week,
            createTime : dVal.time.createTime
        },
        text : dVal.text,
        key : data.key
    };
    sampleData.unshift(temp);
}

function on_child_removed(data) {
    sampleData = sampleData.filter(item => item.key !== data.key);
};

export default {
    list() {
        return new Promise(res => {
            res(sampleData);
        });
    },
    saveData(thisData) {
        var diaryRef = database.ref('MyDiary/' + userInfo.uid);
        diaryRef.push(thisData);
    },
    updateData(thisKey, thisData) {
        var diaryRef = database.ref('MyDiary/' + userInfo.uid + '/' + thisKey);
        diaryRef.update(thisData);
    },
    deleteData(thisKey) {
        var diaryRef = database.ref('MyDiary/' + userInfo.uid + '/' + thisKey);
        diaryRef.remove();
    },
    loadComplete() {
        if (isLoaded) {
            return true;
        } else {
            return false;
        }
    }
}