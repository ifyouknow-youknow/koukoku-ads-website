import '../../STYLES/Dialog.css'
import { Clickable } from './Clickable'

export function Dialog({ title, message, btnText, func, setToggle }) {
    return <div className="dialog-wrap vertical-center">
        <div className='horizontal-center'>
            <div className='dialog'>
                <h1 className='dialog-title'>{title !== undefined ? title : 'Dialog Title'}</h1>
                <p className='dialog-message'>{message !== undefined ? message : 'Dialog text here...'}</p>
                <br />
                <div className='right'>
                    <div className='h'>
                        <Clickable onPress={() => {
                            setToggle(false);
                        }}>
                            <div className='dialog-cancel-btn'>{'Close'}</div>
                        </Clickable>
                        <Clickable onPress={func}>
                            <div className='dialog-btn'>{btnText !== undefined ? btnText : 'Press Me'}</div>
                        </Clickable>
                    </div>
                </div>
            </div>
        </div>
    </div>
}