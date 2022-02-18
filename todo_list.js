// Clear the inputs
document.querySelector('#duedate_input').value = '';
document.querySelector('#duetime_input').value = '';

// Make sure the list has a few items as soon as the page loads
addTask("Pet cat");
addTask("Clean cat poop", 16399444000000);

// Define variables
const description = document.querySelector("#task_description_input");
const addTaskButton = document.querySelector('#add_task');
const dateInputElement = document.querySelector('#duedate_input');
const timeInputElement = document.querySelector('#duetime_input');

// Make add task button clickable & add a keyboard shortcut
addTaskButton.addEventListener('click', function() {
    addTask(description.value, dateAndTimeToTimestamp(dateInputElement, timeInputElement));
})

addTaskButton.addEventListener('keydown', (event)=> {
    if (event.keyCode === 13) { // key code of the keybord key
      event.preventDefault();
      addTask(description.value, dateAndTimeToTimestamp(dateInputElement, timeInputElement));
    }
});

/** Convert input#dueDate and input#dueTime to a timestamp
 * @param {HTMLElement} dateInputElement // The date input element
 * @param {HTMLElement} timeInputElement // The time input element
 * @returns {Number|bool} // A timestamp if the date and time inputs have values, otherwise FALSE
 */
 function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) {
        // The user specified both a due date & due time
        // Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTask(description, dueTime=false){
    // Append the things to do to the list
    if (dueTime){
        document.querySelector("#task_list").innerHTML +=
        `<li>${description}<span class='due'>due ${new Date(dueTime).toLocaleString()}
        </span><button class='btn btn-sm btn-outline-danger done' type='button'>Done</button></li>`;
    }
    else{
        document.querySelector("#task_list").innerHTML +=
        `<li>${description}<button class="btn btn-sm btn-outline-danger done" type="button">Done</button></li> `;
    }

    // Clear the inputs
    document.querySelector("#task_description_input").value = '';
    document.querySelector('#duedate_input').value = '';
    document.querySelector('#duetime_input').value = '';

    // Mark things as done
    var doneButton = document.getElementsByClassName("btn btn-sm btn-outline-danger done");
    var i
    for (i = 0; i < doneButton.length; i++) {
        doneButton[i].onclick = function(){
            // doneButton[i].parentNode.remove(); // why it doesn't work ???
            var Litodelete = this.parentElement;
            Litodelete.remove();
            // Litodelete.style.display = "none";
        }
    }
}