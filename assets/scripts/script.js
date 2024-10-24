document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('task-input');
  const addBtn = document.getElementById('submit-btn');
  const errorMsg = document.getElementById('alert-msg');
  const taskList = document.getElementById('task-list');
  counter = 2;

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    createTask();
    deleteItems();
    editItems();
  });

  deleteItems();
  editItems();

  function editItems() {
    let editBtnList = document.getElementsByClassName('edit-btn');
    let editBtns = [...editBtnList];
    const editInput = document.getElementById('task-input-edit');
    const modalEditBtn = document.getElementById('edit-btn');

    let currentTaskLabel = null;
    editBtns.forEach((button) => {
      button.addEventListener('click', () => {
        currentTaskLabel = button.closest('li').querySelector('label');
        editInput.value = currentTaskLabel.innerText;
      });

      modalEditBtn.addEventListener('click', (e) => {
        if (currentTaskLabel) {
          currentTaskLabel.innerText = editInput.value;
        }
      });
    });
  }

  function deleteItems() {
    let deleteBtnsList = document.getElementsByClassName('delete-btn');
    let deleteBtns = [...deleteBtnsList];
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        btn.closest('.list-group-item').remove();
      });
    });
  }

  function createTask() {
    let taskValue = inputField.value;
    if (checkInput(taskValue)) {
      const listItem = document.createElement('li');
      listItem.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center'
      );
      listItem.innerHTML = `
            <div class="task-item">
                <input class="form-check-input me-1 task-checkbox" type="checkbox" id="${counter}">
                <label for="${counter}">${taskValue}</label>
            </div>

            <span class="d-flex control-btns">
                <button class="btn edit-btn" data-id="${counter}" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-pencil" style="color: #264c7f;"></i></button>
                <button class="btn delete-btn"> <i class="fa-solid fa-trash-can"
                        style="color: #264c7f;"></i></button></span>
      
            `;
      taskList.appendChild(listItem);
      inputField.value = '';
      counter += 1;
    } else {
      errorMsg.classList.add('show');
    }
  }

  function checkInput(input) {
    if (input.trim().length < 1) {
      return false;
    } else {
      return true;
    }
  }
});
