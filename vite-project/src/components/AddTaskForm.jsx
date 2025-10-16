import styled from "styled-components";
import { OverLayer } from "./EditTaskForm";
import { addNewTask } from "../api/Api";
import { useState } from "react";
import { toast } from "sonner";

const AddTaskForm = ({
  setIsAddFormOpen,
  setRefresh,
  refresh,
  setCurrentPage,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const handleAddNewTask = () => {
    if (!title.trim()) return;
    addNewTask({ title, desc }).then((res) => {
      setIsAddFormOpen(false);
      toast.success("Task added successfully");
      setRefresh(!refresh);
      setCurrentPage(1);
    });
  };
  return (
    <OverLayer onClick={() => setIsAddFormOpen(false)}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <FormTitle>Add Task</FormTitle>
        <FormInput
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={handleTitleChange}
        />
        <FormInput
          type="text"
          placeholder="Enter task description"
          value={desc}
          onChange={handleDescChange}
        />
        <AddButton onClick={handleAddNewTask}>Add Task</AddButton>
      </FormContainer>
    </OverLayer>
  );
};

export default AddTaskForm;

/* 🎨 Styled Components */
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

const FormInput = styled.input`
  padding: 10px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: scale(0.97);
  }
`;
