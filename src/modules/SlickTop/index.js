import React, {Component} from 'react';
import {fetchJSON} from "../../util/fetchJSON";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

class SlickTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			banner: null
		}
	}

	componentDidMount = () => {
		fetchJSON("./slickTop.json", (data) => {
			this.setState(state => ({
				banner: data
			}));
			this.slider.slickPlay();
		})
	};

	render() {
		if (!this.state.banner) {
			return false
		}
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			lazyLoad: true,
			// autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: true,
			dotsClass: "slick-dots slick-thumb"
		};
		return (
			<Slider {...settings} className="top-slick">
				{
					this.state.banner.BANNER_PC.map((item, index) => {
						return (
							<img src={item.src} alt=""/>
						)
					})
				}
			</Slider>
		)
	}
}

export default SlickTop
