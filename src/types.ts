export interface Form {
  userInput: string;
  selectLang: string[];
}
export interface Result {
  id: string;
  language: string;
  result: string;
  status: number;
}

export interface Optional {
  errorRetryId: string;
  errorRetryText: string;
}
