import React, { useEffect, useState } from 'react';
import './App.css';
import Fab from '@mui/material/Fab';
import CardItem from './components/CardItem';
import FormCreateItem from './components/FormCreateItem';

function App() {
  const [itemId, setItemId] = useState(0);
  const [userData, setUserData] = useState([]);
  const [showForm, setShowForm] = React.useState(false);

  // useEffect(() => {
  //   // testing purposes
  //   // console.log(userData, '<-- user data');
  // }, [userData]);
  // console.log(userData, '<-- user data on render');

  const updateUserData = data => {
    setUserData(data);
    window.localStorage.setItem('userData', JSON.stringify(data));
  };

  const handleDeleteCardBtn = index => {
    // delete from data
    const userDataArr = userData;
    userDataArr.splice(index, 1);

    // render on screen
    updateUserData([...userDataArr]);
  };

  useEffect(() => {
    const storedData = window.localStorage.getItem('userData');
    storedData && setUserData(JSON.parse(storedData));
  }, []);

  return (
    <div className="App">
      <h1>TimeHill ⏳</h1>
      <Fab
        onClick={() => setShowForm(true)}
        size="medium"
        color="secondary"
        aria-label="add"
      >
        +
      </Fab>
      <br /> <br /> <hr /> <br /> <br />
      {userData.length > 0 &&
        userData.map((user, index) => {
          return (
            <CardItem
              key={user.title}
              title={user.title}
              data={user}
              index={index}
              handleDeleteCardBtn={handleDeleteCardBtn}
            />
          );
        })}
      {showForm && (
        <FormCreateItem
          handleFormClose={() => setShowForm(false)}
          showForm={showForm}
          userData={userData}
          itemId={itemId}
          setItemId={setItemId}
          updateUserData={updateUserData}
        />
      )}
    </div>
  );
}

export default App;
