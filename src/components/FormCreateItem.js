import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const FormCreateItem = props => {
  const {
    handleFormClose,
    showForm,
    userData,
    setUserData,
    itemId,
    setItemId,
  } = props;
  const [formData, setFormData] = useState({ title: '', dateTime: new Date() });

  const handleFormSubmit = () => {
    handleFormClose();

    const newId = itemId + 1;
    setItemId(newId);
    setUserData([...userData, { ...formData, id: newId }]);
  };

  useEffect(() => {
    console.log(itemId, '<-- cardId');
  }, [userData]);

  // console.log(value.$d, '<-- date');

  return (
    <Dialog open={showForm} onClose={handleFormClose}>
      <DialogTitle>Enter Memory Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          style={{ marginBottom: '20px' }}
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DateTimePicker
              label="Date&Time picker"
              value={formData.dateTime}
              onChange={value =>
                setFormData({ ...formData, dateTime: value.$d })
              }
              renderInput={params => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormClose}>Cancel</Button>
        <Button onClick={handleFormSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreateItem;
