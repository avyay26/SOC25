import  Button  from './components/button';
import Alert from './components/alert';
import { useState } from 'react';

 function App()
 {//We need to show the alert only if button is clicked.
    
    let [alertVisible,setalertVisibility]=useState(false);

return(

<div>
   {alertVisible ? <Alert children={"This is alert"}/> : null}
    <Button color="success" item="Success Beyatchh!!" onClick={()=> {setalertVisibility(true);}}/>
</div>
);
           
}

export default App;



