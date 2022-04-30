import styles from "./EditProfile.module.css";
import NavBar from "../Layout/NavBar";
import ImageForm from "../Form/ImageForm";
import { useEffect, useState } from "react";
import Input from "../Form/Input";
const API_URL = "https://my-alpha-profiler-backend.herokuapp.com/user/current";

function EditProfile() {
  const [isLoaded, setLoadedState] = useState(false);
  const [userData, setUserData] = useState(false);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3003",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
    };
    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(userData);
        setLoadedState(true);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImage(e){
    // a ideia é recarregar o elemento  após cada postagem, caso contrário só pegaremos a primeira imagem selecionada
    const image = document.getElementById('image-file').files[0]
    console.log(image);

    if(image.size > 2000000){
      console.log('to long file')
    }else{
      getBase64(image); // nesta funćão teriamos que trocar o console log por um fetch para enviar as fotos
    }
    
  };

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      let newImage = reader.result;
      const messageBody = {user_image: newImage};

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3003",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
        body: JSON.stringify(messageBody),
      };
      fetch(API_URL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));

    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  function submit(e) {
    e.preventDefault();

    const messageBody = userData;
    console.log('put data is:');
    console.log(messageBody);

    let messageRealBody = {};
    let base64Image = "";

    for (const key in messageBody){
      if(messageBody[key] != null){
        if(key === "birthdate"){
          messageRealBody[key] = messageBody[key].split("T")[0];
        }else{
          messageRealBody[key] = messageBody[key]
        }
        
      }
      // if (key === "user_image"){
      //   const image = document.getElementById('image-file').files[0]

      //   if (image){
      //     const reader64 = new FileReader();
      //     reader64.readAsDataURL(image);
      //     reader64.onload = function () {
      //       //console.log(reader64.result);
      //       base64Image = reader64.result.replace("data:", "").replace(/^.+,/, "");
      //     };

      //   }
      // }
    }
    // messageRealBody.user_image = base64Image;
    console.log(messageRealBody);
    

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3003",
        "Access-Control-Allow-Credentials": true,
      },
      credentials: "include",
      body: JSON.stringify(messageRealBody),
    };
    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>EditProfile</h1>
      {isLoaded && (
        <form onSubmit={submit} className={styles.editForm}>
          <div>
            <ImageForm src={userData.user_image} handleChange={handleImage} id="image"/>
          </div>
          
          <div>
            <Input
              type="text"
              text="Username"
              name="username"
              handleOnChange={handleChange}
              placeholder="Username"
              value={userData.username}
            />

            <Input
              type="email"
              text="Email"
              name="email"
              handleOnChange={handleChange}
              value={userData.email}
            />

            <Input
              type="date"
              text="Birth Date"
              name="birth_date"
              handleOnChange={handleChange}
              value={userData?userData.birthdate.split("T")[0]:""}
            />

            <Input
              type="password"
              text="Password"
              name="password"
              handleOnChange={handleChange}
              placeholder="Password"
            />

            <Input
              type="password"
              text="Confirm Password"
              name="confirm_password"
              handleOnChange={handleChange}
              placeholder="Confirm Password"
            />
            <input type="submit" className={styles.update}/>
          </div>
          
      </form>
      )}
      
    </div>
  );
}

export default EditProfile;
