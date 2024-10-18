let employeForm = document.getElementById('employeForm');
let employeTbl = document.querySelector('#employeTbl tbody');
let books = JSON.parse(localStorage.getItem('userData')) || [];
let editIndex = -1;


employeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const branch = document.getElementById('branch').value;
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const date = document.getElementById('date').value;

    let emp = { branch, name, designation ,date}
    console.log(editIndex);

    if (editIndex == -1) {
        books.push(emp);
        console.log("new data");

    } else {
        books[editIndex] = emp;
        editIndex = -1;
    }

    console.log(books);
    renderEmpData();
    document.getElementById('branch').value = ''
    document.getElementById('name').value = ''
    document.getElementById('designation').value = ''
    document.getElementById('date').value = ''
    localStorage.setItem('userData',JSON.stringify(books))
})

let renderEmpData = () => {
    employeTbl.innerHTML = '';

    books.map((value, index) => {
        let { branch, name, designation,date} = value;
        let empRow = document.createElement('tr');
        empRow.innerHTML = `
        <td>${branch}</td>
        <td>${name}</td>
        <td>${designation}</td>
        <td>${date}</td>
    
        <td>
            <button style="background-color:red; padding:5px ; border-radius:7px ; font-weight:600;font-size: 20px;
" onclick="deleteData(${index})">Delete</button>
            <button style="background-color:yellow; padding:5px; border-radius:7px; font-weight:600;font-size: 20px;" onclick="editData(${index})">Edit</button>
        </td>
       `
        employeTbl.appendChild(empRow);
    })
    console.log(employeTbl);
}


function deleteData(index) {
    books.splice(index, 1);
    console.log(books);
    renderEmpData();
    localStorage.setItem('userData',JSON.stringify(books))

}

function editData(index) {
    let emp = books[index];
    console.log(emp);

    document.getElementById('branch').value = emp.branch;
    document.getElementById('name').value = emp.name;
    document.getElementById('designation').value = emp.designation;
    document.getElementById('date').value = emp.date;
  
    editIndex = index;
}

renderEmpData();
