import { useEffect, useState } from "react";

import styles from './PopUp.module.css';

function PopUp() {



	return(
		<>
			<section>
				<h1>Update Values</h1>
				<div>
					<form action="">
						<input type="text"/>
						<input type="text"/>
						<input type="number" min={0} max={1000}/>
						<input type="text" />
					</form>
				</div>
			</section>


		</>
	)
}

export default PopUp