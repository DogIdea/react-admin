import React from 'react';
import FileUpload from './fileUpload.jsx';

class FileUploader extends React.Component{
    render(){
        /*set properties*/
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType :'json',
            chooseAndUpload :true,
            uploadSuccess :(res)=>{
                this.props.onSuccess(res.data)
            },
            uploadError : (err)=>{
                this.props.onError(err.message || '这是上传图片失败');
            }
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            <FileUpload options={options}>
                <button className="btn btn-xs bt-defaul" ref="chooseAndUpload">请选择图片</button>
            </FileUpload>
        )	        
    }
}

export default FileUploader;