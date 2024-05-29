export type TMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TName = "Autumn" | "Summar" | "fall";
export type TCode = "01" | "02" | "03";

export type TacademicSemester = {
  name: TName;
  code: TCode;
  year: string;
  startMonth: TMonth;
  endMonth: TMonth;
};
