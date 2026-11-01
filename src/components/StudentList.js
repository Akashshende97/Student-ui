import React, { useEffect, useState } from "react";
import { getStudents, createStudent } from "../Services/studentService";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await getStudents();
    setStudents(result.data);
  };

  const handleAddStudent = async () => {
    const student = {
      name: name,
      email: email,
    };

    await createStudent(student);

    setName("");
    setEmail("");
    setShowPopup(false);

    loadStudents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>

      <button onClick={() => setShowPopup(true)}>Add Student</button>

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            boxShadow: "0px 0px 10px gray",
          }}
        >
          <h3>Add Student</h3>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />
          <br />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <br />

          <button onClick={handleAddStudent}>Save</button>

          <button
            onClick={() => setShowPopup(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentList;
