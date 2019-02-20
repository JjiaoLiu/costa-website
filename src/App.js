import React, {Component} from 'react';
import {Layout, Row, Col, Icon} from 'antd';
import './App.css';

const {
	Header, Footer, Content,
} = Layout;

function MenuItem(props) {
	let submenus = props.submenus;

	return (
		<ul className="nav-ul-nested">
			{submenus.map((menu, index) =>
				<li key={index}>
					<a href={menu.link} target={menu.noExact ? "_self" : "_blank"}>{menu.title}</a>
				</li>
			)}
		</ul>
	)
}

function Menu(props) {
	let menus = props.menus;
	let pc = props.pc;

	return (
		<ul className={pc ? "nav-ul for-pc" : "nav-ul for-mobile"}>
			{
				menus.map((menu, index) =>
					<li key={index}>
						<a href={menu.link} target={menu.noExact ? "_self" : "_blank"}>{menu.title}</a>
						<MenuItem submenus={menu.submenu}/>
					</li>
				)
			}
		</ul>
	)
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			string: null,
			menu: null,
			activeNavBar: false
		};
	}

	changeNavBar = () => {
		this.setState(state => ({
			activeNavBar: !state.activeNavBar
		}));
	};

	componentDidMount = () => {
		fetch("./home.json")
			.then(res => {
				return res.json();
			}).then(data => {
			this.setState(state => ({
				string: data
			}));
		}).catch((e) => {
			console.log(e.message);
		});
		fetch("./menuConstant.json")
			.then(res => {
				return res.json();
			}).then(data => {
			this.setState(state => ({
				menu: data
			}));
		}).catch((e) => {
			console.log(e.message);
		});
	};

	render() {
		const String = this.state.string;
		const MENUS = this.state.menu && this.state.menu.MENUS;
		const FOOTER_MENUS = this.state.menu && this.state.menu.FOOTER_MENUS;
		if (!String || !MENUS || !FOOTER_MENUS) {
			return false
		}
		return (
			<Layout className="app">
				<Header className="home-nav">
					<div className="container nav-main">
						<div className={this.state.activeNavBar ? "nav-bar for-mobile active" : "nav-bar for-mobile"}
								 onClick={this.changeNavBar}>
							<span className="nav-bar-line"></span>
							<span className="nav-bar-line"></span>
							<span className="nav-bar-line"></span>
						</div>
						<div className="nav-logo">
							<img src={require('./assets/images/logo.png')} className="logo" alt=''/>
						</div>
						<div className="nav-right">
							<Menu menus={MENUS} pc={true}/>
							<div className="nav-book">
								{String.Header.bookOnline}
							</div>
						</div>
						<Menu menus={MENUS}/>
					</div>
				</Header>
				<Content>
				</Content>
				<Footer>Footer</Footer>
			</Layout>
		);
	}
}

export default App;
