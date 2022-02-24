import React, { Component } from 'react';
import './app.css';
import Navbar from './components/navbar'
import Habits from './components/habits';

class App extends Component {
	//navbar에서와 input모두에서 사용해야 하기 때문에 app으로 habits를 옮겨줌
	//함수도 여기로 옮겨줌
	state = {
		habits: [  //각각에 habit이라는 오브젝트가 들어있음
			{ id: 1, name: 'Reading', count: 0 },
			{ id: 2, name: "Running", count: 0 },
			{ id: 3, name: "coding", count: 0 },
		]
	}

	handleIncrement = habit => {  //만약에 어떤 특정 습관이 +버튼이 누르면
		//그 요소가 콜백함수를 통해서 여기로 전달되어짐(그리고 이 함수의 파라미터는 그 해당 습관에 대한 데이터들을 가지게 됨)
		const habits = this.state.habits.map(item => {  //전체 habits들을 빙글빙글돌면서
			if (item.id === habit.id) {  //파라미터의 id(전달받은 습관의 id)와 지금확인하고 있는 습관이 동일하다면
				return { ...habit, count: habit.count + 1 }  //count를 새롭게 업데이트
			}
			return item;
		});

		this.setState({ habits });
	}

	handleDecrement = habit => {
		const habits = this.state.habits.map(item => {  //전체 habits들을 빙글빙글돌면서
			if (item.id === habit.id) {  //파라미터의 id(전달받은 습관의 id)와 지금확인하고 있는 습관이 동일하다면
				const count = habit.count - 1;
				return { ...habit, count: count < 0 ? 0 : count }  //count를 새롭게 업데이트
				//...을 이용해서 안의 오브젝트를 똑같이 복사해 새로운 오브젝트를 생성할 껀데 생성해 올때 count만 새롭게 업데이트 해서 복사해온 다는 것을 의미
			}
			return item;
		});

		this.setState({ habits }); //{habits : habits}랑 동일함
	}

	handleDelete = habit => {
		console.log(`handleDelete ${habit.name}`);
		const habits = this.state.habits.filter(item => item.id !== habit.id);
		this.setState({ habits }); //{habits : habits}랑 동일함
	}

	handleAdd = (name) => {  //여기서 최종적으로 이름이 받아짐, 즉 habitAddForm함수의 이름에서 input으로 받은 name이 여기로 전달됨
		const habits = [...this.state.habits, { id: Date.now(), name, count: 0 }] //name은 name: name즉, key와 value가 동일하므로 name이렇게 써주면 됨
		this.setState({ habits });
	}

	handleReset = (habit) => {
		const habits = this.state.habits.map(item => {  //전체 habits들을 빙글빙글돌면서
			// return {...habit, count: 0} //이렇게 하면 모든 habit이 업데이트 됨(즉, 한 habit을 확인할 때마다 새로운 오브젝트가 만들어짐)
			//만약에 habit의 count가 0이면 새로운 오브젝트를 만들 필요가 없음
			if (habit.count !== 0) {
				return { ...habit, count: 0 };  //0이 아닐때만 새로운 오브젝트 생성
			}
			return habit //0일 때는 기존의 오브젝트 전달
		});

		this.setState({ habits });
	}

	render() {
		return (
			<>
				<Navbar
					totalCount={this.state.habits.filter(item => item.count > 0).length}
				>
				</Navbar>

				<Habits
					habits={this.state.habits}
					onIncrement={this.handleIncrement}  //미리 handleIncrement라는 함수를 정의해놓고 그걸 넘겨줌
					//만약에 habit(어느 한 습관 ex. reading)에서 +가 눌리면 결국 app 컴포넌트에서 정의한 handleIncrement함수가 호출됨
					//왜냐하면 여기서 정의한 handleIncrement를 habits로 넘겨줬고
					//다시 habits 컴포넌트에서 habit 컴포넌트로 handleIncrement 함수를 넘겨줬기 때문에
					onDecrement={this.handleDecrement}
					onDelete={this.handleDelete}
					onAdd={this.handleAdd}
					onReset={this.handleReset}
				>
				</Habits>
			</>
		);
	}
}



export default App;


//react는 virtual Dom을 이용해서 트리를 보관해서 업데이트 된것을 비교해서 필요한 부분만 업데이트 --> 성능에 영향을 크게 주지 않음
//실제로 관련된 데이터가 변경되지 않았음에도 불구하고 render함수가 호출된다면 성능에 좋지 않음
//실제로 habits 컴포넌트에서 increment나 decrement를 누르면 count만 업데이트 되므로 다른 아이들은 업데이트 될 필요가 없음
//예를 들면 input이나 reset All은 업데이트 될 필요가 없음
//이렇게 전부 업데이트 되는 것을 방지할 수 있는 것이 --> pureComponet와 memo

