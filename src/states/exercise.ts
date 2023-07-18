import {atom, selector} from 'recoil';
import {basePost, trigerAtom} from './utils';
import {Exercise, WorriorType} from '../@types/exercise';

interface exerciseDays {
  days: number;
}

export const exerciseDaysSelector = selector<exerciseDays>({
  key: 'getExerciseDays',
  get: ({get}) => {
    const data = get(basePost('/common/api/getselector/'));
    if (data) {
      return data;
    } else {
      return {
        days: 0,
      };
    }
  },
});

const convertDay = (nowDate: Date) => {
  // const nowDate = new Date();
  const date =
    String(nowDate.getFullYear()) +
    '-' +
    String(nowDate.getMonth() + 1) +
    '-' +
    String(nowDate.getDate());
  return date;
};

type WeekRecord = {
  record: {
    [key: string]: {
      run: string;
      pushup: number;
      situp: number;
    };
  };
};

export const weekRecordSelector = selector<WeekRecord>({
  key: 'weekRecordSelector',
  get: ({get}) => {
    const data = get(basePost('/exercise/api/getweekrecordtime/'));
    if (data) {
      return data;
    } else {
      const dummy: WeekRecord = {
        record: {},
      };
      for (let i = 7; i >= 1; i++) {
        var d = new Date();
        var dayOfMonth = d.getDate();
        d.setDate(dayOfMonth - i);
        dummy.record[convertDay(d)] = {
          run: '00:00',
          pushup: 0,
          situp: 0,
        };
      }
      return dummy;
    }
  },
});

interface ExerciseJson {
  data: Exercise[];
}
export const exerciseAtom = atom<ExerciseJson>({
  key: 'exerciseAtom',
  default: undefined,
});

export const exerciseSelector = selector<ExerciseJson>({
  key: 'exerciseSelector',
  get: ({get}) => {
    get(trigerAtom);
    const data = get(basePost('/exercise/api/getexercise/'));
    if (data) {
      return data;
    } else {
      return {
        data: [],
      };
    }
  },
});

export const WorriorAtom = atom<WorriorType[]>({
  key: 'WorriorAtom',
  default: undefined,
});

export const getWorriorSelector = selector<WorriorType[]>({
  key: 'getWorriorSelector',
  get: ({get}) => {
    get(trigerAtom);
    const run = get(basePost('/exercise/api/getruncount/'));
    const situp = get(basePost('/exercise/api/getsitupcount/'));
    const pushup = get(basePost('/exercise/api/getpushupcount/'));
    if (run && situp && pushup) {
      return [
        {
          title: '뜀걸음',
          state: run.runresult,
          record: run.run,
          icon: 'leg',
        },
        {
          title: '윗몸일으키기',
          state: situp.situpresult,
          record: situp.situp,
          icon: 'body',
        },
        {
          title: '팔굽혀펴기',
          state: pushup.pushupresult,
          record: pushup.pushup,
          icon: 'arm',
        },
      ];
    } else {
      return [
        {
          title: '뜀걸음',
          state: 0,
          record: '00:00',
          icon: 'leg',
        },
        {
          title: '윗몸일으키기',
          state: 0,
          record: 0,
          icon: 'body',
        },
        {
          title: '팔굽혀펴기',
          state: 0,
          record: 0,
          icon: 'arm',
        },
      ];
    }
  },
});
