document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('task-input');
  const addBtn = document.getElementById('submit-btn');
  const errorMsg = document.getElementById('alert-msg');
  const taskList = document.getElementById('task-list');
  const modalEditBtn = document.getElementById('edit-btn');
  const editInput = document.getElementById('task-input-edit');
  let currentEditIndex = null;
  let taskListArr = JSON.parse(localStorage.getItem('listArray')) || [];

  displayItems();

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createTask();
  });

  function displayItems() {
    taskList.innerHTML = '';
    taskListArr.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'
      );
      listItem.innerHTML = `
          <div class="task-item">
              <input class="form-check-input me-1 task-checkbox" type="checkbox" id="${index}">
              <label for="${index}">${item}</label>
          </div>

          <span class="d-flex control-btns">
              <button class="btn edit-btn" data-id="${index}" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pencil" style="color: #264c7f;"></i></button>
              <button class="btn delete-btn" data-id="${index}"> <i class="fa-solid fa-trash-can"
                      style="color: #264c7f;"></i></button></span>
    
          `;
      taskList.appendChild(listItem);
    });
  }

  taskList.addEventListener('click', function (e) {
    if (e.target.closest('.delete-btn')) {
      const index = e.target.closest('.delete-btn').getAttribute('data-id');
      deleteItems(index);
    } else if (e.target.closest('.edit-btn')) {
      const index = e.target.closest('.edit-btn').getAttribute('data-id');
      handleEditItems(index);
    }
  });

  modalEditBtn.addEventListener('click', (e) => {
    // Update the task in the array based on currentEditIndex
    if (currentEditIndex !== null) {
      taskListArr[currentEditIndex] = editInput.value;
      localStorage.setItem('listArray', JSON.stringify(taskListArr));
      displayItems(); // Refresh the list with the updated task
      currentEditIndex = null; // Reset the current edit index
    }
  });

  // function editItems(index) {
  //     const modalEditBtn = document.getElementById('edit-btn');
  //     const editInput = document.getElementById('task-input-edit');

  //     modalEditBtn.addEventListener('click', (e) => {
  //         taskListArr[index] = editInput.value;
  //         localStorage.setItem('listArray', JSON.stringify(taskListArr));
  //         displayItems();
  //     });
  // }

  function handleEditItems(index) {
    editInput.value = taskListArr[index];
    currentEditIndex = index;
  }

  function deleteItems(index) {
    taskListArr.splice(index, 1);
    localStorage.setItem('listArray', JSON.stringify(taskListArr));
    displayItems();
  }

  function createTask() {
    let taskValue = inputField.value;
    if (checkInput(taskValue)) {
      taskListArr.push(taskValue);
      localStorage.setItem('listArray', JSON.stringify(taskListArr));
      displayItems();
      console.log(taskListArr);
      inputField.value = '';
    } else {
      errorMsg.classList.add('show');
    }
  }

  function checkInput(input) {
    return input.trim().length > 0;
  }
});
