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
  const [isFutureTimer, setFutureTimer] = useState(true);
  const [timer, setTimer] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  const formatTime = unit => {
    unit = Math.abs(unit); // only postive number (in case of past timer)
    return unit > 9 ? unit : '0' + unit;
  };

  const calcCounter = total => {
    let secs, mins, hrs, days;
    let closest = total > 0 ? Math.floor : Math.ceil; // future | past: funcitonal chaining

    // ms, sec => ms/1000, mins => secs/60, hrs => mins/60, days => hrs/24,
    secs = closest((total / 1000) % 60);
    mins = closest((total / 1000 / 60) % 60);
    hrs = closest((total / 1000 / 60 / 60) % 24);
    days = closest(total / 1000 / 60 / 60 / 24);

    // formattng time for rendering
    secs = formatTime(secs);
    mins = formatTime(mins);
    hrs = formatTime(hrs);
    days = formatTime(days);

    return {
      days,
      hrs,
      mins,
      secs,
    };
  };

  const updateTimer = date => {
    const total = Date.parse(date) - Date.parse(new Date());
    let counter = calcCounter(total);
    setTimer(counter);

    // if past counter
    if (total < 0) {
      setFutureTimer(false);
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
        {isFutureTimer ? 'Time Left' : 'Time Since'}
      </h1>
      <h1 style={{ textAlign: 'center', color: '#1F8A70' }}>
        {`${timer.days} days, ${timer.hrs}:${timer.mins}:${timer.secs}`}
      </h1>
    </Dialog>
  );
};

export default CardDetail;
