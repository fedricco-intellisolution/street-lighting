import { useContext, useEffect, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { Download, Trash2, ZoomIn } from "react-feather";
import { Controller } from "react-hook-form";
import * as attachmentApi from "../../api/attachmentApi";
import NotyfContext from "@contexts/NotyfContext";
import { saveAs } from "file-saver";

const FileUploader = (props) => {
    const {
        control,
        name,
        disabled,
        label,
        errors,
        setValue,
        data
    } = props
    const [photos, setPhotos] = useState([])
    const [photoURLs, setPhotoURLs] = useState([])
    const [showPreview, setShowPreview] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [thumbnail, setThumbnail] = useState({})
    const imageExtension = ['jpeg', 'jpg', 'JPG', 'PNG', 'png']
    const notyf = useContext(NotyfContext)
    const onChangePhotos = (e) => {
        setPhotos(prevState => [...prevState, ...e.target.files])
    }

    useEffect(() => {
        setPhotos(data)
    }, [data])
    
    useEffect(() => {
        setValue(name, photos)
        if (photos?.length < 1) return;
        photos?.forEach(image => {
            const exists = photoURLs.some(el => el.file_name === image.file_name ||  el.file_name === image.name)
            if (!exists) {     
                setPhotoURLs(prevState => [...prevState, {
                    full_path: image.id ? image.full_path : URL.createObjectURL(image),
                    file_name: image.id ? image.file_name : image.name,
                    id: image.id ? image.id : ""
                }]);
            }
        })
    }, [photos, setValue, photoURLs, name])
    
    const removePhoto = (index) => {
        let new_photoURLs = [...photoURLs]
        new_photoURLs.splice(index, 1)
        setPhotoURLs(new_photoURLs)

        let new_photos = [...photos]
        new_photos.splice(index, 1)
        setPhotos(new_photos)
    }

    const deletePhoto = async (id) => {
        try {
            const response = await attachmentApi.deleteAttachment(id)
           
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type : 'success',
                    message: response.data.message,
                })
                setShowDelete(false)
                window.location.reload(true);
            }
        } catch (error) {
            
        }
    }

    const download = (item) => {
        saveAs(item.full_path, item.file_name);
    }

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Controller
                    control={control}
                    name={name}
                    defaultValue=""
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Form.Control
                            type="file"
                            multiple
                            name={name}
                            disabled={disabled}
                            onChange={onChangePhotos}
                            className={(errors.name && 'is-invalid')}>                   
                        </Form.Control>
                    )}
                />
            
            </Form.Group>
            {
                photoURLs?.map((image, key) => {
                    return <div key={key} className="fault-image-holder mb-2">
                                {
                                    imageExtension.includes(image?.file_name?.split('.').pop()) &&
                                    <Image src={image.full_path} />
                                }
                                <small>{image.file_name}</small>
                                <div className="text-end mt-2">
                                    <Trash2
                                        size={18}
                                        className="cursor-pointer me-1"
                                        onClick={
                                            image.id
                                                ? () => {
                                                            setShowDelete(true)
                                                            setThumbnail(photoURLs[key])
                                                        }
                                                : () => removePhoto(key)}
                                        />
                                    <ZoomIn
                                        size={18}
                                        className="cursor-pointer me-1"
                                        onClick={() => {
                                            setShowPreview(true)
                                            setThumbnail(photoURLs[key])
                                        }}
                                     />
                          
                                <Download
                                    size={18}
                                    className="cursor-pointer"
                                    onClick={() => download(image)}
                                />
                                </div>
                            </div>
                })
            }

            <Modal show={showPreview}  onHide={() => setShowPreview(false)} size="md" className="file-uploader-modal">
                <Modal.Header closeButton>{thumbnail.file_name}</Modal.Header>
                <Modal.Body className="text-center m-3">
                    <Image src={thumbnail.full_path} />
                </Modal.Body>
            </Modal>

            <Modal show={showDelete}  onHide={() => setShowDelete(false)} size="md" className="file-uploader-modal">
                <Modal.Header closeButton>{thumbnail.file_name}</Modal.Header>
                <Modal.Body className="text-center m-3">
                    <h6>Are you sure you want to delete this photo?</h6>
                     <Image src={thumbnail.full_path} />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => setShowDelete(false)}>
                        Cancel    
                    </Button>
                    <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => deletePhoto(thumbnail.id)}>
                        Proceed    
                    </Button>
                </Modal.Footer>
            </Modal>
       </>
    )
}


export default FileUploader;