import { useEffect, useState } from "react";
import {  getAllList } from "./api/Api";
import styled from "styled-components";
import EditTaskForm from "./components/EditTaskForm";
function App() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const limit = 6;
  const [selectedId, setSelectedId] = useState('');
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalList, setTotalList] = useState([]);
  useEffect(() => {
    getAllList().then((res) => {
      setList(res.data);
      console.log(res);
      setActiveTasksCount(res.activeTasksCount);
      setCompletedTasksCount(res.completedTasksCount);
      setTotalList(res.data);
    });

  }, [isEditFormOpen]);
  const handleSortList = (status)=>{
    setList (totalList.filter(item => item.status === status))
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(list.length / limit);
  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  return (
    <Container>
      <Title>ToDo App FullStack</Title>
      <div style={{ display: "flex", gap: "20px" , marginBottom: "20px" }}>
        <button onClick={() => handleSortList("active")} style={{ color: activeTasksCount > 0 ? "green" : "white", padding: "10px" , borderRadius: "10px", backgroundColor: "white" , cursor: "pointer"}}>
          {activeTasksCount} Active Tasks
        </button>
        <button onClick={() => handleSortList("completed")} style={{ color: completedTasksCount > 0 ? "black" : "white", padding: "10px", borderRadius: "10px", backgroundColor: "lightgreen", cursor: "pointer" }}>
          {completedTasksCount} Completed Tasks
        </button>
      </div>
      <List>
        {list &&
          list
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((item, index) => (
              <ListItem
                key={item._id}
                style={{
                  backgroundColor:
                    item.status === "completed" ? "lightgreen" : "white",
                }}
              >
                <Index>{index + 1 + (currentPage - 1) * limit}.</Index>
                <Content
                  style={{
                    textDecoration:
                      item.status === "completed" ? "line-through" : "none",
                  }}
                >
                  <TaskTitle>{item.title}</TaskTitle>
                  <TaskDesc>{item.desc}</TaskDesc>
                </Content>
                {item.status === "completed" && (
                  <p style={{ fontSize: "12px", color: "#333" }}>
                    Completed Date :{" "}
                    {item.completedDate
                      ? new Date(item.completedDate).toLocaleDateString()
                      : "Not completed yet"}
                  </p>
                )}
          
                <Actions>
                  <EditButton
                    onClick={() => {
                      setIsEditFormOpen(true);
                      setSelectedId(item._id);
                    }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton>Delete</DeleteButton>
                </Actions>
              </ListItem>
            ))}
      </List>
      <Pagination>
        <PageButton onClick={handlePrevPage}>Previous</PageButton>
        <PageList>
          {Array(totalPages)
            .fill()
            .map((_, i) => (
              <PageInfo
                key={i}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PageInfo>
            ))}
        </PageList>
        <PageButton onClick={handleNextPage}>Next</PageButton>
      </Pagination>
      {isEditFormOpen && (
        <EditTaskForm setIsEditFormOpen={setIsEditFormOpen} id={selectedId} />
      )}
    </Container>
  );
}

export default App;

/* 🎨 Styled Components */
const Container = styled.div`
  max-width: 1000px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  background: #fefefe;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 10px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
`;

const Index = styled.span`
  font-weight: bold;
  margin-right: 12px;
  color: #555;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskTitle = styled.p`
  font-weight: 600;
  margin: 0;
  color: #222;
`;

const TaskDesc = styled.p`
  font-size: 14px;
  color: #666;
  margin: 2px 0 0;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: white;


  &:hover {
    background-color: #0056b3;
  }
`;

const PageInfo = styled.p`
  font-size: 16px;
  color: #333;
  cursor: pointer;
  color: ${({ active }) => (active ? "blue" : "black")};
`;
const PageList = styled.div`
  display: flex;
  gap: 10px;
`;

// const PageInfo = styled.p`
const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  padding: 6px 10px;
  background-color: #ffc107;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;

  &:hover {
    background-color: #e0a800;
  }
`;  
const DeleteButton = styled.button`
  padding: 6px 10px;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;