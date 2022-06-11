import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Image } from "react-bootstrap";
import { Alert, AlertTitle, TextField } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ itemID }) {
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [creditCard, setCreditCard] = React.useState({
    name: "",
    number: "",
    expiration: "",
    cvv: "",
  });

  const [payment, setPayment] = React.useState([
    {
      id: itemID,
      paid: true,
    },
  ]);

  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    admin: false,
    cart: [],
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError(false);
    setSuccess(false);
  };

  const id = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      const url = `https://food-hut-api.herokuapp.com/users/${id}`;
      const { data } = await axios.get(url);
      const { cart } = data;
      setPayment([
        {
          ...payment,
          id: itemID,
          paid: true,
        },
      ]);
      setUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        admin: data.admin,
        payment: payment,
        cart: [...cart],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const putData = async () => {
    try {
      const url = `https://food-hut-api.herokuapp.com/users/${id}`;
      setPayment([
        ...payment,
        {
          id: itemID,
          paid: true,
        },
      ]);
      await axios.put(url, user);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleChange = (e) => {
    setCreditCard({
      ...creditCard,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      creditCard.name === "" ||
      creditCard.number === "" ||
      creditCard.expiration === "" ||
      creditCard.cvv === ""
    ) {
      setError(true);
      setSuccess(false);
    } else {
      getData();
      putData();
      setError(false);
      setSuccess(true);
      console.log(user);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    setPayment([
      {
        ...payment,
        id: itemID,
      },
    ]);
  }, [itemID]);

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleOpen}>
        PAGAR
      </Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          className="d-flex justify-content-center align-items-center flex-column"
          sx={{ ...style, width: 500, height: 500 }}
        >
          <form>
            <h2 className="text-center">Ingresa los datos de tu tarjeta</h2>
            <TextField
              onChange={handleChange}
              required
              name="name"
              className="w-100 my-2"
              id="outlined-basic"
              label="Card name"
              variant="outlined"
              size="small"
              autoComplete="off"
            />
            <TextField
              onChange={handleChange}
              required
              name="number"
              className="w-100 my-2"
              id="outlined-basic"
              label="Card number"
              variant="outlined"
              size="small"
              autoComplete="off"
            />
            <div className="d-flex">
              <TextField
                onChange={handleChange}
                required
                name="expiration"
                className="w-100 my-2 me-2"
                id="outlined-basic"
                label="Expiration date"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
              <TextField
                onChange={handleChange}
                required
                name="cvv"
                className="w-100 my-2 ms-2"
                id="outlined-basic"
                label="CVV"
                variant="outlined"
                size="small"
                autoComplete="off"
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="w-100 my-2"
              variant="contained"
            >
              Confirmar
            </Button>
          </form>
          <Button
            color="error"
            variant="outlined"
            className="w-100 my-2"
            onClick={handleClose}
          >
            SALIR
          </Button>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <p>Por favor ingresa todos los datos de tu tarjeta de crédito</p>
            </Alert>
          )}
          {success && (
            <Alert severity="success">
              <AlertTitle>Éxito</AlertTitle>
              <p>
                Tu pago se ha realizado con éxito, te enviaremos un correo con
                los detalles de tu compra
              </p>
            </Alert>
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal({
  img,
  id,
  category,
  name,
  price,
  quantity,
  restaurant,
  rating,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Ver detalles...</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <div id="parent-modal-description">
            <div className="d-flex justify-content-around">
              <Image src={img} alt="food" style={{ width: "100px" }} />
              <span>
                <small>x{quantity}</small> {name}
              </span>
              <span>precio: ${price}</span>
            </div>
            <hr />
            <span>Total</span>: {price * quantity}
          </div>
          <ChildModal itemID={id} />
        </Box>
      </Modal>
    </div>
  );
}
