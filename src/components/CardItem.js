import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CardItem = ({ title }) => {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ minWidth: 275, maxWidth: 400, mb: 1.5, mx: 1.5 }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">See Card</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default CardItem;
