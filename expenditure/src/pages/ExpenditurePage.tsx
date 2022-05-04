import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { CustomDatePicker } from '../components/CustomDatePicker';
import { ExpenditureDetails } from '../components/ExpenditureDetails';
import { ExpenditureResume } from '../components/ExpenditureResume';
import Header from '../components/Header';

import IExpenditure, { IResume } from '../interfaces/IExpenditure';

import { apiGetExpenditureFilterByPeriod } from '../services/apiService';

export default function ExpenditurePage() {
  const { month } = useParams<{ month: string }>();

  const [tabValue, setTabValue] = useState<string>('resumeTab');
  const [expenditure, setExpenditure] = useState<IExpenditure[]>([]);
  const [soma, setSoma] = useState<number>(0);
  const [resume, setResume] = useState<IResume[]>([]);

  useEffect(() => {
    if (month) {
      (async () => {
        const getExpenditures = await apiGetExpenditureFilterByPeriod(month);
        const getResume = generateResume(getExpenditures);
        setExpenditure(getExpenditures);
        setResume(getResume);
      })();
    }
  }, [month]);

  function generateResume(expenditures: IExpenditure[]): IResume[] {
    const resume: IResume[] = [];

    for (let i = 0; i < expenditures.length; i++) {
      const detail = expenditures[i].categoria;
      const value = expenditures[i].valor;

      const find = resume.find(r => r.detail === detail);
      if (find) find.value += value;
      else resume.push({ detail, value });
    }

    return resume.sort((a, b) => b.value - a.value);
  }

  useEffect(() => {
    if (expenditure && expenditure.length > 0) {
      const total = Object.values(expenditure.map(e => e.valor)).reduce(
        (a, b) => a + b
      );
      setSoma(total);
    }
  }, [expenditure]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  if (!month || expenditure.length === 0) {
    return (
      <Box textAlign={'center'} padding={'25%'}>
        There's nothing to show!
      </Box>
    );
  }

  return (
    <Box>
      <Header>Expenditures</Header>
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
      <Box sx={{ typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              borderColor: 'divider',
            }}
          >
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Resume" value="resumeTab" />
              <Tab label="Details" value="detailsTab" />
            </TabList>
          </Box>
          <TabPanel value="resumeTab">
            <Box sx={{ m: 1 }}>
              <ExpenditureDetails expenditures={expenditure} />
            </Box>
          </TabPanel>
          <TabPanel value="detailsTab">
            <Box sx={{ m: 1 }}>
              <ExpenditureResume resume={resume} />
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}
