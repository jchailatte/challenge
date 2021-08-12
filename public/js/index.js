'use strict';

const App = () => {

    const [users, setUsers] = React.useState([]);
    const [ageDemo, setAgeDemo] = React.useState({});
    const [items, setItems] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("__")

    //fetching user and item data
    React.useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(response => {
                if (!response.ok) {
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setUsers(data);
            })
            .catch(error => {
                console.log(error);
            })

        fetch("http://localhost:3000/items")
            .then(response => {
                if (!response.ok) {
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    //fetching user/age data everytime an item gets selected
    React.useEffect(() => {
        fetch("http://localhost:3000/users/age?item=" + selectedItem)
            .then(response => {
                if (!response.ok) {
                    throw Error("Error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setAgeDemo(data);
            })
            .catch(error => {
                console.log(error);
            })

        console.log(selectedItem)
    }, [selectedItem])

    return (
        <React.Fragment>
            <div className="container">
                <div>
                    <h1><b>All Users</b></h1>
                    <h3>Users and their ages</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => {
                                return (
                                    <tr key={"user" + i}>
                                        <td>{user.username}</td>
                                        <td>{user.age}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1><b>Age Demographic of Users with {selectedItem}</b></h1>
                    <div 
                        className="itemSelect"
                    >
                        <select
                            value="none"
                            onChange={(e) => setSelectedItem(e.target.value)}
                        >
                            <option value="none" disabled hidden>
                                Items
                            </option>
                            {items.map((item, i) => {
                                return (
                                    <option
                                        key={"item" + i}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <table
                        className="table"
                    >
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(ageDemo).map((entry, i) => {
                                return (
                                    <tr key={"user" + i}>
                                        <td>{entry[0]}</td>
                                        <td>{entry[1]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);