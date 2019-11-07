import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link white lighten-3">
                <div className="card-content grey-text text-darken-3 ">
                    <span className="description">{item.description} </span>
                    <span className = "due_date"> {item.due_date}</span>

                    {/* {/* <span className='completed'> {item.completed == true &&<span>Completed</span>} </span>
                    <span className= 'not_completed'> {item.completed == false && <span>Pending</span>}
                    </span> */}
                    {/* { item.completed ? <span> className = "completed"</span>: <span> className = "not_completed </span>} */} 
                    <span className = "completed"> {item.completed ? "Completed": "Pending"}</span>
                    <div className="assigned">Assigned to: {item.assigned_to}</div>

                </div>
            </div>
        );
    }
}
export default ItemCard;