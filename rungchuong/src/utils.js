
import { POINTS, RANKS } from './data';

export const calcScore = (answers) => {
  return answers
    .filter((answer) => answer.correct)
    .reduce((total, answer) => {
      return total + POINTS[answer.level];
    }, 0);
};

export const getRank = (score) => {
  return RANKS.find((rank) => score >= rank.min).title;
};
