import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export const Password = ({ field }) => {
    const [showPassword, setShowPassword] = useState(false);
    
           
        return (
            <div className={"input-group"}>
                <input
                    type={showPassword ? "text": "password"}
                    {...field}
                    className={"form-control form-control-lg"}/>
                <button className={"btn btn-light"} type={"button"}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} onClick={() => setShowPassword(!showPassword)}/>
                </button>
            </div>
        )
}  