export default interface IExpenditure {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IResume {
  detail: string;
  value: number;
}
