import React, { useEffect, useState } from 'react';
import './App.css';
import Fab from '@mui/material/Fab';
import CardItem from './components/CardItem';
import FormCreateItem from './components/FormCreateItem';

function App() {
  const [itemId, setItemId] = useState(1);
  const [userData, setUserData] = useState([]);
  const [showForm, setShowForm] = React.useState(false);

  const handleFormClose = () => {
    setShowForm(false);
  };

  const onAddBtnClick = () => {
    // show form to enter data
    setShowForm(true);
  };

  return (
    <div className="App">
      <h1>TimeHill ⏳</h1>
      <Fab
        onClick={onAddBtnClick}
        size="medium"
        color="secondary"
        aria-label="add"
      >
        +
      </Fab>
      <br /> <br /> <hr /> <br /> <br />
      {userData.length > 0 &&
        userData.map(user => {
          return <CardItem key={user.id} title={user.title} data={user} />;
        })}
      {showForm && (
        <FormCreateItem
          handleFormClose={handleFormClose}
          showForm={showForm}
          userData={userData}
          itemId={itemId}
          setUserData={setUserData}
          setItemId={setItemId}
        />
      )}
    </div>
  );
}

export default App;
