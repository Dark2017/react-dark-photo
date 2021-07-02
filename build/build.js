const path = require('path');
const fs = require('fs');
const ora = require('ora');
const shell = require('shelljs');
const package = path.resolve(__dirname, '../package.json')

// const inquirer = require('inquirer');

const spinner = ora('').start();
spinner.start();
// 先执行打包脚本
const build_lib = async (srcipt) => {
  startLog('==========开始执行==========')
  const res = shell.exec(`${srcipt}`)
  if(res.code === 0) {
     successLog('项目打包成功!')
  } else {
    errorLog('项目打包失败, 请重试!');
    process.exit(); //退出流程
  }
}

// 检查npm版本
const check_npm = async () => {
  fs.readFile(package, 'utf8', (err, data) => {
    if(err) {
      errorLog('读取失败！')
    } else {
      infoLog(`当前package版本为：${data.version}`)
    }
  })
}

check_npm()
spinner.stop()
// (async () => {
//   build_lib('npm run build')
// })()


// 开始部署日志
function startLog(...content) {
  console.log(chalk.magenta(...content));
}

// 信息日志
function infoLog(...content) {
  console.log(symbols.info, chalk.blue(...content));
}

// 成功日志
function successLog(...content) {
  console.log(symbols.success, chalk.green(...content));
}

// 错误日志
function errorLog(...content) {
  console.log(chalk.red(...content));
}

// 下划线重点输出
function underlineLog(content) {
  return chalk.blue.underline.bold(`${content}`);
}
