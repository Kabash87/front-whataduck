import { useAuth } from "../../../auth/AuthContext"

export const Greeting = ({ username }) => {
  const { isLogged } = useAuth();

  // Leer isVerified y emailToken del localStorage
  const isVerifiedRaw = localStorage.getItem('isVerified');
  const emailToken = localStorage.getItem('emailToken');
  let isVerified = false;
  if (isVerifiedRaw && isVerifiedRaw !== 'undefined' && isVerifiedRaw !== 'null') {
    if (isVerifiedRaw === 'true' || isVerifiedRaw === true) {
      isVerified = true;
    } else if (isVerifiedRaw === 'false' || isVerifiedRaw === false) {
      isVerified = false;
    } else {
      try {
        isVerified = Boolean(JSON.parse(isVerifiedRaw));
      } catch {
        isVerified = false;
      }
    }
  }

  return (
    <div>
      {isLogged && username && (
        <div
          className="hidden"
          style={{
            padding: "30px",
            width: "500px",
            margin: "0 auto",
            borderRadius: "30px",
            backgroundColor: "#CEFE98",
            marginBottom: "10px"
          }}
        >
          <h5>Hola {username}, bienvenido de vuelta</h5>
        </div>
      )}
      {isLogged && !isVerified && emailToken && (
        <div
          className="hidden"
          style={{
            padding: "10px",
            paddingTop: "20px",
            width: "500px",
            margin: "0 auto",
            borderRadius: "30px",
            backgroundColor: "#FFB26E",
            fontSize: "16px"
          }}
        >
          <p>Su correo electrónico no está verificado. Revise su bandeja de entrada para verificar la cuenta y realizar publicaciones.</p>
        </div>
      )}
      {isLogged && !isVerified && !emailToken && (
        <div
          className="hidden"
          style={{
            padding: "10px",
            paddingTop: "20px",
            width: "500px",
            margin: "0 auto",
            borderRadius: "30px",
            backgroundColor: "#FFD6D6",
            fontSize: "16px"
          }}
        >
          <p>No se encontró un token de verificación. Por favor, solicita un nuevo correo de verificación.</p>
        </div>
      )}
    </div>
  );
};
