import { read } from './httpService';

import IExpenditure from '../interfaces/IExpenditure';

export async function apiGetExpenditureFilterByPeriod(
  from: string
): Promise<IExpenditure[]> {
  const expenditures = await read(`/despesas?mes=${from}&_sort=dia`);
  return expenditures as IExpenditure[];
}
