const saveData = () => {
localStorage.setItem("students", JSON.stringify(students));
};

// DISPLAY
const display = (data = students) => {
let cards = document.getElementById("cards");

if(data.length === 0){
cards.innerHTML = "<h3>No Data Found</h3>";
return;
}

cards.innerHTML = data.map((s,i)=>`
<div class="card">
<h3>${s.name.toUpperCase()}</h3>
<p>ID: ${s.id}</p>
<p>Age: ${s.age}</p>
<p>Course: ${s.course}</p>
<p>City: ${s.city}</p>

<button onclick="edit(${i})">Edit</button>
<button onclick="del(${i})">Delete</button>
</div>
`).join("");
};

display();

// CREATE
document.getElementById("form").addEventListener("submit",(e)=>{
e.preventDefault();

let student = {
id: Date.now(),
name: name.value.trim(),
age: Number(age.value),
course: course.value.toLowerCase(),
city: city.value.trim(),
createdAt: new Date()
};

students.push(student);

saveData();
display();
e.target.reset();
});

// DELETE
const del = (i) => {
if(confirm("Are you sure?")){
students = students.filter((_,index)=>index!==i);
saveData();
display();
}
};

// UPDATE
const edit = (i) => {
let s = students[i];

let newName = prompt("Name", s.name);
let newAge = prompt("Age", s.age);

if(newName && newAge){
students[i] = {
...s,
name: newName.trim(),
age: Number(newAge)
};
saveData();
display();
}
};

// SEARCH
document.getElementById("search").addEventListener("input",(e)=>{
let val = e.target.value.toLowerCase().trim();

let filtered = students.filter(s =>
s.name.toLowerCase().includes(val)
);

display(filtered);
});

// SORT
const sortByAge = () => {
students.sort((a,b)=>a.age-b.age);
display();
};

const sortByName = () => {
students.sort((a,b)=>a.name.localeCompare(b.name));
display();
};

// RECENT
const showRecent = () => {
display(students.slice(-3));
};

// TOP STUDENTS
const topStudents = () => {
display(students.filter(s=>s.age > 20));
};

// ADVANCED METHODS
const advanced = () => {

let avg = students.reduce((sum,s)=>sum+s.age,0)/students.length;

let found = students.find(s=>s.name.toLowerCase()==="mehran");

let some = students.some(s=>s.age>22);

let every = students.every(s=>s.age>=18);

// OBJECT METHODS
console.log(Object.keys(students[0]));
console.log(Object.values(students[0]));

console.log("Average Age:",avg);
console.log("Found:",found);
console.log("Any Senior:",some);
console.log("All Adults:",every);
};

advanced();