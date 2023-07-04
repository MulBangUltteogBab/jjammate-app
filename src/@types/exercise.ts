export type ExerciseType = {
  id: number;
  title: string;
  tags: string[];
  icon: string;
  explains: string[];
  sets: string[];
};

export type WorriorType = {
  id: number;
  title: string;
  state: string;
  count: number;
  icon: string;
  time: number;
};
