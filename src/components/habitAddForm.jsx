import React, { PureComponent } from 'react';

class HabitAddForm extends PureComponent {
    formRef = React.createRef();
    inputRef = React.createRef();  //ref라는 오브젝트를 만들어줌
    //react에서는 js와 다르게 dom요소를 가져오기 위해서는 ref라는 것을 이용
    //inputRef를 통해서 새로운 ref를 만들었고 그걸 원하는 요소에다가 전달해주면 됨
    //즉, react는 바로 DOM요소에 접근하지 않고 필요할 때는 createRef 라는 것을 이용해서 멤버변수를 정의한 다음
    //그것을 원하는 리액트 컴포넌트에 ref로 연결하면 됨
    onSubmit = (event) => {
        event.preventDefault();  //브라우저가 리렌더링 되지 않도록 브라우저의 기본기능 취소
        console.log(this.inputRef.current.value);
        const name = this.inputRef.current.value;
        name && this.props.onAdd(name);
        //name이 비어있지 않다면 즉, name에 새로운 값이 들어간다면
        //props로 부터 전달된 onAdd라는 함수에 이름을 전달
        // this.inputRef.current.value = ''; // input태그에 빈값 넣어주기t
        this.formRef.current.reset();
    }
    render() {
        return (
            <>
                <form ref={this.formRef} className='add-form' onSubmit={this.onSubmit}>
                    <input ref={this.inputRef} type="text" className='add-input' placeholder='Habit'></input>
                    {/* input에 ref로 inputRef를 전달해준다면 컴포넌트가 브라우저에 표기가 되면서 이 input에 inputRef가 연결
                    그래서 이 요소에 접근해서 해당하는 데이터를 읽어올 수 있음 */}
                    <button className='add-button'>Add</button>
                </form>
            </>
        );
    }
}

export default HabitAddForm;

//PureComponet를 사용하게 되면 최상위 컴포넌트의 state, props가 변경되지 않으면 re-render가 되지 않음
//이 컴포넌트가 업데이트 되려면 여기에 전달되는 props나 state의 데이터가 변경이 되어야 함
//onAdd라는 콜백함수만 props로 받음(state는 없움)
//onAdd는 App에서 전달받음
//이거는 Component가 생길 때 한번 할당 된 뒤에는 다시 업데이트가 되지 않음
//즉, props에 변화가 없어서 호출 되지 않음