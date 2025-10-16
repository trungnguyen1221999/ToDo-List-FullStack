import styled from 'styled-components';

const EditTaskForm = ({ setIsEditFormOpen }) => {
  return (
    <OverLayer onClick={() => setIsEditFormOpen(false)}>
        <Styled onClick={(e) => e.stopPropagation()}>
          <h2>Edit Task</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <input type="text" name="title" placeholder='task1' />
            <input type="text" name="desc" placeholder='Description' />
            <button type="submit">Update</button>
          </form>
        </Styled>
    </OverLayer>
  )
}

export default EditTaskForm


const OverLayer = styled.div`
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
    form{
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
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
`