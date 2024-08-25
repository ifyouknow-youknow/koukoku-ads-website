import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export function Checkbox({ checked = false, size = 25, backgroundColor, checkColor, onChange }) {
    const [isChecked, setIsChecked] = useState(checked);
    return <div onClick={() => { setIsChecked(!isChecked); onChange(!isChecked); }} style={{ width: `${size}px`, height: `${size}px`, background: isChecked ? (backgroundColor !== undefined ? backgroundColor : 'black') : '#E6F0FA', border: '1px solid #A7AEB5', borderRadius: '4px' }} className={`checkbox ${isChecked ? 'checked' : 'not-checked'} pointer`}>
        <div className="checkbox-icon">
            {isChecked && <FaXmark color={checkColor != undefined ? checkColor : 'white'} size={size} />}
        </div>
    </div>
}


