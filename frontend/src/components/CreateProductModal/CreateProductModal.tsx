import { useEffect, useMemo, useState } from "react";

import Modal from "../Modal/Modal";

import "./CreateProductModal.css";

interface CreateProductModalProps {

    open: boolean;

    initialName: string;

    onClose: () => void;

    onConfirm: (
        name: string,
        image: File
    ) => Promise<void>;

}

function CreateProductModal({

    open,

    initialName,

    onClose,

    onConfirm,

}: CreateProductModalProps) {

    const [name, setName] = useState(initialName);

    const [image, setImage] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            setName(initialName);

            setImage(null);

            setLoading(false);

        }

    }, [open, initialName]);

    const imagePreview = useMemo(() => {

        if (!image) {

            return null;

        }

        return URL.createObjectURL(image);

    }, [image]);

    async function handleConfirm() {

        if (!image || !name.trim()) {

            return;

        }

        setLoading(true);

        try {

            await onConfirm(
                name.trim(),
                image
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <Modal
            open={open}
            title="Nuevo producto"
            onClose={onClose}
            headerClassName="modal-header--blue"
            titleClassName="modal-header__title--light"
        >

            <div className="create-product-modal">

                <div className="create-product-preview">

                    {imagePreview ? (

                        <img
                            src={imagePreview}
                            alt={name}
                        />

                    ) : (

                        <div className="create-product-placeholder">

                            Sin imagen

                        </div>

                    )}

                </div>

                <label className="create-product-upload">

                    Seleccionar imagen

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {

                            const file =
                                event.target.files?.[0];

                            if (file) {

                                setImage(file);

                            }

                        }}
                    />

                </label>

                <label>

                    Nombre

                </label>

                <input
                    className="create-product-input"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />

                <div className="create-product-modal__actions">

                    <button
                        type="button"
                        className="create-product-modal__cancel"
                        onClick={onClose}
                    >

                        Cancelar

                    </button>

                    <button
                        type="button"
                        className="create-product-modal__confirm"
                        disabled={
                            loading ||
                            !image ||
                            !name.trim()
                        }
                        onClick={handleConfirm}
                    >

                        {loading
                            ? "Creando..."
                            : "Crear"}

                    </button>

                </div>

            </div>

        </Modal>

    );

}

export default CreateProductModal;