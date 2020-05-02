import React from 'react';
import { Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login_challenge1, updatePass, clearPass } from '../../actions';
import { Title } from '../../StyleSheet';
import Victory from './Victory';

function Challenge1() {
	const {pass, tab} = useSelector(state => state.challenge1);
	const dispatch = useDispatch();

	// authentication script
	function authenticate(e) {
		e.preventDefault();
		login_challenge1({pass: pass})(dispatch);
		clearPass()(dispatch);
	};

	switch(tab) {
		case 'VICTORY':
			return <Victory title='CONGRATULATIONS :)' message='You hacked challenge 1' />
		default:
			return (
				<Container className='foreground-bg'>
					<Title title='Welcome to Challenge 1' />
					<br />
					<Container>
						<div className="card" style={{width: '40%', margin: 'auto', maxHeight: '90%'}}>
							<div className="card-body secondary-bg text-light">
								<div className="card-title">
									Gotta Love the Classics
								</div>
								<hr color="lightgray"/>
								<div className="card-text">
									It looks like someone goofed and left a console.log somewhere while developing this site. Also, did you know you that MongoDB can be injected just like a SQL database?
								</div>
								<br />
								<form className="form-group" onSubmit={authenticate}>
									<label className="form-text text-warning" id="invalid"></label>
									<label className="form-control" htmlFor="password">
										admin
									</label>
									<input className="form-control" name='pass' type="password" placeholder='password' value={pass} onChange={e => updatePass(e)(dispatch)}/>
									<button 
										className="btn btn-primary"
										type="submit" 
										style={{padding: "0 1rem", marginTop: "0.7rem"}}
										>
										Submit</button>
								</form>
							</div>
						</div>
					</Container>
				</Container>
			);
	}
}

export default Challenge1;
