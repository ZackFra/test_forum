import React, { useEffect } from 'react';
import { Container, Nav, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts, getPosts, allowCreation, setForum } from '../../actions';
import { verify } from 'jsonwebtoken';
import env from '../../.env.js';

function Challenge0Forum(props) {
	const { posts, postId, view, tab, forum } = useSelector(state => state.forum);
	const { token } = localStorage;
	const dispatch = useDispatch();
	const standard = (
		<Container>
				<Nav>
					<div className="card" style={{width: '100%', margin: 'auto'}}>
						<div className="card-body bg-light text-dark">
							<h1 className="card-title pb-2 mt-4 border-bottom">Forum: Challenge 3</h1>
							{allowCreation()}
							<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
								
							</div>
						</div>
					</div>
				</Nav>
		</Container>
	);
	function allowMakeMessage() {
		try {
			verify(token, env.jwtseed);
			return <Button color="link">New Message</Button>;
		}
		catch(e) {
			return ;
		}
	}

	// dynamically generate page as tab changes
	useEffect( () => {
		switch(tab) {
			case 'STANDARD':
				dispatch({type: 'SET_VIEW', payload: 
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto'}}>
								<div className="card-body bg-light text-dark">
									<h1 className="card-title pb-2 mt-4 border-bottom">Forum: Challenge 3</h1>
									{allowCreation()}
									<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
										{listPosts(forum)}			
									</div>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			case 'VIEW_POST':
				dispatch({type: 'SET_VIEW', payload:
					<Container>
						<Nav>
							<div className="card" style={{width: '100%', margin: 'auto'}}>
								<div className="card-body bg-light text-dark">
									<h1 className="card-title pb-2 mt-4 border-bottom">{posts[postId].title}</h1>
									<Button color="link" onClick= {() => {
										dispatch({type: 'SET_TAB', payload: 'STANDARD'})
										getPosts(forum.toUpperCase())(dispatch);
									}}>
									Back</Button>{allowMakeMessage()}
									<div className="card-body" id='content' style={{'height': '28rem', 'width': '100%', 'overflow': 'scroll'}}>
										{posts[postId].content.map(message => <div key={message} style={{'width': '100%', 'height': '4rem', 'backgroundColor':'cyan'}}>{message}</div>)}
									</div>
								</div>
							</div>
						</Nav>
					</Container>
				});
				break;
			default:
				dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		}
	}, [tab, posts.length]); 

	useEffect( () => {
		dispatch({type: 'SET_TAB', payload: 'STANDARD'});
		setForum('CHALLENGE3');
	}, [])

	return view || standard;
}
export default Challenge0Forum;