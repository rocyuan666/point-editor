# roc-cli-electron-base-template

roc 脚手架 electron(基础) 项目模板

# 运行开发

```bash
# 安装依赖
npm install

# 开发启动
npm run dev
```

# 打包构建

需按照以下顺序运行脚本

```bash
# 打包electron代码，防止源码泄露，整合构建资源文件
npm run ele:build

# 修改 package.json 入口
# 开发时修改: src/main.js
# 构建时修改: dist/main.js

# 构建安装包
npm run make
```

# roc-cli

[![npm version](https://img.shields.io/npm/v/roc-cli.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/roc-cli)
[![npm downloads](https://img.shields.io/npm/dt/roc-cli.svg?style=flat-square)](https://www.npmjs.com/package/roc-cli)

## 介绍

平时创建 vue、uniapp 等项目，都需要手动删除一堆原始无用代码并且配置非常多的库及相关配置，非常麻烦，roc-cli 会帮你创建没有原始无用代码并且有常用的库及配置的项目模板，开箱即用，提高开发效率。

## 安装教程

全局安装：` npm i -g roc-cli`

## 使用说明

全局下安装了 roc-cli 后就可以在命令行使用 `roc create <project-name>` 命令创建项目；创建项目会询问项目类型，上下键进行选择，回车确定。

```bash
roc create project-name
```
