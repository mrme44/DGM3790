import React from 'react';
import './App.css';
import Nav from './nav.js'
import Species from './species.js'
import {authContext} from './contexts/auth.js'
import Typography from '@material-ui/core/Typography';

// const App = () => {
//     const [authCtx] = React.useContext(authContext)
//
//     let contents = authCtx.isLoggedIn ? <Species count={9}></Species> : <Typography variant='h6'><br/>This page requires authentication</Typography>
//
//     return (
//         <div className="App">
//             <Nav loginFormOpen={! authCtx.isLoggedIn} />
//                 {contents}
//         </div>
//     )
// }

function App() {
    const [authCtx] = React.useContext(authContext)

    if (authCtx.isLoggedIn){
        return (
            <div className="App">
                <Nav loginFormOpen={false} />
                    <Species count={9}></Species>
            </div>
        )
    } else {
        return (
            <div className="App">
                <Nav loginFormOpen={true} />
                <Typography variant='h6'><br/>
                    <h2>This page requires authentication</h2>
                </Typography>
            </div>
        )
    }
}

export default App;
