
var config={
    apiKey: "AIzaSyCNrDpWZm2GnMU5GUHjenJAnCQCw7SCVY4",
    authDomain: "fir-javascriptcrud-b3369.firebaseapp.com",
    projectId: "fir-javascriptcrud-b3369",
    databaseURL:"https://fir-javascriptcrud-b3369-default-rtdb.firebaseio.com",
    storageBucket: "fir-javascriptcrud-b3369.appspot.com",
    messagingSenderId: "543911749108",
    appId: "1:543911749108:web:d332d69dcc2139721505a1"
    };


firebase.initializeApp(config);


  var db=firebase.database();
  var reviews=document.getElementById("reviews");
  var reviewsRef=db.ref("/reviews");

  reviewForm.addEventListener("submit",e=>{
     e.preventDefault();

    var title= document.getElementById("title");
    var desc= document.getElementById("desc");
    var hiddenId= document.getElementById("hiddenId");
    var id=hiddenId.value || Date.now();

    db.ref("reviews/"+ id).set({
        title:title.value,
        desc:desc.value,
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    clearForm();
  })



  reviewsRef.on("child_added",data=>{
    var li = document.createElement("li");
    li.id = data.key;
    li.innerHTML = reviewTemplate(data.val());
    reviews.appendChild(li);
  });

  reviews.addEventListener("click",e=>{
updateReview(e);
deleteReview(e);
  });

  reviewsRef.on("child_changed",data =>{
    var reviewNode = document.getElementById(data.key);
    reviewNode.innerHTML = reviewTemplate(data.val());

  })


  reviewsRef.on("child_removed",data =>{
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);

  })
  function deleteReview(e){
    var reviewNode = e.target.parentNode;
 
     if(e.target.classList.contains("delete")){
     var id = reviewNode.id;
     db.ref("reviews/" + id).remove();
       clearForm();
     }}


  function updateReview(e){
   var reviewNode = e.target.parentNode;

    if(e.target.classList.contains("edit")){
      title.value = reviewNode.querySelector(".title").innerText;
      desc.value= reviewNode.querySelector(".desc").innerText;

      hiddenId.value = reviewNode.id;
      Materialize.updateTextFields();
      
    }
  }

  function clearForm(){
  title.value="";
  desc.value="";
  hiddenId.value="";
  }

function reviewTemplate({title,desc,createdAt}){
  var createdAtFormatted = new Date(createdAt);

  return`
<div >
  <label class="#757575 grey-text text-darken-1" id="csshook" >Title:</label>
  <label class="title teal-text text-lighten-1"  id="csshook"><strong>${title}</strong></label>
  </div>
  <div>
  <label class="#757575 grey-text text-darken-1" id="csshook">Description:</label>
  <label class="desc teal-text text-lighten-1" id="csshook">${desc}</label>
  <br/>
  </div>
  <div>
  <label class="#757575 grey-text text-darken-1" id="csshook">Created At:</label>
  <label class="createdAt teal-text text-lighten-1" id="csshook">${createdAtFormatted}</label>
  </div>
  <br/>
  <button class="waves-effect waves-light  btn delete" >Delete</button>
  <button class="waves-effect waves-light btn  edit">Update</button>
<br/>
  <br/>
  <br/>
</div>
 ` ;
}












