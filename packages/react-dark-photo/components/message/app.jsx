import React from "react";
import "./app.less";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
			isExtreme: false,
			title: "",
		};
	}
	getSetTimeOut() {
		return setTimeout(() => {
			this.setState({
				time: null,
				isExtreme: false,
			});
		}, 1200);
	}

	// 照片到尽头提示
	messageShow = (text) => {
		const self = this;
		if (!this.state.time) {
			this.setState({
				title: text,
				isExtreme: true,
				time: self.getSetTimeOut(),
			});
		}
	};

	render() {
		const { isHint, bgColor, color } = this.props;
		const { isExtreme, title } = this.state;
		return (
			<div>
				{isExtreme && isHint ? (
					<div
						id="message"
						className="msg"
						style={{
							color: `${color || "#ffffff"}`,
							backgroundColor: `${bgColor || "#000000"}`,
						}}
					>
						{title}
					</div>
				) : (
					""
				)}
			</div>
		);
	}
}

export default App;
