import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useRef } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CardDetail = props => {
  const Ref = useRef(null);
  const { showCardDetail, setShowCardDetail, title, data } = props;
  const [timer, setTimer] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  const calcTime = e => {
    const total = Date.parse(e) - Date.parse(new Date());
    const secs = Math.floor((total / 1000) % 60);
    const mins = Math.floor((total / 1000 / 60) % 60);
    const hrs = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / 1000 / 60 / 60 / 24);

    // ms, sec => ms/1000, mins => secs/60, hrs => mins/60, days => hrs/24,
    return {
      total,
      days,
      hrs,
      mins,
      secs,
    };
  };

  const updateTimer = date => {
    let { total, days, hrs, mins, secs } = calcTime(date);

    if (total >= 0) {
      secs = secs > 9 ? secs : '0' + secs;
      mins = mins > 9 ? mins : '0' + mins;
      hrs = hrs > 9 ? hrs : '0' + hrs;
      days = days > 9 ? days : '0' + days;
      setTimer({ days, hrs, mins, secs });
    }
  };

  const startTimer = date => {
    const interval = setInterval(() => updateTimer(date), 1000);
    Ref.current = interval;
  };

  useEffect(() => {
    updateTimer(data.dateTime);
  }, []);

  useEffect(() => {
    startTimer(data.dateTime);
    return () => {
      clearInterval(Ref.current);
    };
  });

  const handleClose = () => {
    setShowCardDetail(false);
  };

  return (
    <Dialog
      fullScreen
      open={showCardDetail}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <h1 style={{ textAlign: 'center' }}>
        {`${timer.days} days, ${timer.hrs}:${timer.mins}:${timer.secs}`}
      </h1>
    </Dialog>
  );
};

export default CardDetail;
