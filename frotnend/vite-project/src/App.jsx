import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllList } from "./api/Api";
import EditTaskForm from "./components/EditTaskForm";
import DeleteTaskForm from "./components/DeleteTaskForm";
import { Toaster } from "sonner";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteFormOpen, setIsDeleteFormOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [totalList, setTotalList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const limit = 6;

  useEffect(() => {
    getAllList().then((res) => {
      setList(res.data);
      setActiveTasksCount(res.activeTasksCount);
      setCompletedTasksCount(res.completedTasksCount);
      setTotalList(res.data);
    });
  }, [refresh]);

  const handleSortList = (status) => {
    if (status === "all") {
      setList(totalList);
      setActiveFilter("all");
      return;
    }
    setList(totalList.filter((item) => item.status === status));
    setActiveFilter(status);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(list.length / limit);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDelete = (id) => {
    setIsDeleteFormOpen(true);
    setSelectedId(id);
  };

  return (
    <Container>
      <Title>ToDo App FullStack</Title>

      <FilterGroup>
        <FilterButton
          $active={activeFilter === "all"}
          onClick={() => handleSortList("all")}
        >
          All Tasks
        </FilterButton>
        <FilterButton
          $active={activeFilter === "active"}
          onClick={() => handleSortList("active")}
        >
          {activeTasksCount} Active Tasks
        </FilterButton>
        <FilterButton
          $active={activeFilter === "completed"}
          onClick={() => handleSortList("completed")}
        >
          {completedTasksCount} Completed Tasks
        </FilterButton>
      </FilterGroup>
      <AddButton onClick={() => setIsAddFormOpen(true)}>
        {" "}
        Add new task
      </AddButton>
      {isAddFormOpen && (
        <AddTaskForm
          setIsAddFormOpen={setIsAddFormOpen}
          refresh={refresh}
          setRefresh={setRefresh}
          setCurrentPage ={setCurrentPage}
        />
      )}
      <List>
        {list
          .slice((currentPage - 1) * limit, currentPage * limit)
          .map((item, index) => (
            <ListItem key={item._id} $completed={item.status === "completed"}>
              <Index>{index + 1 + (currentPage - 1) * limit}.</Index>
              <Content>
                <TaskTitle $completed={item.status === "completed"}>
                  {item.title}
                </TaskTitle>
                <TaskDesc>{item.desc}</TaskDesc>
                {item.status === "completed" && (
                  <CompletedDate>
                    Completed:{" "}
                    {item.completedDate
                      ? new Date(item.completedDate).toLocaleDateString()
                      : "N/A"}
                  </CompletedDate>
                )}
              </Content>

              <Actions>
                <EditButton
                  onClick={() => {
                    setIsEditFormOpen(true);
                    setSelectedId(item._id);
                  }}
                >
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDelete(item._id)}>
                  Delete
                </DeleteButton>
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
                $active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </PageInfo>
            ))}
        </PageList>
        <PageButton onClick={handleNextPage}>Next</PageButton>
      </Pagination>

      {isEditFormOpen && (
        <EditTaskForm
          setIsEditFormOpen={setIsEditFormOpen}
          id={selectedId}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {isDeleteFormOpen && (
        <DeleteTaskForm
          setIsDeleteFromOpen={setIsDeleteFormOpen} refresh ={refresh} setRefresh={setRefresh}
          id={selectedId}
        />
      )}

      <Toaster position="bottom-right" richColors closeButton duration={3000} />
    </Container>
  );
}

export default App;

/* 🎨 Styled Components */
const Container = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;
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
  margin-bottom: 10px;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 16px;
  border: 2px solid #007bff;
  border-radius: 8px;
  background-color: ${({ $active }) => ($active ? "#007bff" : "white")};
  color: ${({ $active }) => ($active ? "white" : "#007bff")};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "#0062cc" : "rgba(0, 123, 255, 0.1)"};
  }

  &:active {
    transform: scale(0.96);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 16px;
  background: ${({ $completed }) => ($completed ? "#d4edda" : "#ffffff")};
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  }
`;

const Index = styled.span`
  font-weight: bold;
  color: #555;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TaskTitle = styled.p`
  font-weight: 600;
  margin: 0;
  color: ${({ $completed }) => ($completed ? "#555" : "#222")};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
`;

const TaskDesc = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const CompletedDate = styled.p`
  font-size: 12px;
  color: #333;
`;

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

  &:active {
    transform: scale(0.96);
  }
`;

const PageList = styled.div`
  display: flex;
  gap: 10px;
`;

const PageInfo = styled.p`
  font-size: 16px;
  color: ${({ $active }) => ($active ? "blue" : "#333")};
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
`;
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  }
`;

const FormTitle = styled.h3`
  text-align: center;
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 8px;
`;



const AddButton = styled.button`
  background-color: green;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;

  &:hover {
    scale: 1.2;
  }

  &:active {
    transform: scale(0.97);
  }
`;
