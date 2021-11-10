import React from "react";
import "./app.less";

class App extends React.Component {
	get waveArr() {
		const wavesConfig = { ...this.state.wavesConfig };
		let total = [];
		for (let i = 1; i <= wavesConfig.total; i++) {
			total.push(i);
		}
		return total;
	}

	constructor(props) {
		super(props);
		this.state = {
			waves: [],
			wavesConfig: {
				maxSize: 200, // px，波纹最大尺寸
				minSize: 100, // px，波纹最小尺寸
				zIndexCount: 999, // 波纹父元素其实z-index数值
				waveColor: "#40b6f0", //波纹基础颜色
				total: 5, //波纹圈层数
			},
			clickedCount: 0, //统计点击次数
		};
	}

	componentDidMount() {
		const { clickedCount, waves } = this.state;
		let num = clickedCount;
		document.getElementById("root").onclick = (e) => {
			num++; // 统计点击次数
			this.setState({
				clickedCount: num,
			});
			this.createWave(e);
		};
		setInterval(() => {
			waves.length && waves.shift()
			this.setState({
				waves
			})
		}, 2000)
		let lastCount = 0;
		// 2秒内无点击清空waves，防止过多的dom累积占用内存
		setInterval(() => {
			if (lastCount === clickedCount) {
				console.log("hi");
				console.log(clickedCount);
				this.setState({
					waves: [],
				});
			}
			lastCount = clickedCount;
		}, 2000);
	}

	createWave = (e) => {
		const wavesConfig = { ...this.state.wavesConfig };
		const { waves } = this.state;
		// 让新生成的波纹始终在之前波纹的上层产生叠加效果
		if (wavesConfig.zIndexCount > 99999) {
			wavesConfig.zIndexCount = 999;
		} else {
			wavesConfig.zIndexCount++;
		}
		// 在一定范围内随机生成波纹的大小
		const waveSize = parseInt(
			Math.random() * (wavesConfig.maxSize - wavesConfig.minSize) +
				wavesConfig.minSize
		);
		//添加新的波纹数据
		waves.push({
			left: `${e.clientX - waveSize / 2}px`,
			top: `${e.clientY - waveSize / 2}px`,
			zIndex: wavesConfig.zIndexCount,
			width: `${waveSize}px`,
			height: `${waveSize}px`,
		});
		this.setState({
			waves,
			wavesConfig,
		});
	};

	render() {
		const { waves, wavesConfig } = this.state;
		return (
			<div>
				<div className="main-container">
					<div className="waves">
						{waves.map((w, i) => {
							return (
								<div className="wave" style={{ ...w }} key={`w_${i}`}>
									{this.waveArr.map((n) => {
										return (
											<div
												className="wave-item"
												key={`wi_${n}`}
												style={{
													transform: `scale(${0.1 * Math.sqrt(n - 1)})`,
													opacity: 0.3 * (1 / n),
													animationDelay: `${(n - 1) * 0.12}s`,
													animationDuration: `${0.6 + n * 0.3}s`,
													backgroundColor: wavesConfig.waveColor,
												}}
											/>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
