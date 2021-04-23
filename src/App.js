import logo from './logo.svg';
import './App.css';
import {useState} from "react";


function App() {

  let[Oldexpression, setOldexpression]= useState(" ");
  let[expression, setexpression]= useState("0");
  let [prev, setPrev] = useState("ANS");

  let numerics= new Set("0123456789()");
  let operators= new Set("+-*/");
  let buttons = ["(",")","backspace","AC","7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"];



  let evaluation= function(){
    let evaluate = eval(expression);
    setOldexpression("= "+expression);
    setexpression(evaluate);
    setPrev("ANS");
  }

  let putNUmerics= function(value){
    if(prev =="ANS"){
      setOldexpression("Ans = "+ expression);
      setexpression(value);
    }else{
      setexpression(expression + value);
    }
    setPrev("NUM");
  }

  let putOperators= function(value){
    if(prev != "OP"){
      setexpression(expression + value);
    }else{
      setexpression(expression.slice(0,-1) + value);
    }
    setPrev("OP");
  }

  let putDelete = function(){
    if (expression.length >= 1) {
      setexpression(expression.slice(0, -1));
    }
    setPrev("DEL");
  };



  

  let handkeyup= function(event){
    console.log(event.key);
      if(event.key == "Backspace"){
        putDelete();
      }else if(numerics.has(event.key)){
        putNUmerics(event.key);
      }else if(operators.has(event.key)){
        putOperators(event.key);
      }
      else if(event.key == "Enter"){
        evaluation();
      }
  }
  
  


  return (
    <div className="App" tabIndex={0} onKeyUp={handkeyup}>
      <h2>New Calculator</h2>
      <div style={{
         width: "400px",
         height: "200px",
         background: "#ffffff",
         display: "flex",
         flexDirection: "column",
         alignItems: "flex-end",
         justifyContent: "center",
         padding: "20px",
         borderRadius: "10px",
         overflow: "hidden"
      }}>

        <h6>{Oldexpression}</h6>
        <h1>{expression}</h1>

      </div>
      <div style={{
         width: "400px",
         height: "200px",
         background: "#ffffff",
         display: "flex",
         flexWrap: "wrap",
         flexDirection: "column",
         alignItems: "flex-end",
         justifyContent: "center",
         margin: "20px",
         padding: "20px",
         borderRadius: "10px",
         backgroundColor: "grey"
      }}>
        {buttons.map(function(buttonValue,idx){
          return(
            <button style={{
              width: "90px",
              padding: "5px",
              margin: "5px",
              borderRadius: "10px"
            }}
            onClick={function(){
              if(buttonValue=="AC"){
                setexpression(" ");
              }else if(buttonValue=="backspace"){
                putDelete();
              }else if(numerics.has(buttonValue)){
                putNUmerics(buttonValue);
              } else if (operators.has(buttonValue)) {
                putOperators(buttonValue);
              } else if (buttonValue === "=") {
                evaluation();
              }
            }}
            
            
            >
              {buttonValue}
            
            </button>
          )
        })}

      </div>

    </div>
  );
}

export default App;
