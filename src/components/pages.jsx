import React, { useState, useEffect } from "react";
import axios from "axios";

function Xpages() {
  const [employeeData, setEmployeeData] = useState("");
  const [count, setCount] = useState(1);

  const itemsPerPage = 10;

  const start = count * itemsPerPage;
  const end = start + itemsPerPage;

    const currentData = employeeData.slice(start, end);
    const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        console.log(res);
        setEmployeeData(res.data);
      } catch (error) {
          console.error("Error fetching data:", error);
          alert("failed to fetch data")
      }
    };
    fetchdata();
  }, []);

  const handleincre = () => {
    if (count <= 4) {
      setCount(count + 1);
    }
  };

  const handledecre = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <h2>Employee Data Table</h2>

      <div>
        <table style={{border:"1px solid black"}}>
          <thead style={{backgroundColor: "green", color:"white", }}>
            <tr>
              <th style={{width:"200px", padding:"20px"}}>ID</th>
              <th style={{width:"200px"}}>Name</th>
              <th style={{width:"200px"}}>Email</th>
              <th style={{width:"200px"}}>Role</th>
            </tr>
          </thead>
          {employeeData && (
            <tbody>
              {currentData.map((value, key) => (
                <tr key={key}>
                  <td style={{ padding:"10px", border:"1px solid gray"}}>{value.id}</td>
                  <td style={{border:"1px solid gray"}}>{value.name}</td>
                  <td style={{border:"1px solid gray"}}>{value.email}</td>
                  <td style={{border:"1px solid gray"}}>{value.role}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div style={{padding:"10px"}}>
        <button onClick={handledecre} disabled={count === 0} style={{backgroundColor:"green", color:"white", border:"none" ,padding:"8px", marginRight:"10px"}}>Previous</button>
        <button style={{backgroundColor:"green", color:"white",border:"none",padding:"10px",marginRight:"10px"}}>{count}</button>
        <button onClick={handleincre} disabled={count >= totalPages - 1} style={{backgroundColor:"green", color:"white", border:"none", padding:"8px",marginRight:"10px"}}>Next</button>
      </div>
    </div>
  );
}
export default Xpages;
