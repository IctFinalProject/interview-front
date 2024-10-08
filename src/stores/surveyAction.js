//action.js
export const actionSetName = (name) => ({
    type: 'USER_NAME',
    name,
});

export const actionSetGender = (gender) => ({
    type: 'USER_GENDER',
    gender,
});

export const actionGetQuestion = (questions) => ({
    type: 'GET_QUESTION',
    questions,
});

export const actionSetAnswer = (answer, index) => ({
    type: 'SET_ANSWER',
    answer,
    index,
});

export const actionSetJob = (job) => ({
    type: 'USER_JOB',
    job,
});

export const actionSetMajor = (major) => ({
    type: 'USER_MAJOR',
    major,
});

export const actionSetResult = (bestAbility, worstAbility,bestSecondAbility,worstSecondAbility,bestWonScoreIndex,bestSecondWonScoreIndex,wonScore) => ({
    type: 'SET_RESULT',
    bestAbility,
    worstAbility,
    bestSecondAbility,
    worstSecondAbility,
    bestWonScoreIndex,
    bestSecondWonScoreIndex,
    wonScore
});

export const init = () => ({
    type: 'init',
});