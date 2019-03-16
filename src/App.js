import React, {Component} from 'react';
import {Layout} from 'antd';
import Cheader from './modules/Cheader';
import SlickTop from './modules/SlickTop';
import {fetchJSON} from './util/fetchJSON'

const {
	Footer, Content,
} = Layout;


class App extends Component {
	constructor() {
		super();
		this.state = {
			string: null,
		};
	}

	componentDidMount = () => {
		fetchJSON("./string.json", (data) => {
			this.setState(state => ({
				string: data
			}));
		})
	};

	render() {
		return (
			<Layout className="app">
				<Cheader/>
				<Content>
					<SlickTop/>

				</Content>
				<Footer>Footer</Footer>
			</Layout>
		);
	}
}

export default App;
