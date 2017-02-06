import {browserHistory} from "react-router";


/**

My books actions

**/
export function addBooks(book){
  console.log("book added");
  return (dispatch,getState)=>{
    return fetch("/api/addbook",{
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			method: 'POST',
  			body: JSON.stringify({
  				"addbook": book,
  				"user": getState().user.username
  		})
    }).then(response=>response.json()).then(json=>{
      console.log(json);
      dispatch({
        type:"addbook",
        book:json
      })
    })
  }
}

export function getAllMyBooks(){
  return (dispatch,getState)=>{
    return fetch("/api/getbooksofuser", {
      headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			method: 'POST',
  			body: JSON.stringify({
  				"user": getState().user.username
  		})
    }).then(response=>response.json()).then(json=>{
      console.log(json);
      dispatch({
        type:"booksOfUser",
        books: json.books
      })
    })
  }
}

/**

My books actions

**/


/**

Boooks actions

**/

export function requestBook(requestor, book){

  return (dispatch)=>{

    fetch("/api/requestbook", {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "requestor": requestor,
        "book": book 
      })

    }).then(response=>response.json())
    .then(json=>{
      if(json.ok){
        dispatch({

          type: "requestedBook",
          request:{
            time: Date.now(),
            requestor:requestor,
            requested: book.owner,
            granted: false,
            book:book
          }

        });

      }
    });
  }
}

export function getAlRequests(username) {
  return (dispatch)=>{
    fetch("/api/getrequests",{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "username": username
      })
    }).then(response=>response.json()).then(json=>{
      dispatch({
        type: "SET_REQUESTS_DATA",
        data: json
      })
    })
  }
}


/**

Boooks actions

**/

/**

Login actions

**/


function setUserInLocalStorage(user){
  
  if(!user){
    return;  
  }

  localStorage.setItem("bcuser", JSON.stringify(user));
  
}

function removeUserFromLocalStorage(){
  
  localStorage.removeItem("user");

}

function checkForUserInLocalStorage(){

  const user = localStorage.getItem("bcuser")

  if(user){

    return JSON.parse(user);

  } else{

    return null;

  }

}

export function loginAction(login){
  return (dispatch)=>{
    return fetch("/api/login",{
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			method: 'POST',
  			body: JSON.stringify({
  				"username": login.username,
  				"password": login.password
  		})
    }).then(response=>response.json())
    .then(json=>{
      console.log(json);
      if(json.success==false){
        dispatch({
          type:"authentication",
          wrongAuthentication: true,
          user:null
        });
        
      } else{
        dispatch({
          type:"authentication",
          wrongAuthentication: false,
          user:json.user
        });

        setUserInLocalStorage(json.user);

        browserHistory.push("/mybooks");
      }
    })
  }
}

export function signupAction(signup){
    fetch("/signup",{
      headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  			method: 'POST',
  			body: JSON.stringify({
  				"username": signup.username,
  				"password": signup.password
  		})
    }).then(response=>response.json()).then(json=>{
      browserHistory.push("/login");
    })
  
}

export function fetchData(bookName){
  fetch("http://isbndb.com/api/v2/json/N8CBZEYQ/books?q="+bookName)
    .then(response=>response.json())
    .then(json=>{
      console.log(json);
    })
}

export function logoutAction(){
  
  removeUserFromLocalStorage();

  return {
    type:"logout"
  }

}

export function checkUserLogin() {

  return (dispatch)=>{
    const user = checkForUserInLocalStorage();

    if(user){

      dispatch({
        type:"authentication",
        wrongAuthentication: false,
        user: user
      });

    }
    else{
      dispatch({type: "logout"});
    }
  }

}
/**

Login actions

**/

export function deleteBook(ID){
  return (dispatch)=>{
    fetch("/api/removebook" ,{
      headers:{
        'Accept': 'application/json',
  			'Content-Type': 'application/json'
      },
      method:"POST",
      body:JSON.stringify({
        id: ID
      })
    }).then(response=>response.json())
    .then(json=>{
      if(json.success){
        dispatch({
          type:"removeBook",
          id: ID
        })
      }
    })
  }
}

export function getAllBooks(){
  return (dispatch)=>{
    return fetch("/api/getallbooks").then(response=>response.json()).then(json=>{
      dispatch({
        type:"setAllBooks",
        books:json
      })
    })
  }
}



/**

Setting actions

**/

export function updateInfoAction(state){
  

  return (dispatch, getState)=>{
    return fetch("/api/updateinfo", {
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      body:JSON.stringify({
        username: getState().user.username,
        data: state
      })
    }).then(response=>response.json()).then(json=>{
      console.log(json);

      if(json.ok == 1){
        dispatch({
          type:"updateinfo",
          data: state
        });
      }
    });
    
  }
  /**return fetch("/api/update/info",{
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: 
  })**/
}


/**

Setting actions

**/