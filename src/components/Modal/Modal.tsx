import { useEffect } from 'react'
import './Modal.css'

export type ModalType = 'success' | 'error' | 'warning' | 'info'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    type?: ModalType
    title?: string
    message: string
    confirmText?: string
}

const Modal = ({
    isOpen,
    onClose,
    type = 'info',
    title,
    message,
    confirmText = 'ตกลง'
}: ModalProps) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅'
            case 'error':
                return '❌'
            case 'warning':
                return '⚠️'
            case 'info':
            default:
                return 'ℹ️'
        }
    }

    const getTitle = () => {
        if (title) return title

        switch (type) {
            case 'success':
                return 'สำเร็จ'
            case 'error':
                return 'เกิดข้อผิดพลาด'
            case 'warning':
                return 'คำเตือน'
            case 'info':
            default:
                return 'แจ้งเตือน'
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-container modal-${type}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="modal-icon">{getIcon()}</div>
                    <h2 className="modal-title">{getTitle()}</h2>
                </div>

                <div className="modal-body">
                    <p className="modal-message">{message}</p>
                </div>

                <div className="modal-footer">
                    <button
                        className={`modal-btn modal-btn-${type}`}
                        onClick={onClose}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal
