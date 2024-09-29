import { useEffect, useState, useRef } from "react";
import styles from './Add.module.css';

function Add() {
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const timeoutIdRef = useRef(null); // Ref to store the timeout ID so it can be cleared/reset

  function promptAdded() {
    setDisplayPrompt(true);

    // If a timeout is already running, clear it and start a new one
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Set a new timeout to hide the prompt after 3 seconds
    timeoutIdRef.current = setTimeout(() => {
      setDisplayPrompt(false);
      timeoutIdRef.current = null; // Reset the ref after timeout completes
    }, 3000);
  }

  const [formValues, setFormValues] = useState({
    StudentID: '2023XXXX',
    StudentName: 'default',
    StudentAge: 18,
    StudentGWA: 5.00,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: name === "StudentGWA" ? parseFloat(value) : value, // Ensure GWA remains a number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission

    const formData = {
      ...formValues,
    };

    try {
      const response = await fetch('/api/insertStudent', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        setFormValues({
          StudentID: '2023XXXX',
          StudentName: 'default',
          StudentAge: 18,
          StudentGWA: 5.00,
        });
        console.log("Successfully Added!");
      } else {
        console.log("Adding Failed!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.general}>
      <h1>Add Values</h1>
      <section className={styles.section}>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="StudentID">Student ID</label>
            <input id="StudentID" name="StudentID" type="text" value={formValues.StudentID} onChange={handleInputChange} />

            <label htmlFor="StudentName">Student Name</label>
            <input id="StudentName" name="StudentName" type="text" value={formValues.StudentName} onChange={handleInputChange} />

            <label htmlFor="StudentAge">Age</label>
            <input id="StudentAge" name="StudentAge" type="number" min={0} max={1000} value={formValues.StudentAge} onChange={handleInputChange} />

            <label htmlFor="StudentGWA">GWA</label>
            <input id="StudentGWA" name="StudentGWA" type="number" step="0.01" value={formValues.StudentGWA} onChange={handleInputChange} />

            <input onClick={promptAdded} type="submit" />
          </form>
        </div>
      </section>

      <a className={styles.returnHome} href="/home">Return home</a>

	  {displayPrompt && (
        <p className={styles.promptAdded}>Student Added Successfully!</p>
      )}

    </div>
  );
}

export default Add;
