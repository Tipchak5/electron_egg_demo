import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import SendBox from '../views/sendBox';

function RouterIndex(props) {
	useEffect(() => {}, []);

	return (
		<HashRouter>
			<Switch>
				<Route path="/home" component={SendBox} />
				<Route path="/" component={SendBox} />
			</Switch>
		</HashRouter>
	);
}

export default RouterIndex;
