import { useEffect, useState } from "react";
import { getAllList, getListLimitPage } from "./api/Api";
import styled from "styled-components";
function App() {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;
  useEffect(() => {
    getAllList().then((res) => setList(res.data));
  }, []);
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
      <List>
        {list &&
          list
            .slice((currentPage - 1) * limit, currentPage * limit)
            .map((item, index) => (
              <ListItem key={item._id}>
                <Index>{(index + 1 + (currentPage - 1) * limit)}.</Index>
                <Content>
                  <TaskTitle>{item.title}</TaskTitle>
                  <TaskDesc>{item.description}</TaskDesc>
                </Content>
              </ListItem>
            ))}
      </List>
      <Pagination>
        <PageButton onClick={handlePrevPage}>Previous</PageButton>
        <PageList>
          {Array(totalPages)
            .fill()
            .map((_, i) => (
              <PageInfo key={i} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PageInfo>
            ))}
        </PageList>
        <PageButton onClick={handleNextPage}>Next</PageButton>
      </Pagination>
    </Container>
  );
}

export default App;

/* 🎨 Styled Components */
const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 20px;
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
  align-items: flex-start;
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
