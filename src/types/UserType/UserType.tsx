export interface UserProps {
  id: number,
  name: string,
  lastname: string,
  status: string,
  created_at?: string
} 

// You can even export function types!
export type DeleteHandler = (user: UserProps) => void;

export type ToggleStatusHandler = (id: number) => void;

