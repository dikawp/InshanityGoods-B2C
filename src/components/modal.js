import {
    Button,
    VStack,
    Text,
    Input,
    Modal,
  } from "native-base";
  import { useState } from "react";

 function Modals() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          avoidKeyboard
          justifyContent="flex-end"
          bottom="4"
          size="lg"
        >
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Forgot Password?</Modal.Header>
            <Modal.Body>
              Enter email address and we'll send a link to reset your password.
              <FormControl mt="3">
                <FormControl.Label>Email</FormControl.Label>
                <Input />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button
                flex="1"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Proceed
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    );
  }

  export default Modals;