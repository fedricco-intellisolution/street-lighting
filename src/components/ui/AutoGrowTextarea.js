import React from "react";
import { Form } from "react-bootstrap";

const MIN_TEXTAREA_HEIGHT = 150;

export const AutoGrowTextarea = ({
    onBlur,
    onChange,
    errors,
    fieldValue,
    disable = false,
    placeholder = "",
}) => {
    const textareaRef = React.useRef(null);
    const [value, setValue] = React.useState("");
    const onChangeTextArea = (event) => setValue(event.target.value);

    React.useLayoutEffect(() => {
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [value]);

    return (
        <Form.Control
            placeholder={placeholder}
            as="textarea"
            ref={textareaRef}
            style={{
                minHeight: MIN_TEXTAREA_HEIGHT,
                resize: "none",
            }}
            disabled={disable}
            className={errors && "is-invalid"}
            value={fieldValue}
            onBlur={onBlur}
            onChange={(event) => {
                onChange(event);
                onChangeTextArea(event);
            }}
        />
    );
};
