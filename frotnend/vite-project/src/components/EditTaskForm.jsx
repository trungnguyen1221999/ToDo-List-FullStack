import { useEffect, useState } from "react";
import styled from "styled-components";
import { editTaskApi, getProductById } from "../api/Api";
import { toast } from "sonner";
const EditTaskForm = ({ setIsEditFormOpen, id , refresh, setRefresh}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("active");
  useEffect(() => {
    getProductById(id).then((res) => {
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setStatus(res.data.status);
    });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    editTaskApi(id, { title, desc, status }).then((res) => {
      setIsEditFormOpen(false);
      setRefresh(!refresh)
      toast.success("Task updated successfully");
    });
  };

  return (
    <OverLayer onClick={() => setIsEditFormOpen(false)}>
      <Styled onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Update your title"
            value={title}
            onChange={handleTitleChange}
          />
          <input
            type="text"
            name="desc"
            placeholder="Update your description"
            value={desc}
            onChange={handleDescChange}
          />
          <Action>
            <input
              onClick={() => setStatus("active")}
              type="radio"
              id="active"
              name="status"
              value="active"
            />
            <label htmlFor="active">Active</label>
            <br />
            <input
              onClick={() => setStatus("completed")}
              type="radio"
              id="completed"
              name="status"
              value="completed"
            />
            <label htmlFor="completed">Completed</label>
          </Action>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Update
          </button>
        </form>
      </Styled>
    </OverLayer>
  );
};

export default EditTaskForm;

export const OverLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  z-index: 10;
  border-radius: 8px;
  width: 80%;
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
  }
  input {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px;
    background: #ffc107;
    color: white;
    border: none;
  }
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;
