import { intervalToDuration, isAfter } from "date-fns";

const DOMStuff = (() => {
	//Handle Modal Creation
	const modal = document.querySelector(".modal");
	modal.style.display = "none"; // Hidden by default
	const modalContent = document.querySelector(".modalcontent");
	const addProjectBtn = document.getElementById("addProjectBtn");
	const allProjectsBtn = document.getElementById("allProjectsBtn");
	const handleModal = () => {
		modal.style.display == "none"
			? (modal.style.display = "block")
			: (modal.style.display = "none");
		modalContent.innerHTML = "";
		modalContent.classList.remove("tasksmodal");
	};

	// Modal for adding projects
	modal.addEventListener("click", (e) => {
		if (e.target !== e.currentTarget) return;
		modal.style.display = "none";
	});

	addProjectBtn.addEventListener("click", () => {
		handleModal();
		const form = document.createElement("form");
		const modalTitle = document.createElement("h2");
		modalTitle.innerText = "New Project";
		const label = document.createElement("label");
		label.innerText = "Project Name";
		label.setAttribute("for", "projectName");
		const input = document.createElement("input");
		input.setAttribute("type", "text");
		input.id = "projectName";
		input.setAttribute("autocomplete", "off");
		input.setAttribute("name", "projectName");
		input.setAttribute("minlength", "1");
		input.setAttribute("maxlength", "15");
		input.setAttribute("required", "");	
		const buttons = document.createElement("div");
		buttons.classList.add("buttons");
		const cancelBtn = document.createElement("button");
		const submitBtn = document.createElement("button");
		cancelBtn.classList.add("btn");
		cancelBtn.id = "cancelBtn";
		cancelBtn.innerText = "Cancel";
		cancelBtn.setAttribute("type", "button");
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
		form.addEventListener("submit", () => {
			projectsHandler.addProject(input.value);
			updateProjectList();
			updateTodoGrid();
			handleModal();
		});
		form.addEventListener("submit", (e) => e.preventDefault());

		input.focus();
	});

	// Modal for adding tasks
	const addTaskBtn = document.getElementById("addTaskBtn");
	addTaskBtn.addEventListener("click", () => {
		handleModal();
		modalContent.classList.add("tasksmodal");
		const form = document.createElement("form");
		const modalTitle = document.createElement("h2");
		modalTitle.innerText = "Add a task";
		const label1 = document.createElement("label");
		label1.innerText = "Task Name";
		label1.setAttribute("for", "taskName");
		const input1 = document.createElement("input");
		input1.setAttribute("type", "text");
		input1.id = "taskName";
		input1.setAttribute("autocomplete", "off");
		input1.setAttribute("name", "taskName");
		input1.setAttribute("minlength", "1");
		input1.setAttribute("maxlength", "15");
		input1.setAttribute("required", "");	

		const label2 = document.createElement("label");
		label2.innerText = "Task Description";
		label2.setAttribute("for", "taskDesc");
		const input2 = document.createElement("textarea");
		input2.id = "taskDesc";
		input2.setAttribute("wrap", "soft");
		input2.setAttribute("name", "taskDesc");
		input2.setAttribute("minlength", "1");
		input2.setAttribute("maxlength", "110");

		const label3 = document.createElement("label");
		label3.innerText = "By date";
		label3.setAttribute("for", "taskDate");
		const input3 = document.createElement("input");
		input3.id = "taskDate";
		input3.setAttribute("type", "Date");
		input3.setAttribute("name", "taskDate");

		const buttons = document.createElement("div");
		buttons.classList.add("buttons");
		const cancelBtn = document.createElement("button");
		const submitBtn = document.createElement("button");
		cancelBtn.classList.add("btn");
		cancelBtn.id = "cancelBtn";
		cancelBtn.innerText = "Cancel";
		cancelBtn.setAttribute("type", "button");
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

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			todoHandler.createTodo(input1.value, input2.value, input3.value);
			updateTodoGrid();
			handleModal();
		});

		input1.focus();
	});

	const convertDate = (date) => {
		const dateobj = new Date(date);
		const convertedDate = intervalToDuration({
			start: new Date(),
			end: dateobj,
		});

		let isNegative = "";

		if (isAfter(new Date(), dateobj)) {
			isNegative = "-";
		}

		const years = convertedDate.years;
		const months = convertedDate.months;
		const days = convertedDate.days;

		if (years === 1) return `${isNegative}${years} year`;
		if (years > 1) return `${isNegative}${years} years`;
		if (years === 0 && months === 0 && days === 0) return `today`;		
		if (years === 0 && months === 0) return `${isNegative}${days} days`;
		if (years === 0 && months === 0 && days === 1) return `${isNegative}${days} day`;
		if (years === 0 && months === 1) return `${isNegative}${months} month`;
		if (years === 0 && months > 1) return `${isNegative}${months} months`;
	}

	const addTaskCard = (taskName, taskDesc, taskDate, todoID) => {
		const todoList = document.querySelector(".todolist");
		const newTodo = document.createElement("div");
		newTodo.classList.add("todo");
		newTodo.setAttribute("data-todoID", todoID);
		const title = document.createElement("h2");
		title.innerText = taskName;
		const date = document.createElement("p");
		date.innerText = convertDate(taskDate);
		date.classList.add("date");
		const description = document.createElement("p");
		description.innerText = taskDesc;
		const buttons = document.createElement("div");
		buttons.classList.add("buttons");
		const finishBtn = document.createElement("img");
		finishBtn.id = "finishBtn";
		finishBtn.setAttribute("src", "./icons/check-circle-outline.svg");
		finishBtn.setAttribute("alt", "finish");
		const editBtn = document.createElement("img");
		editBtn.id = "editBtn";
		editBtn.setAttribute("src", "./icons/pencil-circle-outline.svg");
		editBtn.setAttribute("alt", "edit");

		finishBtn.addEventListener("click", () => {
			todoHandler.removeTodo(todoID);
			updateTodoGrid();
		});

		editBtn.addEventListener("click", () => editCard(todoID));

		buttons.appendChild(finishBtn);
		buttons.appendChild(editBtn);
		newTodo.appendChild(title);
		newTodo.appendChild(date);
		newTodo.appendChild(description);
		newTodo.appendChild(buttons);
		todoList.appendChild(newTodo);
	};

	const editCard = (id) => {
		const editingTodo = todoHandler.getTodoByID(id);

		handleModal();
		modalContent.classList.add("tasksmodal");
		const form = document.createElement("form");
		const modalTitle = document.createElement("h2");
		modalTitle.innerText = "Edit task";
		const label1 = document.createElement("label");
		label1.innerText = "Task Name";
		label1.setAttribute("for", "taskName");
		const input1 = document.createElement("input");
		input1.setAttribute("type", "text");
		input1.id = "taskName";
		input1.setAttribute("autocomplete", "off");
		input1.setAttribute("name", "taskName");
		input1.value = editingTodo.name;

		const label2 = document.createElement("label");
		label2.innerText = "Task Description";
		label2.setAttribute("for", "taskDesc");
		const input2 = document.createElement("textarea");
		input2.id = "taskDesc";
		input2.setAttribute("wrap", "soft");
		input2.setAttribute("name", "taskDesc");
		input2.value = editingTodo.desc;

		const label3 = document.createElement("label");
		label3.innerText = "By date";
		label3.setAttribute("for", "taskDate");
		const input3 = document.createElement("input");
		input3.id = "taskDate";
		input3.setAttribute("type", "Date");
		input3.setAttribute("name", "taskDate");
		input3.value = editingTodo.date;

		const buttons = document.createElement("div");
		buttons.classList.add("buttons");
		const cancelBtn = document.createElement("button");
		const submitBtn = document.createElement("button");
		cancelBtn.classList.add("btn");
		cancelBtn.id = "cancelBtn";
		cancelBtn.innerText = "Cancel";
		cancelBtn.setAttribute("type", "button");
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

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			todoHandler.editTodo(id, input1.value, input2.value, input3.value);
			updateTodoGrid();
			handleModal();
		});

		input2.focus();
	};

	const updateTodoGrid = () => {
		document.querySelector(".todolist").innerText = "";
		let currentProjectList = projectsHandler.getCurrentProject();
		if (currentProjectList === "All") {
			currentProjectList = todoHandler.getTodoList("All");
		}
		else {
			currentProjectList = currentProjectList.todos;
		}
		currentProjectList.forEach((todo) =>
			addTaskCard(todo.name, todo.desc, todo.date, todo.id)
		);
	};

	const addProject = (projectTitle) => {
		const projects = document.querySelector(".projects");
		const button = document.createElement("button");
		button.classList.add("btn");
		button.innerText = projectTitle;
		button.addEventListener("click", () => {
			projectsHandler.setCurrentProject(projectTitle);
			projectsHandler.updateProjectTodos();
			updateTodoGrid();
			highlightCurrentProject();
		});
		projects.appendChild(button);
	};

	const updateProjectList = () => {
		const projectButtonList = document.querySelector(".projects");
		projectButtonList.innerText = "";
		projectButtonList.appendChild(addProjectBtn);
		projectButtonList.appendChild(allProjectsBtn);
		const projectList = projectsHandler.getProjectList();
		projectList.forEach((project) => addProject(project.name));
		highlightCurrentProject();
	};

	allProjectsBtn.addEventListener("click", () => {
		projectsHandler.setCurrentProject("All");
		updateTodoGrid();
		highlightCurrentProject();
	});

	const highlightCurrentProject = () => {
		//Reset classlist
		const projectBtns = document.querySelector(".projects").childNodes;
		projectBtns.forEach((button) =>
			button.classList.remove("currentProject")
		);

		//Find and highlight current project
		let currentProject = projectsHandler.getCurrentProject();
		if (currentProject !== "All") {
			currentProject = currentProject.name;
		}
		projectBtns.forEach((button) => {
			if (button.innerText === currentProject)
				button.classList.add("currentProject");
		});
	};

	// If there's local storage
	const checkLocalStorage = () => {
		if (localStorage.getItem("projects") !== null) {
			updateProjectList();
			projectsHandler.updateProjectTodos();
			updateTodoGrid();
			highlightCurrentProject();
		}
	};
	return {
		checkLocalStorage,
	}
})();

const projectsHandler = (() => {
	let projects = [];
	let currentProject = null;
	if (localStorage.getItem("projects") !== null) {
		projects = JSON.parse(localStorage.getItem("projects"));
		currentProject = JSON.parse(localStorage.getItem("currentProject"));
	}
	const getProjectList = () => projects;
	const getCurrentProject = () => currentProject;
	const setCurrentProject = (projectName) => {
		if (projectName === "All") {
			currentProject = "All";
			return;
		}
		if (!projects.some((project) => project.name === projectName))
			return false;
		currentProject = projects.find(
			(project) => project.name === projectName
		);
		localStorage.setItem("currentProject", JSON.stringify(currentProject));
	};
	const addProject = (newProject) => {
		if (projects.includes(newProject)) return false;
		projects.push({ name: newProject, todos: [] });
		setCurrentProject(newProject);
		localStorage.setItem("projects", JSON.stringify(projects));
	};

	const updateProjectTodos = () => {
		currentProject.todos = [];
		const todoList = todoHandler.getTodoList(currentProject.name);
		todoList.forEach((todo) => currentProject.todos.push(todo));
	};

	return {
		getProjectList,
		getCurrentProject,
		setCurrentProject,
		addProject,
		updateProjectTodos,
	};
})();

const todoHandler = (() => {
	let allTodos = [];
	let id = 0;
	if (localStorage.getItem("allTodos") !== null) {
		allTodos = JSON.parse(localStorage.getItem("allTodos"));
		id = JSON.parse(localStorage.getItem("id"));
	}
	const createTodo = (name, desc, date) => {
		const newTodo = { name, desc, date, id };
		newTodo.project = projectsHandler.getCurrentProject().name;
		allTodos.push(newTodo);
		projectsHandler.updateProjectTodos();
		localStorage.setItem("allTodos", JSON.stringify(allTodos));
		id++;
		localStorage.setItem("id", JSON.stringify(id))
	};

	const editTodo = (id, newName, newDesc, newDate) => {
		if (!allTodos.some((todos) => todos.id === id)) return false;
		const todo = allTodos.find((todos) => todos.id === id);
		todo;
		const todoIndex = allTodos.indexOf(todo);

		//dom modal open with values inserted, fill newName, newDesc, newDate vars

		todo.name = newName;
		todo.desc = newDesc;
		todo.date = newDate;

		allTodos[todoIndex] = todo;
		projectsHandler.updateProjectTodos();
	};

	const getTodoList = (project) => {
		if (project === "All") return allTodos;
		return allTodos.filter((todo) => todo.project === project);
	};

	const removeTodo = (currentid) => {
		const todo = allTodos.find((todos) => todos.id === currentid);
		if (!todo) return;
		const todoIndex = allTodos.indexOf(todo);
		if (todoIndex !== -1) allTodos.splice(todoIndex, 1);
		projectsHandler.updateProjectTodos();
		localStorage.setItem("allTodos", JSON.stringify(allTodos));
	};

	const getTodoByID = (todoid) =>
		allTodos.find((todos) => todos.id === todoid);

	return {
		allTodos,
		createTodo,
		editTodo,
		getTodoList,
		removeTodo,
		getTodoByID,
	};
})();

DOMStuff.checkLocalStorage();