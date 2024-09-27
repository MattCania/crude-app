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
			window.location.reload();
			// Remove the deleted student from the state
			setResult(result.filter(student => student.student_id !== id));
		  } else {
			alert('Error deleting the student.');
		  }
		} catch (error) {
		  console.error('Error:', error);
		  alert('Error deleting the student.');
		}
	  };

	const alertUser = (userId) => {
		alert(`Alerted User ${userId}`)
	}

	return (
		<>
			<Header/>

			{(typeof result === 'undefined') ? 
			<p>Loading...</p> :
			
			<section className={styles.section}>
			<a href="/popup">Add Values</a>

			<h1 className={styles.tableTitle}>BSIT-2B</h1>
			
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
						<tr key={student.id}>
							<td>{student.id}</td>
							<td>{student.student_id}</td>
							<td>{student.student_name}</td>
							<td>{student.age}</td>
							<td>{student.GWA}</td>
							<td><button className={styles.tdButton_update} onClick={ () => alertUser(student.student_id)}>update</button></td>
							<td><button className={styles.tdButton_delete} onClick={ () => deleteStudent(student.id)} >delete</button></td>
						</tr>
					))}
				</tbody>
			</table>
			</section>
			}


			<Footer/>
		</>
	);
}

export default Home