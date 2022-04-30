import { format } from 'date-fns';
export const dateFormat = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy-MM-dd');
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

export const getYear = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy');
  }

  return newDate || '';
};