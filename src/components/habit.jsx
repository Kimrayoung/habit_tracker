import React, { PureComponent } from 'react';

class Habit extends PureComponent {  //하나씩 habits의 인덱스를 받음
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

//이부분을 pureComponent로 변경해준다면 전부 업데이트 되지 않음
//즉, 변화가 일어나지 않음
// 왜냐하면 pureComponet는 결국 shallow comparison이기 때문ㅇ
//habit 컴포넌트는 자체적인 state는 없고 props를 전달받음 
//그리고 이 props가 변경되지 않으면 re-render가 일어나지 않음
//handleIncrement는 app에서 전달되는 것으로 한번 클래스가 만들어지면 변경되지 않음
//즉, 레퍼런스가 변경되지 않고 안에 있는 변수만 변경됨 --> 그러므로 props변경이 일어나지 않음
//habits라는 오브젝트 안에 인덱스에 해당하는 habit의 변수인 count만 변경됨
//그러므로 오브젝트는 결국 동일한 오브젝트임
//결국, shallow comparison은 오브젝트의 레퍼런스가 변경되었는지만 확인하므로
//오브젝트의 레퍼런스가 변경되지 않고 데이터의 값만 바뀐 count는 동일하다고 판단  --> re-render호출 안됨
//즉, 여기서의 문제는 우리가 오브젝트 자체를 업데이트 하는 것이 아니라 오브젝트 안의 데이터를 변경해서 문제가 일어나는 것
//그러므로 여기서는 오브젝트의 데이터가 변경이 된다면 새로운 오브젝트를 만드는 것이 좋음