import { memo } from 'react';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';

import { dateToISOString, ISOStringToDate } from '../helpers/dateHelpers';
import { useNavigate } from 'react-router-dom';

interface ICustomDatePickerProp {
  currentPeriod: string;
  view?: ['year', 'month', 'day'] | ['year', 'month'] | ['year'];
  label?: string;
}

export const CustomDatePicker = memo(
  ({
    currentPeriod,
    view = ['year', 'month'],
    label = '',
  }: ICustomDatePickerProp) => {
    const date = ISOStringToDate(currentPeriod);

    const navigate = useNavigate();
    function handleDateChange(date: Date | null) {
      if (date) {
        const month = dateToISOString(date).substring(0, 7);
        navigate('/expenditures/' + month);
      }
    }

    return (
      <Box component={'div'}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={view}
            label={label}
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={date}
            onChange={newDate => {
              handleDateChange(newDate);
            }}
            renderInput={params => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
      </Box>
    );
  }
);
