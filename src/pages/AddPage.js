import React, { useState } from 'react';
import { render } from 'react-dom';
import { useNavigate } from "react-router-dom";

import sendAsync from '../message-control/renderer';

const AddPage = () => {

 const [group, setGroup] = useState("");
 const [itemKey, setItemKey] = useState("");
 const [itemValue, setItemValue] = useState("");
 const navigate = useNavigate();

 const handleSubmit = (evt) => 
 {
    evt.preventDefault();
    console.log(`Submitting Name ${group}`);
    let sql = `insert into 'quick-access' (itemName, itemValue, groupName) values ('${itemKey}', '${itemValue}', '${group}')`
    sendAsync(sql).then((result) => {
      console.log("result ", result)
      navigate('/');
    });
 }

 return (
   <div>
        <div className="title">
            <h1>Quick Access</h1>
        </div>

     <div className="container">Enter the data</div>

     <div style={{width: '90vw', height: '80vh'}}>
     <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input type="text" value={group} onChange={e => setGroup(e.target.value)} />
        </label>
        <br />
        <label>
          Item Key:
          <input type="text" value={itemKey} onChange={e => setItemKey(e.target.value)} />
        </label>
        <br />
        <label>
          Item Value:
          <input type="text" value={itemValue} onChange={e => setItemValue(e.target.value)} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
     </div>
     
   </div>
 );
};

export default AddPage;