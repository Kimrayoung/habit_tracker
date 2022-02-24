import React, { Component } from 'react';
import Habit from './habit';  //habit컴포넌트를 사용하기 위해서 가져옴
import HabitAddForm from './habitAddForm';

class Habits extends Component {
    state = {
        habits: [  //각각에 habit이라는 오브젝트가 들어있음
            { id: 1, name: 'Reading', count: 0 },
            { id: 2, name: "Running", count: 0 },
            { id: 3, name: "coding", count: 0 },
        ]
    }
    handleIncrement = habit => {
        console.log(`handleIncrement ${habit.name}`);
        const habits = [...this.state.habits];  //새로운 habits라는 배열을 만들어줌(직접적으로 state변경을 하면 안되기 때문에)
        const index = habits.indexOf(habit);
        habits[index].count++;  //현재 state를 바로 수정하는데 이렇게 바로 수정하는 것은 좋지 않음
        this.setState({ habits }); //{habits : habits}랑 동일함
    }

    handleDecrement = habit => {
        console.log(`handleDecrement ${habit.name}`);
        const habits = [...this.state.habits];
        const index = habits.indexOf(habit);
        const count = habits[index].count - 1;
        habits[index].count = count < 0 ? 0 : count;
        this.setState({ habits }); //{habits : habits}랑 동일함
    }

    handleDelete = habit => {
        console.log(`handleDelete ${habit.name}`);
        const habits = this.state.habits.filter(item => item.id !== habit.id);
        this.setState({ habits }); //{habits : habits}랑 동일함
    }

    render() {  //위의 habits의 데이터를 표기할 수 있게 만들어줌
        return (
            <>
                <ul>
                    {this.state.habits.map(habit => (  //state의 habits들에 있는 요소들을 하나씩 빙글빙글 돌면서 Habit이라는 태그를 만들어줌
                        <Habit
                            key={habit.id}
                            habit={habit}
                            onIncrement={this.handleIncrement}  //미리 handleIncrement라는 함수를 정의해놓고 그걸 넘겨줌
                            onDecrement={this.handleDecrement}
                            onDelete={this.handleDelete}
                        />

                    ))}
                </ul>
            </>
        );
    }
}


export default Habits;