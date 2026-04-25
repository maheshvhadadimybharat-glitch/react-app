export interface UserProps {
  id: number,
  name: string,
  lastname: string,
  status: string,
} 

// You can even export function types!
export type DeleteHandler = (id: number) => void;