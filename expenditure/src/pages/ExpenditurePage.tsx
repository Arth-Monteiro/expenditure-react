import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomDatePicker from '../components/CustomDatePicker';
import ExpenditureData from '../components/ExpenditureData';
import IExpenditure from '../interfaces/IExpenditure';

import { apiGetExpenditureFilterByPeriod } from '../services/apiService';

export default function ExpenditurePage() {
  const { month } = useParams<{ month: string }>();
  const [expenditure, setExpenditure] = useState<IExpenditure[]>([]);
  const [soma, setSoma] = useState<number>(0);

  useEffect(() => {
    if (month) {
      (async () => {
        const getExpenditures = await apiGetExpenditureFilterByPeriod(month);
        setExpenditure(getExpenditures);
      })();
    }
  }, [month]);

  useEffect(() => {
    if (expenditure && expenditure.length > 0) {
      const total = Object.values(expenditure.map(e => e.valor)).reduce(
        (a, b) => a + b
      );
      setSoma(total);
    }
  }, [expenditure]);

  if (!month) {
    return <div>There's nothing to show!</div>;
  }

  return (
    <div>
      <Box
        sx={{
          m: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <CustomDatePicker currentPeriod={month} label={'Year and Month'} />
        <Box>
          Despesa Total:{' '}
          <Box component={'span'} sx={{ fontWeight: 500 }}>
            R$ {soma.toFixed(2)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ m: 1 }}>
        <ExpenditureData expenditures={expenditure} />
      </Box>
    </div>
  );
}
