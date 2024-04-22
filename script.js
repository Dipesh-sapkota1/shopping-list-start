const inputForm = document.getElementById('item-form');
const input = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const filter = document.getElementById('filter');
const updateBtn = inputForm.querySelector('button');
let isEditMode = false;



function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item)=> addItemToDOM(item));
    checkUI();
}

const onAddItemSubmit = (e) =>{
    e.preventDefault();
    const newItem = input.value;
 

    if(input.value === ''){
        alert('Please fill the form');
        return;
    }
    if(isEditMode){
        const isToEdit = itemList.querySelector('.edit-mode');

        removeItemFormStorage(isToEdit.textContent);
        isToEdit.classList.remove('edit-mode');
        isToEdit.remove();
        isEditMode = false;
    }else{
        if(checkIfItemExist){
            alert('Item already exist');
            return;
        }
    }
    
    addItemToDOM(newItem);
    addItemToStorage(newItem);
 
    checkUI();  
    
    input.value = '';
}
 

const addItemToStorage = (item) =>{
    const itemsFromStorage = getItemsFromStorage();
    
    itemsFromStorage.push(item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}




const getItemsFromStorage = () => {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null){
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
  
}
const addItemToDOM = (item)=>{
    const li = document.createElement('li');
    const text = document.createTextNode(item);
    const button = addbtn('remove-item btn-link text-red');
    li.appendChild(text);
    li.appendChild(button);
    itemList.appendChild(li);
    
}

const  addbtn = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    button.appendChild(addIcon('fa-solid fa-x '));
    return button;

}

const addIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

const onClick = (e) => {
    if(e.target.tagName === 'I'){
        removeItemFromDOM(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
} 
const checkIfItemExist = (item) =>{
    const itemsFromStorage = getItemsFromStorage();
   return itemsFromStorage.includes(item);
}
const setItemToEdit = (item) => {
    itemList
    .querySelectorAll('li')
    .forEach(i=> i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    isEditMode = true;
    input.value = item.textContent;
    updateBtn.style.backgroundColor = '#228b22';
    updateBtn.innerHTML = "<i class = 'fa-solid fa-pen' ></i>  Update item";
}

const removeItemFromDOM = (item) => {
     if(confirm('Are you sure about that')){
        item.remove();
        removeItemFormStorage(item.textContent);
        checkUI();
     }
}
const removeItemFormStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

const removeAll = () => {
   while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
   }
   localStorage.clear();
   checkUI();
}


const checkUI = () =>{
    input.value = '';
    const li = itemList.querySelectorAll('li');

    if(li.length === 0){
        filter.style.display = 'none';
        clearBtn.style.display = 'none';
    }else{
        filter.style.display = 'block';
        clearBtn.style.display = 'block';
    }

    updateBtn.style.backgroundColor = '#333';
    updateBtn.innerHTML = "  <i class='fa-solid fa-plus'></i> Add Item";
}



const filterItem = (e) => {
   const li = itemList.querySelectorAll('li');
   const text = e.target.value.toLowerCase();
   
   li.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if(itemName.indexOf(text) != -1){
        item.style.display = 'flex';
    }else{
        item.style.display = 'none';
    }
   });
} 

//Event Listeners
const init  = () =>{
  inputForm.addEventListener('submit',onAddItemSubmit);
  itemList.addEventListener('click',onClick);
  clearBtn.addEventListener('click',removeAll);
  filter.addEventListener('input',filterItem);
  document.addEventListener('DOMContentLoaded',displayItems);
  checkUI();
}
init();
 