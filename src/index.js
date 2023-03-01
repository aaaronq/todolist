// import {format, compareAsc} from 'date-fns'


const DOMStuff = (() => {

    //Handle Modal Creation
    const modal = document.querySelector(".modal");
    modal.style.display = "none"; // Hidden by default
    const modalContent = document.querySelector(".modalcontent");
    const addProjectBtn = document.getElementById("addProjectBtn");
    const handleModal = () => {
        console.log(modal.style.display)
        modal.style.display == "none" ? modal.style.display = "block" : modal.style.display = "none";
        modalContent.innerHTML = "";
        modalContent.classList.remove("tasksmodal");
    }

    // Modal for adding projects
    modal.addEventListener("click", (e) => {
        if (e.target !== e.currentTarget) return;
        modal.style.display = "none";
    });

    addProjectBtn.addEventListener("click", () => {
        handleModal();
        const form = document.createElement("form");
        const modalTitle = document.createElement('h2');
        modalTitle.innerText = "New Project"
        const label = document.createElement('label');
        label.innerText = "Project Name"
        label.setAttribute("for", "projectName");
        const input = document.createElement('input');
        input.setAttribute("type", "text");
        input.id = "projectName";
        input.setAttribute("autocomplete", "off");
        input.setAttribute("name", "projectName");
        const buttons = document.createElement('div');
        buttons.classList.add("buttons");
        const cancelBtn = document.createElement("button");
        const submitBtn = document.createElement("button");
        cancelBtn.classList.add("btn");
        cancelBtn.id = "cancelBtn";
        cancelBtn.innerText = "Cancel"
        submitBtn.classList.add("btn");
        submitBtn.id = "submitBtn";
        submitBtn.innerText = "Submit";

        buttons.appendChild(cancelBtn);
        buttons.appendChild(submitBtn);
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(buttons);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(form);
        
        cancelBtn.addEventListener("click", handleModal);
        form.addEventListener("submit", (e) => e.preventDefault());
    });

    // Modal for adding tasks
    const addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", () => {
        handleModal();
        modalContent.classList.add("tasksmodal");
        const form = document.createElement("form");
        const modalTitle = document.createElement('h2');
        modalTitle.innerText = "Add a task"
        const label1 = document.createElement('label');
        label1.innerText = "Task Name"
        label1.setAttribute("for", "taskName");
        const input1 = document.createElement('input');
        input1.setAttribute("type", "text");
        input1.id = "taskName";
        input1.setAttribute("autocomplete", "off");
        input1.setAttribute("name", "taskName");

        const label2 = document.createElement('label');
        label2.innerText = "Task Description"
        label2.setAttribute("for", "taskDesc");
        const input2 = document.createElement('textarea');
        input2.id = "taskDesc";
        input2.setAttribute("wrap", "soft");
        input2.setAttribute("name", "taskDesc");

        const label3 = document.createElement('label');
        label3.innerText = "By date"
        label3.setAttribute("for", "taskDate");
        const input3 = document.createElement('input');
        input3.id = "taskDate";
        input3.setAttribute("type", "Date");
        input3.setAttribute("name", "taskDate");

        const buttons = document.createElement('div');
        buttons.classList.add("buttons");
        const cancelBtn = document.createElement("button");
        const submitBtn = document.createElement("button");
        cancelBtn.classList.add("btn");
        cancelBtn.id = "cancelBtn";
        cancelBtn.innerText = "Cancel"
        submitBtn.classList.add("btn");
        submitBtn.id = "submitBtn";
        submitBtn.innerText = "Submit";

        buttons.appendChild(cancelBtn);
        buttons.appendChild(submitBtn);
        form.appendChild(label1);
        form.appendChild(input1);
        form.appendChild(label2);
        form.appendChild(input2);
        form.appendChild(label3);
        form.appendChild(input3);
        form.appendChild(buttons);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(form);

        cancelBtn.addEventListener("click", handleModal);
        form.addEventListener("submit", (e) => e.preventDefault());
    });


})();

