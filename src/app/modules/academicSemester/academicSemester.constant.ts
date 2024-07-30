import { TAcademicSemesterNameCodeMapper, TCode, TMonth, TName } from "./academicSemester.interface";

export const AcademicSemesterMonths : TMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  export const AcademicSemesterName : TName[]=[
    "Autumn", "Summer", "Fall"
]
export const AcademicSemesterCode :TCode[]=["01", "02", "03"]

export const academicSemesterNameCodeMapper :TAcademicSemesterNameCodeMapper={
  Autumn:"01",
  Summer:"02",
  Fall:"03",
}
