import RedirectToHome from "../RedirectToHome"
import { verifyEmail } from "./service";



function Verified() {

  //Token es el true or false si la cuenta esta verificada o no lo esta
const token = JSON.parse(localStorage.getItem('isVerified'));
//Token unico que se eliminara al momento de verificar la cuenta
const token2 = JSON.parse(localStorage.getItem('emailToken'));

//const cookie = require("js-cookie");
//const token2 = cookie.get("userId");

console.log(token2)
const procesoBack = async () => {
  //Se almacenan las claves para enviar al backend
const claves ={
  token: token,
  token2: token2, 
}
  try {
   await verifyEmail(claves);
  } catch (error) {
    console.log(error);
  }
}
//La cuenta ya se ha verificado correctamente
if (token === false) {
  localStorage.setItem('isVerified', true);
  procesoBack();
  alert("Se ha verificado la cuenta correctamente")
} else {
  //La cuenta ya estaba verificada
  localStorage.setItem('isVerified', true);
  alert("La cuenta ya esta verificada")
}
return <RedirectToHome />;
  }

  export default Verified;