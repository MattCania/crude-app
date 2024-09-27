import { useEffect, useState } from "react";

import styles from './PopUp.module.css';

function PopUp() {


	const [formValues, setFormValues] = useState({
		StudentID: 'default',
		StudentName: 'default',
		StudentAge: 19,
		StudentGWA: 5.00,
	  });
	
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues(prevValues => ({
		  ...prevValues,
		  [name]: value,
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
		  
		  
		  const result = await response.json();
		  console.log(result);
		  window.location.reload();
		  console.log('worked')
		} catch (error) {
		  console.error('Error:', error);
		}
	  };

	return(
		<>
			<a href="/home">Return home</a>
			<h1>Add/Update Values</h1>
			<section className={styles.section}>
				<div>
					<form onSubmit={handleSubmit}>
						<label htmlFor="StudentID">Student ID</label>
						<input id="StudentID" name="StudentID" type="text" value={formValues.StudentID} onChange={handleInputChange}/>
						<label htmlFor="StudentName">Student Name</label> 
						<input id="StudentName" name="StudentName" type="text" value={formValues.StudentName} onChange={handleInputChange}/>
						<label htmlFor="StudentAge">Age</label>
						<input id="StudentAge" name="StudentAge" type="number" min={0} max={1000} value={formValues.StudentAge} onChange={handleInputChange}/>
						<label htmlFor="StudentGWA">GWA</label>
						<input id="StudentGWA" name="StudentGWA" type="text" value={formValues.StudentGWA} onChange={handleInputChange}/>

						<input type="submit" />
					</form>
				</div>
			</section>


		</>
	)
}

export default PopUp