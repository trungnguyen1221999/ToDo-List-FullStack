import http from "./http";

const getAllList = async () => {
  try {
    const res = await http.get("/");
    return res.data;
  } catch (error) {
    console.log("error get list api : ", error)
  }
};

const getListLimitPage = async (page, limit) => {
  try {
    const res = await http.get(`/page/${page}&limit/${limit}`);
    return res.data;
  } catch (error) {
    console.log("error get list limit page api : ", error);
  }
};

const editTaskApi = async (id, data) => {
  try {
    const res = await http.put(`/edit/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("error edit task api : ", error);
  }

}
const getProductById = async (id) => {
  try {
    const res = await http.get(`/${id}`);
    return res.data;
  }
  catch (error) {
    console.log("error get product by id api : ", error);
  }
}
const deleteListById = async (id) => {
  try {
    const res = await http.delete(`/delete/${id}`);
    return res.data;
  }
  catch (error) { 
    console.log("error delete task by id api : ", error);
  }
}
const addNewTask = async (data)=>{
  try {
    const res = await http.post(`/add`, data);
    return res.data;
  }
  catch (error) {
    console.log("error add new task api : ", error);
  }
}

export { getAllList, getListLimitPage, editTaskApi, getProductById, deleteListById, addNewTask };
