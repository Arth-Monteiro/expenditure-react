import { create, read } from './httpService';

import IExpenditure from '../interfaces/IExpenditure';
import IUser from '../interfaces/IUser';

export async function apiGetExpenditureFilterByPeriod(
  from: string
): Promise<IExpenditure[]> {
  try {
    const expenditures = await read(`/despesas?mes=${from}&_sort=dia`);
    return expenditures as IExpenditure[];
  } catch (e) {
    return [] as IExpenditure[];
  }
}

export async function apiCheckAuthUser(): Promise<IUser | null> {
  try {
    const user = await read('/sessao/usuario');
    return user as IUser;
  } catch (e) {
    return null;
  }
}

export async function apiMakeLogin(
  email: string,
  pwd: string
): Promise<IUser | null> {
  try {
    const userLogin = await create('/sessao/criar', {
      email: email,
      senha: pwd,
    });
    return userLogin as IUser;
  } catch (e) {
    return null;
  }
}

export async function apiMakeLogout(): Promise<Object | null> {
  try {
    const userLogout = await create('/sessao/finalizar', {});
    return userLogout;
  } catch (e) {
    return null;
  }
}
