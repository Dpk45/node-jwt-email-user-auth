let user=function(){
    console.log("i am a simpe user");
}

let admin=function(){
    console.log("i m admin");
}

function getUser(callback){
    console.log("hey welcome to my world");
    callback();
}


getUser(user);
getUser(admin);
