import React, {useContext, useState} from 'react';
import './profile.css';
import {AuthContext} from "../../contexts/auth";
import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiSettings, FiUpload} from 'react-icons/fi';
import api from '../../services/api';

//@ts-ignore
import avatarImg from './../../assets/avatar.png';
import {toast} from "react-toastify";


interface updateProfileInterface {
    name: string;
}

export default function Profile() {

    const {user, setUser, storageUser} = useContext(AuthContext);
    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email);

    const [cover, setCover] = useState(user?.cover);
    const [coverAvatar, setCoverAvatar] = useState(null);
    const [coverAvatarFile, setCoverAvatarFile] = useState<File|null>(null);


    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {

        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        setCoverAvatarFile(file);
        if (file.type === "image/jpeg" || file.type === "image/png") {
            setCoverAvatar(file as any);
            setCover(URL.createObjectURL(file));
        } else {
            toast.error("Arquivo inválido");
            setCoverAvatarFile(null);
            setCoverAvatar(null);
            return null;
        }
    }

    async function updateProfile(data: updateProfileInterface) {
        const formData = new FormData();
        formData.append("name", data.name)
        if (coverAvatarFile) {
            formData.append("cover", coverAvatarFile);
        }
        await api.post(`/users/${user?.id}`,
            formData,
            {
                headers:
                    {
                        Authorization: 'Bearer ' + user?.token,
                        accept: "application/json",
                        "Content-Type": "multipart/form-data"
                    }
            }
        ).then((response) => {
            const renew = {...user, ...response.data};
            setUser(renew);
            storageUser(renew);
            toast.success("Perfil atualizado com sucesso!");
        }).catch(err => {
            toast.error("Erro ao atualizar perfil!");
            console.log(err);
        })
    }

    async function handleSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let data = {
            name: name,
        }

        await updateProfile(data);
    }

    return (
        <div>
            <Header/>

            <div className='content'>
                <Title name="Meu perfil">
                    <FiSettings size={25}/>
                </Title>

                <div className='container'>
                    <form className={"formProfile"} onSubmit={handleSave}>
                        <label className='labelAvatar'>
                            <span>
                            <FiUpload color={"#fff"} size={25}/>
                        </span>
                            <input type="file" accept={"image/*"} onChange={handleFile}/>
                            {cover === null ? <img src={avatarImg} alt="Image Profile" width={250} height={250}/> :
                                <img src={cover} alt="Image Profile" width={250} height={250}/>}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>

                        <label>Email</label>
                        <input type="text" value={email} disabled={true}/>

                        <button type="submit" className="btnProfile">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
