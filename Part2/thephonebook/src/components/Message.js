
const Message = ({ message }) => {
    if (!message || message.length < 1) {
        return null;
    }

    return (
        <div class='message'>
            {message}
        </div>
    )
}

export default Message