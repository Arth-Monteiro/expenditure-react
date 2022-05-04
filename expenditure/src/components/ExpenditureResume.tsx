import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { memo } from 'react';
import { IResume } from '../interfaces/IExpenditure';

const HEADER = ['Categoria', 'Valor (R$)'];

interface IExpenditureResumeProp {
  resume: IResume[];
}

export const ExpenditureResume = memo(({ resume }: IExpenditureResumeProp) => {
  return (
    <TableContainer style={{ flex: '1' }} component={'div'}>
      {/* Begin Calendar Table */}
      <Table>
        <TableHead>
          <TableRow>
            {HEADER.map((h, index) => (
              <TableCell align="center" key={index}>
                <h3>{h}</h3>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {resume.map((exp, i) => (
            <TableRow key={i}>
              <TableCell align="center">{exp.detail}</TableCell>
              <TableCell align="center">{exp.value.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* End Calendar Table */}
    </TableContainer>
  );
});
