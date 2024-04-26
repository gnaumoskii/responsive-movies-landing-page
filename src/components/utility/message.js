import "../../css/utility/message.css";

// Expecting type to be one of the following values: SUCCES, INFO, DANGER, WARNING
export const showMessage = ({message, type}) => {
    $(".movies-page").append(`<p class="message message--${type}">${message}</p>`);
    setTimeout(removeMessage, 3000);
};



export const removeMessage = () => {
    $(".message").remove();
}
