import {useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import Header from '../../partials/Header/Header';
import Footer from '../../partials/Footer/Footer';
import loadBar from '../../assets/circles.svg';

function Home (){
	const [displayPrompt, setDisplayPrompt] = useState(false);
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const timeoutIdRef = useRef(null); // Use a ref to store the timeout ID

	const promptAdded = () => {
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
	};

	useEffect(() => {
		fetch('/api/home')
			.then(res => res.json())
			.then(result => setResult(result))
			.catch(err => console.error(err))
	}, []);

	const deleteStudent = async (id) => {
		try {
			setDisplayPrompt(false)
			setDisable(true)
			setLoading(true)

		  const response = await fetch(`/api/delete/${id}`, {
			method: 'DELETE',
		  });
		  
		  if (response.ok) {

		  } else {
			alert('Error deleting the student.');
		  }
		} catch (error) {
		  console.error('Error:', error);
		  alert('Error deleting the student.');
		} finally {
			setLoading(false);
			const updatedData = await fetch('/api/home')
			.then(res => res.json())
			.catch(err => console.error(err));
			promptAdded()
			setDisable(false)
		  	setResult(updatedData);

			if ((prevResult) => prevResult.filter(student=> student.id !== id)){
				setResult((prevResult) => prevResult.filter(student => student.id !== id));
			}
		}
	  };

	const alertUser = (userId) => {
		alert(`Alerted User ${userId} (This function is in development)`)
	}

	//Update Values


	return (
		<>
			<Header/>

			{displayPrompt && (
        		<p className={styles.promptAdded}>Student Deleted Successfully!</p>  
      		)}

			{loading && (
        		<img className={styles.circles} src={loadBar} alt="loading" /> 
    		)}

			{(typeof result === 'undefined') ? 
			<img className={styles.circles} src={loadBar} alt="loading" />  :
			
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
							<td><button className={styles.tdButton_update} onClick={ () => alertUser(student.Student_Name)}>update</button></td>
							<td><button disabled={disable} className={styles.tdButton_delete} onClick={ () => deleteStudent(student.ID)} >delete</button></td>
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