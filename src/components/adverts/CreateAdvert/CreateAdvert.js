import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import Layout from "../../Layout/Layout";
import RedirectToHome from "../../RedirectToHome";
import { ModalConfirm, CreateAdForm } from "./components";
import { useFormState, useValidation, usePostAd } from "./hooks";

function CreateAdvert() {
  const username1 = localStorage.getItem("user-name");

  if (!username1) {
    window.location.href = "/login";
  }
  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    type,
    setType,
    tags,
    setTags,
    photo,
    setPhoto,
  } = useFormState();

  //Cookies
  const username = localStorage.getItem("user-name");
  const senderEmail = localStorage.getItem("email-user");

  const { formErrors, validateForm } = useValidation(
    name,
    description,
    price,
    tags
  );
  const { postAd, successMessage, errorMessage, redirectToHome } = usePostAd();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Por favor, verifica que no eres un robot.");
      return;
    }
    // Realiza la validación del formulario antes de enviar la solicitud
    if (validateForm()) {
      // Mostrar el Modal de confirmación
      setShowModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const newAdvert = {
      name,
      price: parseFloat(price),
      description,
      type,
      tags: tags.split(",").map((tag) => tag.trim()),
      photo,
      senderEmail,
      username,
    };

    // Recuperar el token de localStorage
    const token = localStorage.getItem("token");
    // Pasar el token como segundo argumento a postAd
    await postAd(newAdvert, token);
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Layout title="Crear Anuncio">
      <Container className="mb-5">
        <Row className="justify-content-md-center">
          <Col md="6">
            {!redirectToHome ? (
              <>
                <ModalConfirm
                  showModal={showModal}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                />

                {/*Alert para mostrar el mensaje de éxito */}
                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}
                {/*Alert para mostrar el mensaje de error */}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <CreateAdForm
                  formErrors={formErrors}
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  price={price}
                  setPrice={setPrice}
                  description={description}
                  setDescription={setDescription}
                  type={type}
                  setType={setType}
                  tags={tags}
                  setTags={setTags}
                  photo={photo}
                  setPhoto={setPhoto}
                  username={username}
                  senderEmail={senderEmail}
                />
                <ReCAPTCHA
                  sitekey={"6LcDPnUrAAAAAN8kG8zJu2ZZ1gUleTUZXaA9di1x"}
                  onChange={setRecaptchaToken}
                  className="my-3"
                />
              </>
            ) : (
              <RedirectToHome />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CreateAdvert;
