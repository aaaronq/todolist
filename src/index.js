import {format, compareAsc} from 'date-fns'

console.log(format(new Date(2014, 1, 11), 'dd/MM/yyyy'));

const dates = [
    new Date (1995, 6, 2),
    new Date (1987, 1, 11),
    new Date (1989, 6, 10),
]

console.log(dates.sort(compareAsc));

console.log(dates[0].getDay());
