import React, {Component} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes}  from '../../store/actions/quiz';
import axios from '../../Axios/axios-quiz';


class QuizList extends Component {

    state = {
        quiz: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quiz.map(quiz => {
            return(
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try{
            const response = await axios.get('/quiz.json')

            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })
            this.setState({
                quiz,
                loading: false
            })
        } catch(e){
            console.log(e)
        }
        
    }


    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.state.loading 
                        ? <Loader/>
                        : <ul>
                                { this.renderQuizes() }
                          </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
     return {
         fetchQuizes: () => dispatch(fetchQuizes())
     }
}

export default connect(mapStateToProps, mapDispatchToProps) (QuizList)