import React from 'react'
import { OverLayer } from './EditTaskForm'
import { deleteListById } from '../api/Api';
import { toast } from 'sonner';

const DeleteTaskForm = ({ setIsDeleteFromOpen, id , refresh, setRefresh}) => {
    const handleDelete = () => {
        // Call the delete API here
        deleteListById(id)
        setIsDeleteFromOpen(false);
        setRefresh(!refresh)
        toast.success("Task deleted successfully");
    };
  return (
    <OverLayer onClick={() => setIsDeleteFromOpen(false)}>
        <div onClick={(e)=> e.stopPropagation()} style={{backgroundColor: "white", padding: "20px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center"}}>
            <h2>Are you sure to delete this task?</h2>
            <div style={{display: "flex", gap: "20px", justifyContent: "center"}}>
                <button style={{padding: "10px", borderRadius: "10px", cursor: "pointer", backgroundColor: "green" , color :"white"}} onClick={() => setIsDeleteFromOpen(false)}>Cancel</button>
                <button style={{padding: "10px", borderRadius: "10px", cursor: "pointer", backgroundColor: "red" , color :"white"}} onClick={handleDelete}>Confirm</button>
            </div>
        </div>
      
    </OverLayer>
  )
}

export default DeleteTaskForm
