//cyclic link : https://zany-pink-crane-tie.cyclic.app


 let HTTP_PORT = process.env.PORT || 8080;
 let express = require("express");
 let app = express();
 let data_prep = require("./data_prep.js");

 

app.get("/", function(req, res){
    let resText = "<h2>Declaration:</h2><br>";
    resText += "<p> I acknowledge the College's integrity policy-and my own integrity- remain in effect whether my work is <br>"
    resText += "done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with <br>"
    resText += "my classmates...even when no one is watching. I declare I will not break that trust.</p><br>"
    resText += "<p style=background-color:yellow> Name: <span>Melika Hamedani</span></p><br>"
    resText += "<p style=background-color:yellow> Student Number: <span>175474212</span></p><br>"
    resText += "<a href = './students.json'> CPA Students</a> <br>";
    resText += "<a href = './students.json'> Highest GPA </a> <br>"; 
    resText += "<a href = './students.json'> All Students </a> <br>"; 
    resText += "<a href = './test3_views/addStudents.html'> Add a new Student </a> <br>"; 
    res.send(resText);
});


//CPA
app.get('/cpa', (req, res) => {
    data_prep.cpa()
        .then((data) => res.json(data))
        .catch(err => console.log(err))
})



//High GPA
app.get("/highGPA", (req, res)=>{
    data_prep.highGPA().then((data)=>{
        let resText = `<h2> Highest GPA: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        res.send(resText);
    });
});


//get All Students
app.get('/allStudents', (req, res) => {
    data_prep.allStudents().then(data => {
        res.json(data)
    })
        .catch(err => console.log(err))
})


//Add student
app.get("/addStudent", (req, res) => {
    res.sendFile(path.join(__dirname,"/test3_views/addStudents.html"));
});

app.post("/addStudent", (req, res) => {
    data_prep.addStudent(req.body).then(() => {
        let resText = `<h2> This Student Information </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Student Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        resText += "<a href = './students.json'> All Students </a> <br>"; 
        resText += "<a href = './test3_views/addStudents.html'> Add a new Student </a> <br>"; 
        res.send(resText);
    }).catch((reason)=>{
        res.json({message:reason});
});
});

//get Student by Id
app.get("/student/:studId", (req,res) => {
    data_prep.getStudnetbyId (req.params.value).then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});


//Error 404
app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.");
});
