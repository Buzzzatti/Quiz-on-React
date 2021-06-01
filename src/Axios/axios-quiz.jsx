import axios from 'axios'

export default axios.create({
    baseURL:'https://react-quiz-f644e-default-rtdb.firebaseio.com/'
})