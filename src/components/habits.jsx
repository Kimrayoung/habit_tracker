import React, { Component } from 'react';
import Habit from './habit';  //habit컴포넌트를 사용하기 위해서 가져옴
import HabitAddForm from './habitAddForm';

class Habits extends Component {
    //이 컴포넌트에는 데이터가 없고 단수히 props로 전달된 습관들의 배열을 빙글빙글 돌면서
    //habit이라는 컴포넌트로 변경해서 보여주는 일만 함
    handleIncrement = habit => {  //이제 이 함수들은 props들을 받아서 단순히 habit으로 옮겨주기만 함
        //이 handleIncrement는 app component의 handleincrement함수를 받아와서 habits들의 인덱스 하나하나에 함수를 넣어줌
        //즉, app 컴포넌트로 부터 전달받은 handleIncrement함수에 인덱스를 하나씩 넣어줌
        this.props.onIncrement(habit);
    }

    handleDecrement = habit => {
        this.props.onDecrement(habit);
    }

    handleDelete = habit => {
        this.props.onDelete(habit);
    }

    handleAdd = (name) => {
        this.props.onAdd(name);  //props의 onAdd에 name을 전달
    }

    render() {  //위의 habits의 데이터를 표기할 수 있게 만들어줌
        return (
            <>
                <HabitAddForm onAdd={this.handleAdd}></HabitAddForm>
                {/* habitAddForm에 handleAdd라는 함수를 전달 */}
                <ul>
                    {this.props.habits.map(habit => (  //state의 habits들에 있는 요소들을 하나씩 빙글빙글 돌면서 Habit이라는 태그를 만들어줌
                        <Habit
                            key={habit.id}
                            habit={habit}
                            onIncrement={this.handleIncrement}  //미리 handleIncrement라는 함수를 정의해놓고 그걸 넘겨줌
                            //그리고 handleIncrement 함수를 통해서 미리 인덱스를 함수에 넣어주고 그걸 다시 habit으로 넘겨줌
                            onDecrement={this.handleDecrement}
                            onDelete={this.handleDelete}
                        //여기는 habit 컴포넌트에게 전달해준 함수를 호출하라는 부분
                        />
                    ))}
                    {/* map은 각가의 요소에 대해서 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 만든다
                    여기서는 새로운 배열을 만드는 것이 아니라 인덱스에 해당하는 요소를 하나씩 habit으로 전달만 해주면 되므로 return이 필요없음 */}
                </ul>
                <button className='resetAll' onClick={this.props.onReset}>Reset All</button>
                {/* 여기서 클릭이 된다면 props를 통해서 전달받은 함수인 onReset함수를 호출  */}

            </>
        );
    }
}


export default Habits;