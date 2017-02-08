require("babel-register");
if(process.env.NODE_ENV === "production"){
	require("./server/server.prod.js");
} else{
	require("./server/server.dev.js");
}
