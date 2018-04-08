import React, { Component } from "react";
import logo from "./logo.svg";
import classes from "./App.css";
import Person from "./Person/Person";

class App extends Component {
	state = {
		person: [
			{ id: "qwe", name: "max", age: "30" },
			{ id: "asd", name: "medina", age: "29" },
			{ id: "zxc", name: "alex", age: "32" }
		],
		showPersons: false
	};
	switchNameHandler = newName => {
		this.setState({
			person: [
				{ name: newName, age: "30" },
				{ name: "medina", age: "29" },
				{ name: "alex", age: "32" }
			]
		});
	};

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.person.findIndex(p => {
			return p.userId === id;
		});
		// const person = this.state.person[personIndex]; //don't mutate like this
		const newPersonObj = {
			...this.state.person[personIndex] //creates new obj with prev properties
		};
		// const person = Object.assign({}, this.state.person[personIndex]); // alternative
		newPersonObj.name = event.target.value;
		const newPersonArr = [...this.state.person];
		newPersonArr[personIndex] = newPersonObj;

		this.setState({ person: newPersonArr });
	};

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({ showPersons: !doesShow });
	};
	deletePersonHandler = personIndex => {
		// const persons = this.state.person; does not create copy
		// const persons = this.state.person.slice(); creates copy
		const persons = [...this.state.person]; // best approach
		persons.splice(personIndex, 1);
		this.setState({ person: persons });
	};

	render() {
		let persons = null;
		let btnClass = "";

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.person.map((person, index) => {
						return (
							<Person
								click={() => this.deletePersonHandler(index)}
								name={person.name}
								age={person.age}
								key={person.id}
								changed={event => this.nameChangedHandler(event, person.id)}
							/>
						);
					})}
				</div>
			);
			btnClass = classes.Red;
		}
		let assignedClasses = [];
		if (this.state.person.length <= 2) {
			assignedClasses.push(classes.red);
		}
		if (this.state.person.length <= 1) {
			assignedClasses.push(classes.bold);
		}
		return (
			<div className={classes.App}>
				<h1> React App </h1>
				<p className={assignedClasses.join(" ")}>This should work</p>
				<button
					className={btnClass}
					onClick={() => this.togglePersonsHandler()}
				>
					Click
				</button>
				{persons}
			</div>
		);
	}
}

export default App;
