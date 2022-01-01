import './App.css';
import {useRef,useState} from "react"

function App() {
  const [barcode,setBarcode]=useState();
  const video=useRef(null)
  const canvas=useRef(null)
 

  const openCamera=()=>{
    navigator.mediaDevices.getUserMedia({video:{width:300,height:300,facingMode:"environment"}})
    .then(stream=>{
      video.current.srcObject=stream;
      video.current.play();

      
      const ctx=canvas.current.getContext("2d");

  
        const barcodeDetector =new window.BarcodeDetector({formats: ['qr_code', 'ean_13']});



    
     
      setInterval(() => {
        canvas.current.width=video.current.videoWidth;
        canvas.current.height=video.current.videoHeight;
        ctx.drawImage(video.current, 0,0, video.current.videoWidth, video.current.videoHeight);
        barcodeDetector.detect(canvas.current)
        .then(([data]) => {
         if(data){
           setBarcode(data.rawValue)
         }
        })
        .catch(err => {
          console.log(err);
        })
      
      }, 100);


    })
    .catch(err=>console.log(err))

  }
const openRefresh=()=>{
  window. location. reload() 
}
  return (
    <div className="App">
      {!barcode ? <button onClick={openCamera}>Kamerayı Aç</button>:<button onClick={openRefresh}>Sayfayı Yenile</button> }
    
      <div>
      <video ref={video} autoPlay muted hidden></video>
     <canvas ref={canvas}/>

      </div>
      <div>
        {barcode && (
          <div className='text-barcode'>Bulunan Barkod:{barcode}</div>
        )}
      </div>
  
    </div>
  );
}

export default App;
