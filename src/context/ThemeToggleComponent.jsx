// import { useContext } from "react";
// import { UserContext } from "./UserContext";
// import { ThemeContext } from "./ThemeContext";

// function ThemeToggleComponent(){
//     const {theme,toggleTheme}=useContext(ThemeContext);
//     const style={
//         backgroundColor:theme=="light"?"#fff":"#333",
//         color: theme=="light"?"#000":"#fff",
//         padding:"20px",
//         textAlign:"center",
//         minHeight:"1000vh"
//     };
//     return(
//         <div style={style}>
//             <h3>Current theme:{theme.toUpperCase()}</h3>
//             <button onClick={toggleTheme}>Switch to {theme==="light"?"dark":"light"} Mode</button>
//         </div>
//     )
// }
// export default ThemeToggleComponent;