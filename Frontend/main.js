 import { Employee } from "./employee.js";
 import { Task } from './task.js';

 
 const host = document.body;
 const data = await fetch("http://localhost:5261/Employee/GetEmployee");
 const e = await data.json();
 console.log(e);

 const task = await fetch("http://localhost:5261/Task/GetTasks");
 const t = await task.json();
 console.log(t);

 const project = await fetch("http://localhost:5261/Project/GetProjects");
 const p = await project.json();
 console.log(p);


    const zaposleni = new Employee(e);
    const tasks = new Task(t);

    zaposleni.crtaj(host);
    tasks.crtajTask(host);
