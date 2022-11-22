import './App.css';
import React, { createContext, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout/Layout';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLoggedInUser } from './components/ApiRequest';


export const ThemeContext = createContext(null)
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null);
  const refreshUser = () => {
    setUser(null);
    getLoggedInUser().then(x=>{
      setUser(x)
    })
  }

  const [theme, setTheme] = useState("light");
  const [icon, setIcon] = useState(<FontAwesomeIcon icon={faSun}/>);

  const toggleTheme = () => {
    setTheme((curr)=> (curr === "light" ? "dark" : "light"));
    setIcon((curr)=> (curr.props.icon.iconName === "sun" ? <FontAwesomeIcon icon={faMoon}/> : <FontAwesomeIcon icon={faSun}/>));
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, icon}}>
    <UserContext.Provider value={{user, refreshUser}}>
      <div className="App" id={theme}>   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </UserContext.Provider>
    </ThemeContext.Provider>
  );
}


export default App;
