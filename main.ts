#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[]= [];
let conditions = true;

//print welcome message
console.log(chalk.bold.rgb(204, 204, 204,)(`\n \t\t <<<======================================>>>`));
console.log(chalk.bold.rgb(204, 204, 204)(`\t<<<========>>>  ${chalk.bold.hex(`#9999FF`)(`WELCOME TO TODO LIST APPLICATION`)}  <<<========>>>`));
console.log(chalk.bold.rgb(204, 204, 204,)( `\t\t <<<=======================================>>>`));



let main = async ()=> {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choices",
                type: "list",
                message: chalk.magentaBright.italic("select an option you want to do:"),
                choices:[ "Add Task", "Delete Task", "Update Task", "View Todo-List", "Exit"],
            }
        ]);
        if(option.choices === "Add Task"){
            await addTask()
        }
        else if (option.choices === "Delete Task"){
            await deleteTask()
        }
        else if (option.choices === "View Todo-List"){
            await viewTask()
        }
        else if (option.choices === "Update Task"){
            await updateTask()
        }
        else if (option.choices === "Exit"){
            conditions = false;
        }
    }
}
//add task(function)
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message:chalk.yellow("Enter Your New Task:")
        }
    ]);
    todoList.push(newTask.task);
    console.log (chalk.green`\n ${newTask.task} Task added succesfully in Todo-List`);
}

//view list function
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    todoList.forEach((task, index) => {
        console.log(chalk.blue`${index +1} : ${task}`)

    });
} 

//delete task
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Enter the index you want to delete:"),
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index -1, 1);
    console.log(chalk.green`\n${deletedTask} This task has been deleted from your Todo-List`)
}

//update function
let updateTask = async () =>{
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Please enter the index number you want to update:")
        },
        {
            name: "new_task",
            type: "input",
            message:chalk.yellow("Now enter new task name:"),
        }
    ]);
    todoList[update_task_index.index -1] = update_task_index.new_task
    console.log(chalk.green`\n Task at index number ${update_task_index.index -1}updated successfully [for updated list  option "view todo-List"]`)
}

main();