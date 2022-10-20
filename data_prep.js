let fs = require('fs');
let students = [];


//prep()
module.exports.prep = ()=>{
    // console.log("Testing");
    return new Promise((resolve, reject)=>{
         fs.readFile("./students.json", (err, data)=>{
             if (err) {reject("unable to read file.");}
             students = JSON.parse(data);
            // console.log(students);
             resolve("File read success.");
         }); 
    });
 };



//cpa()
module.exports.cpa = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "CPA");
       (results.length == 0)? reject("No CPA students."):resolve(results);
    });
}



//highGPA()
module.exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let high = 0;
        let highStudent;
        
        for (let i=0; i<students.length; i++)
        {
            //console.log(students[i].gpa, high);
            if (students[i].gpa > high)
            {
                high = students[i].gpa;
                highStudent = students[i];
            }
        }
        (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
    }); 
};


//get students
module.exports.getStudent = (studId) => {
    return new Promise((resolve, reject) => {
        let student = []
        for (let index = 0; index < students.length; index++) {
            if (students[index].studId == studId) {
                student = students[index];
            }
        }
        resolve(student)
        if (student.length == 0) {
            reject("can not returned by student");
        }
    })
}


//Add Student
module.exports.addStudent = (data) => {
    return new Promise((resolve, reject) => {
        const studnetObject = {
           "studId": data.studId,
            "name": data.name,
            "program": data.program,
            "gpa": data.gpa
        }
        students.push(studnetObject)
        resolve()
    })
}



//get student by id
module.exports.getStudnetbyId = function(value){
    return new Promise((resolve,reject) => {
        var studentID = students.filter(students => students.studId == value);
        if (studentID.length == 0) {
            reject("studnet by ID not found");
        }
        resolve(studentID);
    })
};
