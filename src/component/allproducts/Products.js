import axios from 'axios';
import React, { useRef, useState } from 'react'
import $ from 'jquery'
import './Products.css'

const baseIMGURL = "https://tp5spring.cleverapps.io/img/"
const baseURL = "https://tp5spring.cleverapps.io/api/product/";

function Products() {
    const [products, setProducts] = useState(null);

    const htmlProduct = (product)=>{
        let img =  product.image == null ? "/assets/No_Picture.jpg" : baseIMGURL + product.image;
        return(
            <>
            <div className="product" data-id={product.id} key={product.id} onClick={updateOpen} >
              <img className='product_img' src={img} alt=''/>
              <div className="details">
              
                  <strong className='product_name'>{product.longName}</strong>
                  <span><strong className='product_price'>{product.price}</strong>$</span>
              </div>
          </div>
            </>
        )
    }
    const productsSetter = ()=>{
        axios.get(`${baseURL}`).then(res=>{
            if(res.status === 200){
                setProducts(res.data.data)
            }
        })
    }
    React.useEffect(()=>{
        productsSetter();
    },[])

    const GetProducts = ()=>{
        var elements = []
        if(!products) return (<h1>No products</h1>);
        Object.keys(products).forEach(key => {
            elements.push(htmlProduct(products[key]));
        })
        return elements;
    }


    const deleteProduct = (e)=>{
        let id = uid.current.value;
        if(!isNaN(id)){
            axios({
                method: 'delete',
                url: `${baseURL+id}`,
              }).then(res => {
                  if(res.status === 200){
                      updateClose()
                      $(`[data-id=${id}]`).fadeOut();
                  }
            })
        }
    }

    const add = useRef();
    const closea = useRef();
    const addForm = useRef();
    const sn = useRef();
    const ln = useRef();
    const p = useRef();
    const i = useRef();
    const info = useRef();
    const usn = useRef();
    const uln = useRef();
    const up = useRef();
    const ui = useRef();
    const uinfo = useRef();

    const setInfo = (cls,msg) => {
        info.current.className = "";
        info.current.classList.add(cls);
        info.current.innerHTML = msg;
    }

    const setUinfo = (cls,msg) => {
        uinfo.current.className = "";
        uinfo.current.classList.add(cls);
        uinfo.current.innerHTML = msg;
    }

    const addClose = (e)=>{
        addForm.current.classList.toggle("toggle");
    }
    const addOpen = (e)=>{
        addForm.current.classList.toggle("toggle");
    }

    const addClick = ()=>{
        if(sn.current.value && ln.current.value && p.current.value){
            if(isNaN(p.current.value)){
                p.current.value = "";
                return null;
            }
            let data = {
                "short_name":sn.current.value,
                "long_name": ln.current.value,
                "price": p.current.value
            }
            let formData = new FormData();
            formData.append("data",JSON.stringify(data))
            if(i.current.files[0]){
                formData.append("file",i.current.files[0])
            }
            axios({
                method: 'post',
                url: `${baseURL}`,
                data: formData,
                contentType: false,
                processData: false, 
                cache: false,
                dataType: 'json'
              }).then(res=>{
                  productsSetter()
                  setInfo("succes",res.data.succes)
              }).catch(err=>{
                setInfo("error",err.data.succes)
              });
        }else{
            setInfo("error","invalid FORM");
        }      

    }

    const fillUpdate = (data)=>{
        uid.current.value = data.id;
        usn.current.value = data.shortName;
        uln.current.value = data.longName;
        up.current.value = data.price;

    }

    const uid = useRef();

    const updateForm = useRef();
    const closeu = useRef();
    const updateOpen = (e)=>{
        let id = e.currentTarget.getAttribute('data-id')
        if(!isNaN(id)){
            axios({
                method:"GET",
                url:`${baseURL + id}`
            }).then(res => {
                if(res.status === 200){
                    fillUpdate(res.data.data[id]);
                    updateClose();
                }
            })
        }
        
    }
    const updateClose = (e)=>{
        updateForm.current.classList.toggle("toggle");
    }

    const updateClick = (e) => {
        if(!isNaN(up.current.value) && usn.current.value && uln.current.value ){
            let data = {
                "short_name":usn.current.value,
                "long_name": uln.current.value,
                "price": up.current.value
            }
            let formData = new FormData();
            formData.append("data",JSON.stringify(data))
            if(ui.current.files[0]){
                formData.append("file",ui.current.files[0])
            }
            axios({
                method: 'PUT',
                url: `${baseURL+uid.current.value}`,
                data: formData,
                contentType: false,
                processData: false, 
                cache: false,
                dataType: 'json'
              }).then(res=>{
                  productsSetter()
                  setUinfo("succes",res.data.succes)
              }).catch(err=>{
                setUinfo("error",err.data.succes)
              });
        }      

    }

    const delP = useRef();


  return (
    <div className='all'>
      <h1 className='title'>all products</h1>
      <div className="products">


      <div className="update" ref={updateForm}>
            <fieldset>
            <i className="close fa-solid fa-xmark" ref={closeu} onClick={updateClose}></i>
                <legend>UPDATE Product</legend>
                <span ref={uinfo} id='info'></span>
                <form encType="multipart/form-data">
                <input type="hidden" ref={uid} />
                    <input type="text" placeholder='short name' ref={usn} />
                    <input type="text" placeholder='long name' ref={uln}/>
                    <input type="number" id='price' placeholder='price' ref={up}/>
                    <input type="file" id='img' accept=".png,.jpg,.jpeg,.webp" ref={ui}/>
                </form>
                <input type="button" id='usubmit' ref={add} onClick={updateClick} value='submit' />
                <input type="button" id='udel' ref={delP} onClick={deleteProduct} value='DELETE' />
            </fieldset>
        </div>


        <div className="add" ref={addForm}>
        <i className="close fa-solid fa-xmark" ref={closea} onClick={addClose}></i>
            <fieldset>
                <legend>ADD Product</legend>
                <span ref={info} id='info'></span>
                <form encType="multipart/form-data">
                    <input type="text" id='short_name' placeholder='short name' ref={sn} />
                    <input type="text" id='long_name' placeholder='long name' ref={ln}/>
                    <input type="number" id='price' placeholder='price' ref={p}/>
                    <input type="file" id='img' accept=".png,.jpg,.jpeg,.webp" ref={i}/>
                    <input type="button" id='submit' ref={add} onClick={addClick} value='submit' />
                </form>
            </fieldset>
        </div>
        <div className="product plus" onClick={addOpen}><i className="fa-solid fa-square-plus"></i></div>
         <GetProducts/>
      </div>
    </div>
  )
}

export default Products
