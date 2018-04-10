import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  constructor(props) {
    super(props);
    console.log("[Persons.js] inside constructor", props);
  }

  componentWillMount() {
    console.log("[Persons.js] inside componentWillMount");
  }

  componentDidMount() {
    console.log("[Persons.js] inside componentDidMount");
  }

  componentWillReceiveProps(nextProps) {
    console.log("[UPDATE Persons.js] inside componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[UPDATE Persons.js] inside shouldComponentUpdate ");
    return (
      nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked
    );
    //return true;
  }
  componentDidUpdate() {
    console.log("UPDATE [Persons.js] inside componentDidUpdate");
  }

  render() {
    console.log("[Persons.js] inside render");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          click={() => this.props.clicked(index)}
          position={index}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
