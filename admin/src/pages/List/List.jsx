import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function List({url}) {
  const [list,setList] = useState([]);

  const fetchList =async () => {
    try {
        const response = await axios.get(`${url}/api/food/list`);
        if(response.data.success){
          setList(response.data.data);
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
      if(response.data.success){
        await fetchList();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, [ ]);
  return (
    <div className='list add flex-col'>
        <p>All Foods Lists</p>
        <div className="list-table">
          <div className="list-table-format">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=> {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/${item.image}`} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className='cursor' onClick={()=>removeFood(item._id)}>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
