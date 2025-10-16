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


export { getAllList, getListLimitPage };
