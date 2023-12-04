// this file powers the data collector for demographics, and send the data to the database


// store pd status
let pd_status = "";
// assign the user an id based on timestamp
let theid = 0;
const firebaseConfig = {
  apiKey: "AIzaSyAnlwmmb-Wc_xDpW1Vli0cEMm7hbPk_tR8",
  authDomain: "pd-website-test.firebaseapp.com",
  projectId: "pd-website-test",
  storageBucket: "pd-website-test.appspot.com",
  messagingSenderId: "497582545475",
  appId: "1:497582545475:web:aaf3986c35bf5ba414d2f6"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// if the user has already taken test, redirect to landing page
if (localStorage.getItem('pdcompleted') == 'true'){
  window.location.href = '../src/done.html';
}

// do the interactivity for the pd status selector
function storestatus(st){

  // get the two display buttons
  let thepd = document.getElementById('pd');
  let nonpd = document.getElementById('nonpd');

  // if the user has selected pd
  if (st == 'pd'){
    // mute the nonpd button
    nonpd.style.opacity = 0.25;
    nonpd.style.border = '0px solid black';

    // highlight the pd button
    thepd.style.opacity = 1;
    thepd.style.border = '2px solid black';

    // set the status variable
    pd_status = 'pd';

  // if the user has selected nonpd
  } else {
    // mute the pd button
    thepd.style.opacity = 0.25;
    thepd.style.border = '0px solid black';

    // highligth the nonpd button
    nonpd.style.opacity = 1;
    nonpd.style.border = '2px solid black';

    // change the variable
    pd_status = 'nonpd';
  }
}



// when the user clicks start open verification window and save status
function startverify(){

  // send the data to the database
  senddata();

  // make the background blocker and verification dialogue visible
  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'block';
  blocker.style.opacity = 1;
  verify.style.display = 'block';

  // display demographics on the verification dialogue
  document.getElementById('aged').textContent = "Age: "+document.getElementById('age').value+" years old";
  document.getElementById('gend').textContent = "Gender: "+document.getElementById('gender').value;
  document.getElementById('raced').textContent = "Race: "+document.getElementById('race').value;

  // display pd status on the dialogue
  if (pd_status == 'pd'){
    document.getElementById('pdd').textContent = "PD Status: Has PD";
  } else {
    document.getElementById('pdd').textContent = "PD Status: Does not have PD";
  }
}

// close the verification dialogue if user wants to change anything
function closeverify(){
  let blocker = document.getElementById('blocker');
  let verify = document.getElementById('verify');
  blocker.style.display = 'none';
  blocker.style.opacity = 0;
  verify.style.display = 'none';
}

// send data to the database
async function senddata() {
let userid = new Date().getTime().toString();
sessionStorage.setItem('userid', userid);
theid = userid;

  let data = {
    user: userid,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    race: document.getElementById('race').value,
    status: pd_status
  };

  // Use the user ID as the document ID
  db.collection("testData").doc(userid).set(data, { merge: true })
  .then(() => {
      console.log("Document updated for User ID: ", userid);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}


// redirect user to the mouse test after they verify data
function commencetests(){
  // nah just send it directly
  //http://localhost:3000/?PDINFO&user=person4&age=65&gender=male&race=asian&status=nonpd
  console.log("commencetests function called");
  
  document.getElementById('ttrs').textContent = "Launching...";
  
  window.open('../src/mouse.html?'+theid,'_self');

}