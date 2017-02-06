"use strict";

const Initial_State={
  "test":"test",
  "data":"",
  "mybooks":[],
  "books": [],
  "wrongAuthentication": false,
  "user": null,
  "myrequests":[],
  "otherrequests": []
};



const reducer = function(state=Initial_State, action){
  switch(action.type){
    case "authentication":
      return Object.assign({}, state, {
        wrongAuthentication:action.wrongAuthentication,
        user: action.user
      });
    case "logout":
      return Object.assign({}, state, {
        mybooks:[],
        user:null,
        wrongAuthentication:false
      })
      
    case "addbook":
      return Object.assign({}, state, {
        mybooks:[...state.mybooks, action.book]
      })
      
    case "booksOfUser":
      return Object.assign({}, state,{
        mybooks:action.books
      })
      
    case "removeBook":
      return Object.assign({}, state, {
        mybooks: state.mybooks.filter(book=>{
          if(book._id==action.id)
            return false;
          return true;
        })
      })
    case "setAllBooks":
      return Object.assign({}, state, {
        books: action.books
      })
      
    case "requestedBook":

      return Object.assign({}, state, {
        myrequests:[...state.myrequests, action.request]
      });

    case "SET_REQUESTS_DATA":
      
      return Object.assign({}, state, {
        myrequests: action.data.myrequests,
        otherrequests: action.data.otherrequests
      });

    case "updateinfo":
      var user = state.user;
      user = Object.assign({}, user, {
        city:action.data.city,
        name:action.data.name,
        state:action.data.state
      });

      return Object.assign({}, state, {
        user: user
      }); 
    default:
      return state;
  }
}

export default reducer;