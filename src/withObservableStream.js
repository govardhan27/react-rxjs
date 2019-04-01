import React from 'react';

export default (observable, triggers, initialState) => Component => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				...initialState
			}
		}

		componentDidMount() {
			this.subscription = observable.subscribe(newState => {
			    console.log('newState ',newState);
				this.setState({ ...newState })
			}
			);
		}

		componentWillUnmount() {
			this.subscription.unsubscribe();
		}

		render() {
			console.log('initialState ',initialState)
			return (
				<Component {...this.props} {...this.state} {...triggers} />
			)
		}
	}
}