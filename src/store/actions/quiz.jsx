import {AxiosInstance as axios} from "axios";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes () {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quiz.json')
            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quiz) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quiz
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}