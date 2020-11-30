import React, { useState } from "react";

export default (initialState, onSubmit) => {
    const [inputs, setInputs] = useState(initialState);

    const subscribe = (field) => (value) => {
        setInputs({ ...inputs, [field]: value });
    };

    const handleSubmit = () => {
        onSubmit(inputs);
    };

    return {
        subscribe,
        inputs,
        handleSubmit,
    };
};
