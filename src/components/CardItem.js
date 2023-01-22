import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardDetail from './CardDetail';

const CardItem = ({ title, data }) => {
  const [showCardDetail, setShowCardDetail] = useState(false);

  return (
    <div>
      <Card
        variant="outlined"
        sx={{ minWidth: 275, maxWidth: 300, mb: 1.5, mx: 1.5 }}
      >
        <CardContent>
          <Typography variant="h4" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <Button onClick={() => setShowCardDetail(true)} size="small">
            See Card
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
    </div>
  );
};

export default CardItem;
