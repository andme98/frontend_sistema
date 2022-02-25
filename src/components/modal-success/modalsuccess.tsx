import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { color } from '@mui/system';
import PropTypes from 'prop-types';

const Modalsuccess = () => {

  const [openModal, setOpenModal] = useState(false);
  /* const handleOpen = () => {
      if (this.props.open) {
          setOpenModal(true);
      }
  }
  const handleClose = () => {
      if (this.props.open) {
          setOpenModal(true);
      }
  } */

  return (
    <div>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

Modalsuccess.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default Modalsuccess

