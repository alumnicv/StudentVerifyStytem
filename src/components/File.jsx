import Input from "../components/Input";
import style from "./input.module.css";

function File({ onChange, index}) {
    return (
        <div className={style.fileInput}>
            <label htmlFor={`file-${index}`}>Upload File:</label>
            <Input
                id={`file-${index}`}
                type="file"
                onChange={onChange}
            />
        </div>
    );
}

export default File;
