import React, { Component } from 'react';

class Habit extends Component {  //하나씩 habits의 인덱스를 받음
    handleIncrement = () => {  //habits의 자식요소를 넘겨받음, 그 요소를 넘겨 받을 때 onIncrement라는 값이 있었고 그 값이 이쪽으로 들어옴
        //사실 굳이 필요한 함수는 아니고 그냥 바로 아래 onclick부분에 this.props.onIncrement로 넘겨주면 됨
        this.props.onIncrement(this.props.habit);
    };

    handleDecrement = () => {
        this.props.onDecrement(this.props.habit);
    };

    handleDelete = () => {
        this.props.onDelete(this.props.habit);
    }
    render() {
        console.log(this.props.habit)
        // const habitName = this.props.habit.name
        const { name, count } = this.props.habit  //this.props를 이용하면 전달된 데이터가 자동으로 props로 전달
        //즉, props 안에 habit의 데이터들이 들어있음
        return (
            <div className='habits'>
                <span className='habit-name'>{name}</span>
                <span className='habit-count'>{count}</span>
                <button className='habit-button habit-increase' onClick={this.handleIncrement}>
                    <i className="fas fa-plus-square"></i>
                </button>
                <button className='habit-button habit-decrease' onClick={this.handleDecrement}>
                    <i className="fas fa-minus-square"></i>
                </button>
                <button className='habit-button habit-delete' onClick={this.handleDelete}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        );
    }
}

export default Habit;