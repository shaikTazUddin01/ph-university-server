  
type Month =
| 'January'
| 'February'
| 'March'
| 'April'
| 'May'
| 'June'
| 'July'
| 'August'
| 'September'
| 'October'
| 'November'
| 'December';


export type AcademicSemester={
    name:'Autumn'|'Summar'|'fall'
    code:'01'|'02'|'3';
     year:Date;
     startMonth: Month;
     endMonth: Month 
}