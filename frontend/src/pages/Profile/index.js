import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import {FiPower, FiTrash2} from "react-icons/fi"

import api from "../../services/api"
import logoimg from "../../assets/logo.svg"
import "./styles.css"


export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem("ongId");
    const ongName = localStorage.getItem("ongName")

    useEffect(() => {
        api.get("profile", {
            headers: {
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data);
        })
    }, [ongId]);
    function handleLogout(){
        localStorage.clear();
        
        history.push("/");
    }
    async function handleDeleteIncidente(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: { 
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id !== id))
        } catch(err) {
            alert("Erro ao deletar caso, tente novamente");
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt = "Be The Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastra nvo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"  />
                </button>
            </header>
            <h1>Casos cadastradoos</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncidente(incident.id)}>
                            <FiTrash2 size={20} color="#A8A8B3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}