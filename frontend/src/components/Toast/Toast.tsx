import "./Toast.css";

interface ToastProps {

    message: string;

    type: "success" | "error";

}

function Toast({
    message,
    type,
}: ToastProps) {

    return (

        <div
            className={`toast toast--${type}`}
        >

            {message}

        </div>

    );

}

export default Toast;