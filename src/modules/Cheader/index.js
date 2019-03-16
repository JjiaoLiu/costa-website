import React, {Component} from 'react';
import {Layout} from 'antd';
import "./index.css";
import {fetchJSON} from "../../util/fetchJSON";

const {Header} = Layout;

function MenuItem(props) {
	let submenus = props.submenus;

	return (
		<div className="nav-nested">
			<ul className="container nav-ul-nested">
				{submenus.map((menu, index) =>
					<li key={index} className="nav-ul-nested-item">
						<span>{menu.title}</span>
					</li>
				)}
			</ul>
		</div>
	)
}

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: -1,
		};
	}

	toggleSubmenu = (index) => {
		if (!this.props.pc) {
			this.setState((prevState) => {
				if (prevState.active === index) {
					return {active: -1}
				} else {
					return {active: index}
				}
			})
		}
	};

	render() {
		return (
			<ul className={this.props.pc ? "nav-ul for-pc" : "nav-ul for-mobile"}>
				{
					this.props.menus.map((menu, index) =>
						<li key={index} className={this.state.active === index ? "nav-ul-item active" : "nav-ul-item"}>
							<span onClick={this.toggleSubmenu.bind(this, index)}>{menu.title}</span>
							<MenuItem submenus={menu.submenu}/>
						</li>
					)
				}
			</ul>
		)
	}
}

class Cheader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeNavBar: false,  // 控制导航
			menu: null
		};
	}

	changeNavBar = () => {
		this.setState(state => ({
			activeNavBar: !state.activeNavBar
		}));
	};

	componentDidMount = () => {
		fetchJSON("./menuConstant.json", (data) => {
			this.setState(state => ({
				menu: data
			}));
		})
	}

	render() {
		if (!this.state.menu) {
			return false;
		}

		return (
			<Header className="home-nav">
				<div className="nav-container">
					<div className="container nav-main">
						<div className={this.state.activeNavBar ? "nav-bar for-mobile active" : "nav-bar for-mobile"}
								 onClick={this.changeNavBar}>
							<span className="nav-bar-line"></span>
							<span className="nav-bar-line"></span>
							<span className="nav-bar-line"></span>
						</div>
						<div className="nav-logo">
							<img src={require('./../../assets/images/logo.png')} className="logo" alt=''/>
						</div>
						<div className="nav-right">
							<Menu menus={this.state.menu.HEADER_MENUS} pc={true}/>
							<div className="nav-book">
								{this.state.menu.BOOK_ON_LINE}
							</div>
						</div>
					</div>
				</div>
				<div className="fixed-nav-menu" style={{"display": this.state.activeNavBar ? "block" : "none"}}>
					<Menu menus={this.state.menu.HEADER_MENUS} pc={false}/>
				</div>
			</Header>
		)
	}
}

export default Cheader;
