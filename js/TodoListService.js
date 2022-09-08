// API and stuffs
export default class TodoListService {
    getTodoList = () => {
        return axios({
            method: "get",
            url: "https://6319e6ee6b4c78d91b471293.mockapi.io/todoApp",
          });
    }
    
    addTask = (task) => {
        return axios({
            method: "post",
            url: "https://6319e6ee6b4c78d91b471293.mockapi.io/todoApp",
            data: task,
          });    
    }
    
    deleteTask = (id) => {
        return axios({
            method: "delete",
            url: `https://6319e6ee6b4c78d91b471293.mockapi.io/todoApp/${id}`,
        }); 
    }
    
    getTaskDetail = (id) => {
        return axios({
            method: 'get',
            url: `https://6319e6ee6b4c78d91b471293.mockapi.io/todoApp/${id}`,
        }); 
    }

    updateTaskDetail = (id, task) => {
        return axios({
            method: 'put',
            url:`https://6319e6ee6b4c78d91b471293.mockapi.io/todoApp/${id}`,
            data: task
        }); 
    }
}