import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Add from "material-ui-icons/Add";
import Refresh from "material-ui-icons/Refresh";
import { CircularProgress } from "material-ui/Progress";
import { findAll } from "api/task";
import { connect } from "api/connector";
import {
	RenderContextView,
	shouldRenderContextView,
} from "common/renderContextView";

import List from "./list";
import { Create, Edit } from "./form";

class TaskIndex extends Component {
	render() {
		const { match, location, findAll, toggleSideBar } = this.props;
		return (
			<div className="row no-gutters">
				<RenderContextView className="col h-100vh">
					<Route
						path={`${match.path}`}
						render={props => (
							<div>
								<AppBar position="static">
									<Toolbar>
										<IconButton
											onClick={toggleSideBar}
											color="contrast"
											aria-label="Menu"
										>
											<MenuIcon />
										</IconButton>
										<Typography
											type="title"
											color="inherit"
											className="mr-auto"
										>
											Tasks
										</Typography>
										<IconButton onClick={findAll.call} color="contrast">
											{findAll.pending ? (
												<span>
													<CircularProgress color="inherit" size={14} />
												</span>
											) : (
												<Refresh />
											)}
										</IconButton>
										<Link to={`${match.path}/create`}>
											<IconButton color="contrast">
												<Add />
											</IconButton>
										</Link>
									</Toolbar>
								</AppBar>
								<List listURL={match.path} findAll={findAll} />
							</div>
						)}
					/>
				</RenderContextView>
				<Switch>
					<Route
						path={`${match.path}/create`}
						render={props => (
							<Create
								{...props}
								className="col h-100vh"
								refreshList={
									shouldRenderContextView({ match, location })
										? findAll.call
										: undefined
								}
							/>
						)}
					/>
					<Route
						path={`${match.path}/:id`}
						render={props => (
							<Edit
								{...props}
								className="col h-100vh"
								refreshList={
									shouldRenderContextView({ match, location })
										? findAll.call
										: undefined
								}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default connect({
	findAll: {
		params: props => ({}),
		promise: findAll,
	},
})(TaskIndex);
