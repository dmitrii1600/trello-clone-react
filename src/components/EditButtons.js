import "../styles/EditButtons.css";

import React from "react";

const EditButtons = ({handleSave, saveLabel, handleDelete, handleCancel}) => (
    <div className="Edit_Buttons">
        <div
            tabIndex="0"
            className="Edit_Button"
            onClick={handleSave}
        >
            {saveLabel}
        </div>
        {handleDelete && (
            <div
                tabIndex="0"
                className="Edit_Button Delete_Button"
                onClick={handleDelete}
            >
                Delete
            </div>
        )}
        <div tabIndex="0" className="Edit_Button_Cancel" onClick={handleCancel}>
            <ion-icon name="close"/>
        </div>

    </div>
);

export default EditButtons;