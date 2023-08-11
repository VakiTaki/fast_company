import React from "react";

function Loader() {
    return (
        <div className="d-flex justify-content-center  align-items-center w-100 h-100">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}

export default Loader;
