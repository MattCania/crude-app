import {useState, useEffect} from 'react';
import styles from './Home.module.css';

function Home (){
	const [result, setResult] = useState([]);

	useEffect(() => {
		fetch('/api/home')
			.then(res => res.json())
			.then(result = setResult(result))
			.catch(err => console.error(err))
	}, []);

	return (
		<>
			<h1>BSIT-2B</h1>
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
				<tbody>
					{result.map(id =>{
						<tr key={id.id}>
							<td>{id.id}</td>
							<td>{id.student_id}</td>
							<td>{id.student_name}</td>
							<td>{id.age}</td>
							<td>{id.student_GWA}</td>
						</tr>
					})}
				</tbody>
			</table>
		</>
	);
}

export default Home