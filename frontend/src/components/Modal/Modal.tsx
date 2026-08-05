import "./Modal.css";
import type { ReactNode } from "react";

interface ModalProps {

    open: boolean;

    title: string;

    children: ReactNode;

    onClose: () => void;

    headerClassName?: string;

    titleClassName?: string;

    closeButtonClassName?: string;

}

function Modal({
    open,
    title,
    children,
    onClose,
    headerClassName,
    titleClassName,
    closeButtonClassName,
}: ModalProps) {

    if (!open) {
        return null;
    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal-container"
                onClick={(event) => event.stopPropagation()}
            >

                <header className={`modal-header ${headerClassName ?? ""}`}>

                    <h2 className={titleClassName}>{title}</h2>

                    <button
                        type="button"
                        className={`modal-close-button ${closeButtonClassName ?? ""}`}
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>

                </header>

                <div className="modal-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;