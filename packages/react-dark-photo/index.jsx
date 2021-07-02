import React from "react";
import "./style/index.css";
import "./style/style.less";
import print from "./utils/print";
import { downloadFileByURL } from "./utils/download";
import { suffix_photo_list, message_text } from "./utils/constart";
import Windows from "../react-dark-photo/components/windows/app.jsx";
import Messsage from "../react-dark-photo/components/message/app.jsx";
import Wave from "../react-dark-photo/components/wave/app.jsx";

class App extends React.Component {
	imgRef = React.createRef();
	message = React.createRef();

	get currentImg() {
		const { imgData, imgArr } = this.props;
		const { index } = this.state;
		return imgData ? imgData : imgArr[index];
	}

	get currentLength() {
		const { imgData, imgArr } = this.props;
		const { index } = this.state;
		return imgData ? imgData.length : imgArr[index].length;
	}

	get idx() {
		return this.currentImg.lastIndexOf(".");
	}

	get suffixName() {
		console.log(this.currentImg, "-this.currentImg-");
		return (
			this.currentImg &&
			this.currentImg.substring(this.idx + 1, this.currentLength)
		);
	}

	get isImg() {
		return suffix_photo_list[this.suffixName];
	}

	get currentAction() {
		const { defaultAction } = this.state;
		const { customAction } = this.props;
		return customAction
			? Object.assign(defaultAction, customAction)
			: defaultAction;
	}

	get lastCard() {
		const { imgData, imgArr } = this.props;
		return !imgData && imgArr.length >= 2 && this.currentAction.lastCard;
	}

	get nextCard() {
		const { imgData, imgArr } = this.props;
		return !imgData && imgArr.length >= 2 && this.currentAction.nextCard;
	}

	get transition() {
		const { isAnimation } = this.props;
		return isAnimation ? "all" : "none";
	}

	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			openAnime: true,
			// 当前图片变换参数
			activeImg: {
				scale: 1,
				x: 0,
				y: 0,
				rotate: 0,
			},
			// 默认操作栏配置
			defaultAction: {
				lastCard: true,
				narrow: true,
				reduction: true,
				enlarge: true,
				leftRotate: true,
				rightRotate: true,
				downloadFile: true,
				publish: true,
				nextCard: true,
				mouseDown: true,
				mouseWheel: true,
			},
		};
	}

	// 上一张
	left = () => {
		let { index } = this.state;
		if (index > 0) {
			index = index - 1;
			this.setState({
				index,
			});
			this.reduction();
		} else {
			this.message.current.messageShow(message_text["first"]);
		}
	};

	// 下一张
	right = () => {
		let { index } = this.state;
		const { imgArr } = this.props;
		if (imgArr.length - 1 > index) {
			index = index + 1;
			this.setState({
				index,
				openAnime: false,
			});
			this.reduction();
		} else {
			this.message.current.messageShow(message_text["last"]);
		}
	};

	// 放大
	enlarge = () => {
		if (!this.currentAction.mouseWheel) return;

		const activeImg = { ...this.state.activeImg };

		let scale = activeImg.scale;

		scale += 0.1;

		if (scale >= 5) {
			scale = 5;
		}

		activeImg.scale = scale;

		this.setState({
			activeImg,
		});
	};

	// 缩小
	narrow = () => {
		if (!this.currentAction.mouseWheel) return;

		const activeImg = { ...this.state.activeImg };

		let scale = activeImg.scale;

		scale -= 0.1;

		if (scale <= 0.1) {
			scale = 0.1;
		}

		activeImg.scale = scale;

		this.setState({
			activeImg,
		});
	};

	// 还原
	reduction = () => {
		let activeImg = {
			scale: 1,
			x: 0,
			y: 0,
			rotate: 0,
		};

		this.setState({
			openAnime: false,
			activeImg,
		});
	};

	// 旋转
	rotate = (direction) => {
		const activeImg = { ...this.state.activeImg };

		activeImg.rotate += direction === "left" ? 90 : -90;

		this.setState({
			openAnime: true,
			activeImg,
		});
	};

	// 滚轮缩放
	mouseWheel = (e) => {
		if (e.deltaY > 0) {
			this.enlarge();
		}
		if (e.deltaY < 0) {
			this.narrow();
		}
	};

	// 鼠标按下
	down = (currentAction, e) => {
		if (!currentAction.mouseDown) return;

		const activeImg = { ...this.state.activeImg };

		let downX = e.pageX;

		let downY = e.pageY;

		let prevDix = activeImg.x;

		let prevDiy = activeImg.y;

		window.onmousemove = (a) => {
			let moveX = a.pageX;
			let moveY = a.pageY;

			let diX = parseInt(moveX - downX);

			let diY = parseInt(moveY - downY);

			activeImg.x = diX + prevDix;

			activeImg.y = diY + prevDiy;

			this.setState({
				activeImg,
			});

			return false;
		};

		window.onmouseup = () => {
			window.onmousemove = window.onmouseup = null;
		};

		return false;
	};

	// 下载
	downloadFile = (url) => {
		if (url)
			downloadFileByURL(
				url,
				url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("."))
			);
	};

	// 打印
	publish = () => {
		print(document.getElementById("imgRef"));
	};

	render() {
		const { activeImg, openAnime, extreme } = this.state;
		const { showBox, close, isHint, ifWave } = this.props;

		return (
			<div>
				<Windows visible={showBox} close={close}>
					<section className="header-photo" slot="footer">
						<div className="head-content">
							<div className="tools-wrap">
								<div className="photo-tools">
									<abbr title="上一张">
										{this.lastCard ? (
											<span
												onClick={this.left}
												className="iconfont icon-arrow-left-bold icon"
											></span>
										) : null}
									</abbr>
									<abbr title="缩小">
										{this.currentAction.narrow ? (
											<span
												onClick={this.narrow}
												className="iconfont icon-zoom-in icon"
											></span>
										) : null}
									</abbr>
									<abbr title="实际大小">
										{this.currentAction.reduction ? (
											<span
												onClick={this.reduction}
												className="iconfont icon-fullscreen-expand icon"
											></span>
										) : null}
									</abbr>
									<abbr title="放大">
										{this.currentAction.enlarge ? (
											<span
												onClick={this.enlarge}
												className="iconfont icon-zoom-out icon"
											></span>
										) : null}
									</abbr>
									<abbr title="逆时针旋转">
										{this.currentAction.leftRotate ? (
											<span
												onClick={this.rotate.bind(this, "right")}
												style={{
													transform: "rotateY(180deg)",
													display: "inline-block",
												}}
												className="iconfont icon-refresh icon"
											></span>
										) : null}
									</abbr>
									<abbr title="顺时针旋转">
										{this.currentAction.leftRotate ? (
											<span
												onClick={this.rotate.bind(this, "left")}
												className="iconfont icon-refresh icon"
											></span>
										) : null}
									</abbr>
									<abbr title="下载">
										{this.currentAction.downloadFile ? (
											<span
												onClick={this.downloadFile.bind(this, this.currentImg)}
												className="iconfont icon-download icon"
											></span>
										) : null}
									</abbr>
									<abbr title="打印">
										{this.currentAction.publish ? (
											<span
												onClick={this.publish}
												className="iconfont icon-print icon"
											></span>
										) : null}
									</abbr>
									<abbr title="下一张">
										{this.nextCard ? (
											<span
												onClick={this.right}
												className="iconfont icon-arrow-right-bold icon"
											></span>
										) : null}
									</abbr>
								</div>
							</div>
						</div>
					</section>
					<section className="content" slot="body">
						{this.isImg ? (
							<img
								className="img"
								id="imgRef"
								ref={this.imgRef}
								src={this.currentImg}
								onWheel={this.mouseWheel.bind(this)}
								onMouseDown={this.down.bind(this, this.currentAction)}
								style={{
									transform: `
                      translateX(${activeImg.x + "px"}) 
                      translateY(${activeImg.y + "px"})
                      scale(${activeImg.scale})
                      rotate(${activeImg.rotate}deg)
                    `,
									transition: `${openAnime && this.transition} 0.3s linear`,
									WebkitTransition: `${
										openAnime && this.transition
									} 0.3s linear`,
									// MozTransition: `${openAnime && this.transition} 0.3s linear`,
									// OTransition: `${openAnime && this.transition} 0.3s linear`
								}}
							/>
						) : null}
					</section>
				</Windows>
				<Messsage ref={this.message} extreme={extreme} isHint={isHint} />
				{ifWave ? <Wave /> : null}
			</div>
		);
	}
}

export default App;
