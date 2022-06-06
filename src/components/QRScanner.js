import { Modal } from "react-bootstrap";
import { QrReader } from 'react-qr-reader';

const QRScanner = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <h2 className="mb-0">{props.header}</h2>
              </Modal.Header>
            <Modal.Body>
                <QrReader
                    onResult={props.onScan}
                    style={{ width: '100%' }}
                />
            </Modal.Body>
        </Modal>
            
    )
}

export default QRScanner;