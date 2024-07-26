# vue-app-ui

## vue移动端模版

## Build Setup

```bash
# install dependencies
pnpm install

# serve with hot reload at localhost:8080
pnpm dev

# build for production with minification
## 本地包
pnpm build
## 开发环境包
pnpm build:dev
## 生产环境包
pnpm build:prod
## 测试环境包
pnpm build:test

# build for production and view the bundle analyzer report
npm run build --report
```

### 一、系统简介

#### 1.1、概述

vue3 移动端前端项目模版

#### 1.2 服务维护者

- name: jianfengtheboy email: jianfengtheboy@163.com

### 二、系统介绍

#### 2.1、主要技术

- 1、vite@^4.4.5
- 2、vue@^3.3.4
- 3、vue-router@^4.0.13
- 4、pinia@^2.1.4
- 5、typescript@^5.0.2
- 6、axios@^1.4.0
- 7、vant@^4.8.1
- 8、vconsole@^3.15.1
- 9、postcss-px-to-viewport-8-plugin@^1.2.2
- 10、sass@^1.64.1
- 11、pinia-plugin-persistedstate@^3.2.0
- 12、dayjs@^1.11.9
- 13、mockjs@^1.1.0
- 14、normalize.css@^8.0.1

#### 2.2、项目结构

##### 文件说明

| 文件名称       | 说明                                               |
| -------------- | -------------------------------------------------- |
| src            | 项目配置项目开发的所有内容页面                      |
| src/apis       | 配置项目所有的接口资源                            |
| src/assets     | 配置项目所需的公共的静态资源页面                    |
| src/components | 配置项目业务相关的公共组件                         |
| src/config     | 配置项目在开发环境和生产环境项目下的一些不同的配置     |
| src/layouts    | 全局布局页面                                     |
| src/mock       | 全局模拟接口及模拟数据                             |
| src/model      | 全局数据模型                                     |
| src/request    | 封装 axios 方法                                  |
| src/router     | 项目路由配置                                       |
| src/store      | 配置 pinia 做全局状态管理                           |
| src/utils      | 全局共用方法                                       |
| src/views/     | 配置业务的所有页面                                 |
| src/App        | 入口页面                                           |
| src/main.ts    | 打包入口文件                                       |
| vite.config.ts | vite 自定义配置和开发代理配置等                      |
