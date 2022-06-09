import { format } from 'date-fns';
export const dateFormat = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy-MM-dd');
  }

  return newDate || '';
};

export const dateFormat1 = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'dd/MM/yyyy');
  }

  return newDate || '';
};

export const getTime = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'hh:mm a');
  }

  return newDate || '';
};
export const getMonth = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'LLLL');
  }

  return newDate || '';
};

export const getDay = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'd');
  }

  return newDate || '';
};

export const getDayName = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'EEEE');
  }

  return newDate || '';
};

export const getYear = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy');
  }

  return newDate || '';
};

export const monthLLLDayDD = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'MMM dd');
  }

  return newDate || '';
};
