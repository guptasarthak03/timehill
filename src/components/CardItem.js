import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardDetail from './CardDetail';
import AlertModal from '../utility/AlertModal';
import { useEffect } from 'react';

const CardItem = ({ title, data, index, handleDeleteCardBtn }) => {
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  // useEffect(() => {
  // used for testing
  //   console.log(deletePopup, '<-- del popup');
  // }, [deletePopup]);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ minWidth: 275, maxWidth: 300, mb: 1.5, mx: 1.5 }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button onClick={() => setShowCardDetail(true)} size="small">
            View
          </Button>
          <Button onClick={() => setDeletePopup(true)} size="small">
            Delete
          </Button>
        </CardActions>
      </Card>
      {showCardDetail && (
        <CardDetail
          setShowCardDetail={setShowCardDetail}
          showCardDetail={showCardDetail}
          title={title}
          data={data}
        />
      )}
      {deletePopup && (
        <AlertModal
          title="You sure want to delete it?"
          actionOnYes={() => handleDeleteCardBtn(index)}
          showModal={deletePopup}
          setShowModal={setDeletePopup}
        />
      )}
    </div>
  );
};

export default CardItem;
