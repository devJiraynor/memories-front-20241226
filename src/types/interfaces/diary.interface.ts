import { Feeling, Weather } from 'src/types/aliases';

export default interface Diary {
  diaryNumber: number;
  writeDate: string;
  title: string;
  weather: Weather;
  feeling: Feeling;
}