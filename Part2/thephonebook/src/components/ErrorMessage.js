const ErrorMessage = ({ error }) => {
    if (!error || error.length < 0) {
        return null
    }

    return (
        <div className="errorMessage">{error}</div>
    )
}

export default ErrorMessage;