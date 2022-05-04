import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { memo } from 'react';

import IExpenditure from '../interfaces/IExpenditure';

const HEADER = ['Despesa', 'Categoria', 'Dia', 'Valor (R$)'];

interface IExpenditureDetailsProp {
  expenditures: IExpenditure[];
}

export const ExpenditureDetails = memo(
  ({ expenditures }: IExpenditureDetailsProp) => {
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
            {expenditures.map(exp => (
              <TableRow key={exp.id}>
                <TableCell align="center">{exp.descricao}</TableCell>
                <TableCell align="center">{exp.categoria}</TableCell>
                <TableCell align="center">{exp.dia}</TableCell>
                <TableCell align="center">{exp.valor.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* End Calendar Table */}
      </TableContainer>
    );
  }
);
