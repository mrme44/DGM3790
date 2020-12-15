import React from 'react';
import './App.css';
import Nav from './nav.js'
import axios from 'axios';
import {authContext} from './contexts/auth.js';
import dataContext from './contexts/help_data.js';
import {simplifyStrForSearching} from './simplify_data.js';

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
    const [dataCtx, ctxUpdate] = React.useState([])

    React.useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'https://mrme.me/wp-q-and-a/api/help_data.json',
        );

        const data = result.data
        ctxUpdate(data);

        for(let item of data) {
            item['lower'] = { question: item.question.toLowerCase() + ' ' + (item.keywords || ''),
                                answer: item.answer.toLowerCase() }
            item['simp'] = { question: simplifyStrForSearching(item.question) + ' ' + (item.keywords || ''),
                              answer: simplifyStrForSearching(item.answer) }
            item.changeToRender = true
        }

        ctxUpdate(data);
      };

      fetchData();
    }, []);


    if (authCtx.isLoggedIn){ 
        return (
            <div className="App">
                <dataContext.Provider value={dataCtx}>
                    <Nav loginFormOpen={false} />
                </dataContext.Provider>
            </div>
        )
    } else {
        return (
            <div className="App">
                <Nav loginFormOpen={true} />
                <br/>
                <h2 style={{'fontSize': 30}}>This page requires authentication</h2>
            </div>
        )
    }
}

export default App;
