// Kintamieji: 
var addBtn = document.getElementById('add'); // "Add" mygtukas; 

var todoTbody = document.getElementById('todoTbody');
var doneTbody = document.getElementById('doneTbody');
var todoMasyvas = []; 
var doneMasyvas = [];

// Funkcijos: 

// "Todo" table skilties list'o spausdinimas: 
function updateTodo (){
    todoTbody.innerHTML = '';
    for (i = 0; i < todoMasyvas.length; i++){
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'row justify-content-center align-items-center mb-2');
        
        var taskTd = document.createElement('td');
        taskTd.setAttribute('class', 'col-12 mb-3');
        taskTd.innerText = todoMasyvas[i].task;

        var deleteBtnTd = document.createElement('td');
        deleteBtnTd.setAttribute('class', 'col-auto');
        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'btn btn-danger');
        deleteBtn.innerText = "Delete";
        deleteBtnTd.appendChild(deleteBtn);

        var moveToDoneTd = document.createElement('td');
        moveToDoneTd.setAttribute('class', 'col-auto');
        var moveToDone = document.createElement('button');
        moveToDone.setAttribute('class', 'btn btn-success');
        moveToDone.innerText = "Move to Done";
        moveToDoneTd.appendChild(moveToDone);

        tr.appendChild(taskTd);
        tr.appendChild(deleteBtnTd);
        tr.appendChild(moveToDoneTd);
        todoTbody.appendChild(tr);
    }
}

// "Done" table skilties list'o spausdinimas: 
function updateDone (){
    doneTbody.innerHTML = '';
    for (i = 0; i < doneMasyvas.length; i++){
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'row justify-content-center align-items-center mb-2');
        
        var taskTd = document.createElement('td');
        taskTd.setAttribute('class', 'col-12 mb-3');
        taskTd.innerText = doneMasyvas[i].task;

        var deleteBtnTd = document.createElement('td');
        deleteBtnTd.setAttribute('class', 'col-auto');
        var deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'btn btn-danger');
        deleteBtn.innerText = "Delete";
        deleteBtnTd.appendChild(deleteBtn);

        var moveBackTd = document.createElement('td');
        moveBackTd.setAttribute('class', 'col-auto');
        var moveBack = document.createElement('button');
        moveBack.setAttribute('class', 'btn btn-success');
        moveBack.innerText = "Move Back";
        moveBackTd.appendChild(moveBack);

        tr.appendChild(taskTd);
        tr.appendChild(deleteBtnTd);
        tr.appendChild(moveBackTd);
        doneTbody.appendChild(tr);
    }
}

var errorMsg = document.querySelector('.alert-danger');
//  spaudžiam "Add", sukuriam naują Todo list'o elementą:
addBtn.addEventListener('click', e =>{
    e.preventDefault();
    todoNaujas = {
        task: document.getElementById('todo-input').value,
    }
    if (document.getElementById('todo-input').value == ''){
        errorMsg.classList.add('alert-danger-active');
        setTimeout(function(){
            errorMsg.classList.remove('alert-danger-active');
        },3000);
    } else {
        todoMasyvas.unshift(todoNaujas);
        updateTodo ();
        document.querySelector('form').reset()
    }

    document.querySelector('form').reset();
});

var todoDeleteIndex;
// spaudžiam "Delete", trina pasirinktą "Todo" list'o elementą:
document.querySelector('#todoTable').addEventListener('click', function(e){
    if (e.target.classList.contains('btn-danger')){
        todoDeleteIndex = e.target.closest('tr').rowIndex;
        todoMasyvas.splice(todoDeleteIndex, 1);
        updateTodo ();
    }
});

var successMsg = document.querySelector('.alert-success');
var moveToDoneIndex;
// spaudžiam "Move to Done", perkelia pasirinktą Todo list'o elementą į Done list'ą:
document.querySelector('#todoTable').addEventListener('click', function(e){
    if (e.target.classList.contains('btn-success')){
        successMsg.classList.add('alert-success-active');
        setTimeout(function(){
            successMsg.classList.remove('alert-success-active');
        },3000);
        moveToDoneIndex = e.target.closest('tr').rowIndex;
        doneNaujas = {
            task: todoMasyvas[moveToDoneIndex].task,
        }
        doneMasyvas.unshift(doneNaujas);
        todoMasyvas.splice(moveToDoneIndex, 1);
        updateTodo ();
        updateDone ();
    }
});

var doneDeleteIndex;
// spaudžiam "Delete", trina pasirinktą "Done" list'o elementą:
document.querySelector('#doneTable').addEventListener('click', function(e){
    if (e.target.classList.contains('btn-danger')){
        doneDeleteIndex = e.target.closest('tr').rowIndex;
        doneMasyvas.splice(doneDeleteIndex, 1);
        updateDone ();
    }
});

var warningMsg = document.querySelector('.alert-warning');
var moveToTodoIndex;
// spaudžiam "Move Back", perkelia pasirinktą "Done" list'o elementą į "Todo" list'ą:
document.querySelector('#doneTable').addEventListener('click', function(e){
    if (e.target.classList.contains('btn-success')){
        warningMsg.classList.add('alert-warning-active');
        setTimeout(function(){
            warningMsg.classList.remove('alert-warning-active');
        },3000);
        moveToTodoIndex = e.target.closest('tr').rowIndex;
        todoNaujas = {
            task: doneMasyvas[moveToTodoIndex].task,
        }
        todoMasyvas.unshift(todoNaujas);
        doneMasyvas.splice(moveToTodoIndex, 1);
        updateTodo ();
        updateDone ();
    }
});