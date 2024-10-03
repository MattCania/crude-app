import {useState, useEffect} from 'react';
import styles from './Home.module.css';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';

function Home (){
	const [result, setResult] = useState([]);

	useEffect(() => {
		fetch('/api/home')
			.then(res => res.json())
			.then(result => setResult(result))
			.catch(err => console.error(err))
	}, []);

	const deleteStudent = async (id) => {
		try {
		  const response = await fetch(`/api/delete/${id}`, {
			method: 'DELETE',
		  });
		  
		  if (response.ok) {
			// Remove the deleted student from the state
			setResult((prevResult) => prevResult.filter(student => student.id !== id));
			
			fetch('/api/home')
			.then(res => res.json())
			.then(result => setResult(result)) // Update the state with new data
			.catch(err => console.error(err));

		  } else {
			alert('Error deleting the student.');
		  }
		} catch (error) {
		  console.error('Error:', error);
		  alert('Error deleting the student.');
		}
	  };

	const alertUser = (userId) => {
		alert(`Alerted User ${userId} (This function is in development)`)
	}

	//Update Values


	return (
		<>
			<Header/>

			{(typeof result === 'undefined') ? 
			<p>Loading...</p> :
			
			<section className={styles.section}>

			<h1 className={styles.tableTitle}>Student Information</h1>
			
			<table className={styles.table}>
				<thead>
					<tr>
						<td>ID</td>
						<td>Student ID</td>
						<td>Student Name</td>
						<td>Student Age</td>
						<td>Student GWA</td>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{result.map((student) =>(
						<tr key={student.ID}>
							<td>{student.ID}</td>
							<td>{student.Student_Id}</td>
							<td>{student.Student_Name}</td>
							<td>{student.Age}</td>
							<td>{student.GWA.toFixed(2)}</td>
							<td><button className={styles.tdButton_update} onClick={ () => alertUser(student.Student_Id)}>update</button></td>
							<td><button className={styles.tdButton_delete} onClick={ () => deleteStudent(student.ID)} >delete</button></td>
						</tr>
					))}
				</tbody>
			</table>
			<a className={styles.addValues} href="/add">Add Values</a>
			</section>
			}


			<Footer/>
		</>
	);
}

export default Home