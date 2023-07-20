import Link from "next/link";
import {BiImageAdd} from "react-icons/bi";
import {MdOutlineClose} from "react-icons/md";
import {BsCloudCheck} from "react-icons/bs";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/navigation";

const Form = ({ type, post, setPost, imageRef, coverImage, setCoverImage, previewImage, setPreviewImage, onImageChange, submitting, handleSubmit }) => {

    const router = useRouter();
    const selectImage = (e) => {
        setCoverImage(e.target.files[0]);

        onImageChange(e);
    }
    const discardImage = (e) => {
        setCoverImage(null);

        setPreviewImage(null);
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    };
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];
    

    return (
    <form onSubmit={handleSubmit} className="mb-[10px]">

        <div className='px-7 py-[7px] flex items-center justify-between md:px-[20px] md:py-[10px] gap-20'>
            <div className='cursor-pointer' onClick={() => router.back()}>
                <AiOutlineArrowLeft style={{fontSize: '1.5rem'}}/>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center gap-1 text-lg text-[#22C55E] mr-20'>
                    <BsCloudCheck style={{color: '#22C55E'}}/>
                    <p className='text-base'>Saved</p>
                </div>
                <div 
                onClick={() => router.back()}
                className='border-[1px] px-[18px] py-[7px] font-medium rounded-3xl mr-[10px] cursor-pointer'>Cancel</div>
                <button 
                    className='border-[1px] px-[18px] py-[7px] font-medium text-white rounded-3xl bg-[#2962FF] hover:bg-[#3b6fff]' 
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Publishing..." : "Publish"}
                </button>
            </div>
        </div>

        <div className='max-w-[90%] flex flex-col gap-5 md:max-w-[80%] lg:max-w-[70%] m-auto mt-[3rem]'>
            <button className='flex items-center gap-2 px-[17px] py-[7px] border-[1px] w-fit rounded-3xl cursor-pointer'
            onClick={() => imageRef.current.click()}
            >
                <BiImageAdd style={{fontSize: '20px'}}/>
                <p>Add Cover</p>
            </button>
            <div className='hidden'>
                <input type="file" name='myImage' ref={imageRef} onChange={selectImage}/>
            </div>
            {(coverImage && previewImage) && ( 
                <div>
                    <MdOutlineClose className='cursor-pointer text-2xl float-right' onClick={discardImage}/>
                    <img src={previewImage.image} alt="cover" />
                </div>
            )}

            <input type="text" 
                className='outline-none text-[2.5rem] font-bold bg-transparent' 
                placeholder='Article Title...' 
                required
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}/>

            <ReactQuill 
                theme="snow"
                modules={modules}
                formats={formats}
                value={post.content}
                placeholder="Content of the blog"
                style={{ height: "100%"}}
                onChange={(newValue) => setPost({...post, content: newValue})}
            />
            <br />
        </div>
    </form>
  )
}

export default Form;