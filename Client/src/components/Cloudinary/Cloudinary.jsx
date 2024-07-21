import { useState } from 'react';
  const presetName= import.meta.env.VITE_PRESET_NAME; 
  const cloudName= import.meta.env.VITE_CLOUD_NAME; 

const Cloudinary = ({onValueChange}) => {

  const [image, setImage] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData(); 
    data.append('file', files[0]); 
    data.append('upload_preset', presetName); 

    setLoading(true);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const file = await response.json(); 
      setImage(file.secure_url); 
      onValueChange(file.secure_url)
      console.log("Image url: ", file.secure_url)
     
      setLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setLoading(false);
    }
  };



  return (
    <div>
      <h1>Subir Imagen</h1>

      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        accept="image/png, image/jpeg"
        onChange={uploadImage}
      />

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        image && <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default Cloudinary;