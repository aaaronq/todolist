// import {format, compareAsc} from 'date-fns'

const DOMStuff = (() => {
	//Handle Modal Creation
	const modal = document.querySelector(".modal");
	modal.style.display = "none"; // Hidden by default
	const modalContent = document.querySelector(".modalcontent");
	const addProjectBtn = document.getElementById("addProjectBtn");
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
		const buttons = document.createElement("div");
		buttons.classList.add("buttons");
		const cancelBtn = document.createElement("button");
		const submitBtn = document.createElement("button");
		cancelBtn.classList.add("btn");
		cancelBtn.id = "cancelBtn";
		cancelBtn.innerText = "Cancel";
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
		submitBtn.addEventListener("click", () => {
			projectsHandler.addProject(input.value);
			updateProjectList();
			updateTodoGrid();
			handleModal();
		});
		form.addEventListener("submit", (e) => e.preventDefault());
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

		const label2 = document.createElement("label");
		label2.innerText = "Task Description";
		label2.setAttribute("for", "taskDesc");
		const input2 = document.createElement("textarea");
		input2.id = "taskDesc";
		input2.setAttribute("wrap", "soft");
		input2.setAttribute("name", "taskDesc");

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
		submitBtn.addEventListener("click", () => {
			todoHandler.createTodo(input1.value, input2.value, input3.value);
			updateTodoGrid();
			handleModal();
		});
		form.addEventListener("submit", (e) => e.preventDefault());
	});

	const addTaskCard = (taskName, taskDesc, taskDate) => {
		const todoList = document.querySelector(".todolist");
		const newTodo = document.createElement("div");
		newTodo.classList.add("todo");
		const title = document.createElement("h2");
		title.innerText = taskName;
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

		// finishBtn.addEventListener("click", () => )

		buttons.appendChild(finishBtn);
		buttons.appendChild(editBtn);
		newTodo.appendChild(title);
		newTodo.appendChild(description);
		newTodo.appendChild(buttons);
		todoList.appendChild(newTodo);
	};

	const updateTodoGrid = () => {
		document.querySelector(".todolist").innerText = "";
		const currentProject = projectsHandler.getCurrentProject();
		console.log(currentProject);
		currentProject.todos.forEach((todo) =>
			addTaskCard(todo.name, todo.desc, todo.date)
		);
	};

	const addProject = (projectTitle) => {
		const projects = document.querySelector(".projects");
		const button = document.createElement("button");
		button.classList.add("btn");
		button.innerText = projectTitle;
		button.addEventListener("click", () => {
			projectsHandler.setCurrentProject(projectTitle);
			updateTodoGrid();
			highlightCurrentProject();
		});
		projects.appendChild(button);
	};

	const updateProjectList = () => {
		const projectButtonList = document.querySelector(".projects");
		projectButtonList.innerText = "";
		projectButtonList.appendChild(addProjectBtn);
		const projectList = projectsHandler.getProjectList();
		projectList.forEach((project) => addProject(project.name));
		highlightCurrentProject();
	};

	const highlightCurrentProject = () => {
		//Reset classlist
		const projectBtns = document.querySelector(".projects").childNodes;
		projectBtns.forEach((button) =>
			button.classList.remove("currentProject")
		);

		//Find and highlight current project
		const currentProject = projectsHandler.getCurrentProject().name;
		projectBtns.forEach((button) => {
			if (button.innerText === currentProject)
				button.classList.add("currentProject");
		});
	};
})();

const projectsHandler = (() => {
	const projects = [];
	let currentProject = null;
	const getProjectList = () => projects;
	const getCurrentProject = () => currentProject;
	const setCurrentProject = (projectName) => {
		if (!projects.some((project) => project.name === projectName))
			return false;
		currentProject = projects.find(
			(project) => project.name === projectName
		);
	};
	const addProject = (newProject) => {
		if (projects.includes(newProject)) return false;
		projects.push({ name: newProject, todos: [] });
		setCurrentProject(newProject);
	};
	const addTodo = (todo) => {
		currentProject.todos.push(todo);
	};

	const getTodoIndex = (todo) => {
		const todoproject = projects.find(
			(project) => project.name === todo.project
		);
		return todoproject.todos.indexOf(todo);
	};

	const updateProject = (todo, projectIndex) => {
		const updatedProject = projects.find(
			(project) => project.name === todo.project
		);
		updatedProject.todos[projectIndex] = todo;
	};

	return {
		getProjectList,
		getCurrentProject,
		setCurrentProject,
		addProject,
		addTodo,
		getTodoIndex,
		updateProject,
	};
})();

const todoHandler = (() => {
	const allTodos = [];
	let id = 0;
	const createTodo = (name, desc, date) => {
		const newTodo = { name, desc, date, id };
		projectsHandler.addTodo(newTodo);
		newTodo.project = projectsHandler.getCurrentProject().name;
		allTodos.push(newTodo);
	};

	const editTodo = (todo, newName, newDesc, newDate) => {
		if (!allTodos.some((todos) => todos.id === todo.id)) return false;
		const todoIndex = allTodos.indexOf(todo);
		const projectIndex = projectsHandler.getTodoIndex(todo);

		//dom modal open with values inserted, fill newName, newDesc, newDate vars

		todo.name = newName;
		todo.desc = newDesc;
		todo.date = newDate;

		allTodos[todoIndex] = todo;
		projectsHandler.updateProject(todo, projectIndex);
	};

	return {
		allTodos,
		createTodo,
		editTodo,
	};
})();

projectsHandler.addProject("fruits");
projectsHandler.getCurrentProject();

todoHandler.createTodo("eat", "sleep", "3-3-2023");
