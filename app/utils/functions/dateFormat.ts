import { format } from 'date-fns';
export const dateFormat = (date: string) => {
  if (date) {
    var newDate: any = format(new Date(date), 'yyyy-MM-dd');
  }

  return newDate || '';
};
