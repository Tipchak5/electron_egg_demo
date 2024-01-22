import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import './sendBox.less';
import Home from './Home/Home.jsx';
import Users from './Flow/Flow.jsx';
import About from './About/About.jsx';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const SendBox = (props) => {
	const { pathname } = useLocation(); // 当前路由
	const [curPath, setCurPath] = useState(); // 菜单高亮
	const [collapsed, setCollapsed] = useState(false); // 收缩侧边栏

	const menuList = [
		{
			key: '/home',
			icon: <UserOutlined />,
			label: 'nav 1',
		},
		{
			key: '/users',
			icon: <VideoCameraOutlined />,
			label: 'users',
		},
		{
			key: '/about',
			icon: <UploadOutlined />,
			label: 'nav 3',
		},
	];

	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	useEffect(() => {
		pathname === '/' ? setCurPath('/home') : setCurPath(pathname);
		if (['/flow', '/softwareFlow'].includes(pathname)) {
			setCurPath('/projectList');
		} else if (
			pathname == '/VerComparison' &&
			searchParams.get('type') == 'demo'
		) {
			setCurPath('/demoList');
		}
	}, [pathname]);

	return (
		<>
			<Layout className="sendBox">
				<Sider trigger={null} collapsible collapsed={collapsed}>
					<div className="demo-logo-vertical" />
					<Menu
						theme="dark"
						mode="inline"
						items={menuList}
						onClick={clickMenu}
						selectedKeys={[curPath]}
						defaultSelectedKeys={['/home']}
					/>
				</Sider>
				<Layout>
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
						}}
					>
						<Button
							type="text"
							icon={
								collapsed ? (
									<MenuUnfoldOutlined />
								) : (
									<MenuFoldOutlined />
								)
							}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: '16px',
								width: 64,
								height: 64,
							}}
						/>
					</Header>

					<Content
						style={{
							margin: '16px',
							padding: 20,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							color: 'black',
						}}
					>
						<Switch>
							<Route key="/home" path="/home" component={Home} />
							<Route
								key="/users"
								path="/users"
								component={Users}
							/>
							<Route
								key="/about"
								path="/about"
								component={About}
							/>
							<Redirect key="/" from="/" to="/home" exact />
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</>
	);

	/** 切换菜单 */
	function clickMenu(e) {
		// console.log(e, 'clickMenu');
		props.history.push(e.key);
	}
};
export default SendBox;
