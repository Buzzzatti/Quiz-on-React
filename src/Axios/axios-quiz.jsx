import axios from 'axios'

export default axios.create({
    baseURL:'https://react-quiz-b7f38-default-rtdb.firebaseio.com/'
})