import * as React from 'react';
import { useState } from 'react';
import { questions as data } from './data/questions';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [questions, setQuestions ] = useState([]);
  const [startGame, setStartGame] = useState(true);

  const [respuestasArray, setRespuestasArray] = useState([]);


  /* listeners de botones de respuesta */
  function correctaClic() {
    console.log("Clic en correcta");
  }

  function incorrectaClic() {
    console.log("Clic en incorrecta");
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  /* función para llenar el respuestas array */
  /* function llenaRespuestasArray(id) {
    setRespuestasArray(oldResp => oldResp.map(resp => {
        return resp.id === id ? 
            {...resp, isHeld: !resp.isHeld} :
            die
    }))
  } */

  function llenaRespuestasArray(respuesta) {
    /* Here the function to fill the respuestasArray state*/
  }


  /* A partir de aquí el código es para llenar el state Questions solo cuando el boton se presiona */
  const handleToggle = () => {
    setStartGame(!startGame);
  };

  const didMount = React.useRef(false);

  /* Usar datos de prueba para no llamar tanto a la API (si bloquea la API usar VPN) */

  /* React.useEffect(() => {
    if (didMount.current) {
      console.log('I run only if toggle changes.');
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then(res => res.json())
          .then(datos => {
            setQuestions(datos.results)
            console.log(questions)
          })
    } else {
      didMount.current = true;
    }
  }, [startGame]); */

  React.useEffect(() => {
    if (didMount.current) {
      console.log('I run only if toggle changes.');
      setQuestions(data.results)
      console.log(questions)   
    } else {
      didMount.current = true;
    }
  }, [startGame]);

  /* Fin del código para llenar el state */

  /* Pasa las preguntas a HTML */

    const preguntas = questions.map(dato => {
      const pregunta = dato.question;
      const respuestas = [dato.correct_answer, ...dato.incorrect_answers];

      const objetoIncorrectas = {}
      objetoIncorrectas.incorrectaUno = dato.incorrect_answers[0];
      objetoIncorrectas.incorrectaDos = dato.incorrect_answers[1];
      objetoIncorrectas.incorrectaTres = dato.incorrect_answers[2];
      
      /* for(let i=0; i < dato.incorrect_answers.length; i++) {
        const string = i.toString();
        objetoIncorrectas. = dato.incorrect_answers[i];
      } */

      console.log(objetoIncorrectas)

      /* const respuestasObject = {'correcta': dato.correct_answer, 'incorrectas': dato.incorrect_answers}; */
      const respuestasObject = {'correcta': dato.correct_answer, ...objetoIncorrectas};

      /* const respuestasEnHTML = Object.keys(respuestasObject).map(respuesta => {
        if(respuesta === 'correcta') {
          return(
            <>
                <button onClick={correctaClic}>{respuestasObject[respuesta]}</button>
            </>
          )
        } else {
          const noCorrectas = respuestasObject[respuesta].map(incorrect => {
            return(
              <button onClick={incorrectaClic}>{incorrect}</button>
            )
          })
          return noCorrectas;
        }
        
      }) */

      const respuestasEnHTML = Object.keys(respuestasObject).sort(() => Math.random() - 0.5).map((respuesta, index) => {
        /* Crea un objeto con las respuestas y lo manda al respuestas array */
        let indexStr = index.toString();
        let id = nanoid();
        const objectRespuestas = {};
        if(respuesta === 'correcta') {
          objectRespuestas[indexStr] = {
            value: respuestasObject[respuesta],
            isHeld: false,
            id,
          };
          return(
            <>
                <button key={id} onClick={correctaClic}>{respuestasObject[respuesta]}</button>
            </>
          )
        } else {
          objectRespuestas[indexStr] = respuestasObject[respuesta];
          return(
            <>
                <button key={id} onClick={incorrectaClic}>{respuestasObject[respuesta]}</button>
            </>
          )
        }
        
      })
 

      return(
        <>
            <h2 key={nanoid()}>{pregunta}</h2>
            <div>
                {respuestasEnHTML}
            </div>
        </>
      )

    });
  


  return (
    <div className="App">
      
      <h1>Quizzical</h1>
      <div>
        <button type="button" onClick={handleToggle}>
          Start Quizz
        </button>
      </div>

      <div>
        {preguntas}
      </div>

      <div>
        <button type="button">
          Check Answers
        </button>
      </div>

    </div>
  )
}

export default App
