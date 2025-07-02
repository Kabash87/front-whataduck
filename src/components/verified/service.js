import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const verificarUrl = "/api/users";

export const verifyEmail = (claves) => {
  return client.post(`${verificarUrl}/verify-email`, claves, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};