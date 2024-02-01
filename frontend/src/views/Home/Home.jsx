import { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import { getDepartment } from '../../service/api';

function Home() {
	const [department, setDepartment] = useState(null); // 部门

	useEffect(() => {
		getDepartmentList();
	}, []);

	return (
		<>
			<div style={{ width: '100%', height: '100%' }}>
				<Button type="default">Home</Button>
        <Select placeholder="请选择部门" options={department} />
        纯纯粹粹
			</div>
		</>
	);

	function getDepartmentList() {
		getDepartment().then((res) => {
			const result = res.result.map((item) => {
				return {
					label: item.name,
					value: item.name,
				};
			});
			// console.log(result);
			setDepartment(result);
		});
	}
}

export default Home;
