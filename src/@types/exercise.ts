export type ExerciseType = {
  id: number;
  title: string;
  tags: string[];
  icon: string;
  explains: string[];
  sets: string[];
};
// {
//   data: [
//     {
//       id: 1,
//       title: '밀리터리 프레스',
//       tag: '이두', // 이두 삼두 등 뭐 부위 암거나 다 적어도됨
//       part: 'body', // body, arm, leg 중 하나
//       explains: [
//         '바벨을 어깨넓이보다 살짝 길게 잡아주고 쇄골에 위치 시켜줍니다.',
//         '위로 수직으로 밀어 올려주는데 이때 턱과 코가 걸릴 수 있기 때문에 바벨 동선을 만들어 주기 위해 고개를 뒤로 살짝 비켜줍니다.',
//         '다시 쇄골로 내려주는데 이때 팔꿈치가 뒤로 빠지지 않도록 주의해줍니다.',
//       ],
//       //   per1set: 10,필요 없음 무조건 10 고정
//       //   burned: 29.4, 이것도 백엔드만 알면됨
//     },
//   ];
// }
export type Exercise = {
  id: number;
  title: string;
  tag: string;
  part: string;
  explains: string[];
  done: boolean;
};

export type WorriorType = {
  title: string;
  state: number;
  record: string;
  icon: string;
};
